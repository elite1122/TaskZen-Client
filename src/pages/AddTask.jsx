import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const AddTask = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // For navigation after task addition

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    if (title.length > 50) {
      setError("Title cannot exceed 50 characters.");
      return;
    }
    if (description.length > 200) {
      setError("Description cannot exceed 200 characters.");
      return;
    }

    try {
      const task = { title, description, category, email: user.email };
      await axiosSecure.post("/tasks", task);

      // ✅ SweetAlert on successful addition
      Swal.fire({
        title: "Task Added Successfully!",
        text: "Your new task has been added to the board. 🚀",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
        timerProgressBar: true,
      });

      // ✅ Navigate to home after success
      navigate("/");

    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write the task name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Task Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Task Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>To-Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
