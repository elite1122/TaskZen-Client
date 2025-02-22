import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageTask = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from the backend
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/tasks?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating task
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      return axios.patch(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setIsModalOpen(false);
      Swal.fire("Success!", "Task updated successfully", "success");
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      return axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        data: { email: user?.email },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      Swal.fire("Deleted!", "Task has been deleted.", "success");
    },
  });

  const openUpdateModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTaskMutation.mutate(currentTask);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Task Title</th>
              <th className="p-3 text-left">Task Description</th>
              <th className="p-3 text-left">Time Stamp</th>
              <th className="p-3 text-center">Edit</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{task.title}</td>
                <td className="p-3 truncate max-w-xs">{task.description}</td>
                <td className="p-3">{new Date(task.timestamp).toLocaleString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => openUpdateModal(task)}
                    className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaEdit /> Update
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteTaskMutation.mutate(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Update Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input
                  type="text"
                  value={currentTask?.title || ""}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Task Description</label>
                <textarea
                  value={currentTask?.description || ""}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Task Category</label>
                <select
                  value={currentTask?.category || "To-Do"}
                  onChange={(e) => setCurrentTask({ ...currentTask, category: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>To-Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-max"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTask;
