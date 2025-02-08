import { useState, useEffect } from "react";

const TodoFormComponent = ({ initialData = {}, onSave, onCancel, isLoading, error }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Mid"
  });

  // Format date untuk input type="date"
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Inisialisasi form data saat edit
  useEffect(() => {
    if (initialData._id) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        due_date: formatDateForInput(initialData.due_date),
        priority: initialData.priority
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.due_date) {
      alert('Please enter the due date');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {initialData._id ? "Edit Todo" : "Create Todo"}
      </h2>
      
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* Tanggal Jatuh Tempo */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.due_date}
            onChange={(e) => setFormData({...formData, due_date: e.target.value})}
            required
          />
        </div>

        {/* Prioritas */}
        <div>
          <label className="block font-medium">Priority</label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
          >
            <option value="Low">Low</option>
            <option value="Mid">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoFormComponent;