import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTodos } from "../api";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todos = await getTodos();
        const foundTodo = todos.find(t => t._id === id);
        
        if (foundTodo) {
          setTodo(foundTodo);
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        setError('Gagal memuat data todo');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (isLoading) {
    return <div className="p-6 text-center">Memuat...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  if (!todo) {
    return <div className="p-6 text-center">Todo tidak ditemukan!</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{todo.title}</h1>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              {todo.completed ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                  Selesai
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  Dalam Proses
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-700">Deskripsi:</p>
              <pre className="whitespace-pre-wrap font-sans text-gray-600 bg-gray-50 p-4 rounded-lg">
                {todo.description || "Tidak ada deskripsi"}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">Tanggal Jatuh Tempo:</p>
                <p className="text-gray-600">{formatDate(todo.due_date)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Prioritas:</p>
                <span className={`inline-block px-2 py-1 rounded ${
                  todo.priority === 'High' ? 'bg-red-100 text-red-800' : 
                  todo.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {todo.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;