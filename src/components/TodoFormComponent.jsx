import { useState } from "react";

const TodoFormComponent = ({ initialData = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(initialData.dueDate || "");
  const [priority, setPriority] = useState(initialData.priority || "Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dueDate) {
      alert('Harap masukkan tanggal jatuh tempo');
      return;
    }
    onSave({ title, description, dueDate, priority });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{initialData.id ? "Edit Todo" : "Tambah Todo"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block font-medium">Judul</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tanggal Jatuh Tempo */}
        <div>
          <label className="block font-medium">Tanggal Jatuh Tempo</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Prioritas */}
        <div>
          <label className="block font-medium">Prioritas</label>
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Rendah</option>
            <option value="Medium">Sedang</option>
            <option value="High">Tinggi</option>
          </select>
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoFormComponent;