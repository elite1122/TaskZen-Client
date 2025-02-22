import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAuth from '../hooks/useAuth';
import { MdDescription, MdOutlineAccessTime, MdTitle } from 'react-icons/md';

const categoryList = ['To-Do', 'In Progress', 'Done'];

function SortableItem({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
            className="bg-white p-4 rounded-lg mb-3 shadow cursor-move">
            <h4 className="font-bold text-gray-900 flex items-center gap-3"><MdTitle />{task.title}</h4>
            {task.description && (
                <p className="text-gray-600 text-sm flex items-center gap-3"><MdDescription />{task.description}</p>
            )}
            <p className="text-gray-600 text-sm flex items-center gap-3">
                <MdOutlineAccessTime />{new Date(task.timestamp).toLocaleString()}
            </p>
        </div>
    );
}

function CategoryColumn({ category, tasks }) {
    return (
        <div className="bg-gray-100 rounded-2xl p-4 shadow-md min-h-[200px]">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
                <div className="min-h-[100px]">
                    {tasks.map((task) => <SortableItem key={task._id} task={task} />)}
                </div>
            </SortableContext>
        </div>
    );
}

export default function Home() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://task-zen-server-delta.vercel.app/tasks?email=${user?.email}`);
            return Array.isArray(res.data) ? res.data : [];
        },
        enabled: !!user?.email,
    });

    const updateTaskMutation = useMutation({
        mutationFn: async (updates) => axios.patch(`https://task-zen-server-delta.vercel.app/tasks/reorder`, updates),
        onSuccess: () => queryClient.invalidateQueries(['tasks']),
    });

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        // Prevent unnecessary updates
        if (!over || active.id === over.id) return;

        const activeTask = tasks.find((task) => task._id === active.id);
        if (!activeTask) return;

        const newCategory = categoryList.includes(over.id) ? over.id : activeTask.category;
        const sameCategoryTasks = tasks.filter((task) => task.category === activeTask.category);
        const oldIndex = sameCategoryTasks.findIndex((task) => task._id === active.id);
        const newIndex = sameCategoryTasks.findIndex((task) => task._id === over.id);

        // If the category has changed, update the task's category
        if (activeTask.category !== newCategory) {
            updateTaskMutation.mutate({
                updates: [{ _id: activeTask._id, category: newCategory }],
                email: user?.email,
            });
            return; // Exit early, we don't need to reorder in this case
        }

        // Reorder tasks within the same category
        const reorderedTasks = arrayMove(sameCategoryTasks, oldIndex, newIndex).map((task, index) => ({
            _id: task._id,
            order: index, // Set the order based on the new index
            category: task.category,
        }));

        console.log("Sending Payload:", { updates: reorderedTasks, email: user?.email });

        // Send update request
        updateTaskMutation.mutate({ updates: reorderedTasks, email: user?.email });
    };

    return (
        <div className="p-6 min-h-screen">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categoryList.map((category) => (
                        <CategoryColumn key={category} category={category} tasks={tasks.filter((t) => t.category === category)} />
                    ))}
                </main>
            </DndContext>
        </div>
    );
}
