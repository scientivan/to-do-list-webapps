import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTodos, toggleTodoStatus } from "../api";

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
        const foundTodo = todos.list.find(t => t._id === id);
        console.log(foundTodo)

        if (foundTodo) {
          setTodo(foundTodo);
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        setError("Gagal memuat data todo: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleToggleComplete = async () => {
    if (!todo) return;

    try {
      await toggleTodoStatus(todo._id, !todo.is_complete);
      const todos = await getTodos();
      const updatedTodo = todos.list.find(t => t._id === id);
      setTodo(updatedTodo);
    } catch (error) {
      setError("Gagal mengubah status: " + error.message);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Wait a moment...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  if (!todo) {
    return <div className="p-6 text-center">Todo is nowhere to be found!</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-20">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{todo.title}</h1>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              {todo.is_complete ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                  Finish
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  In Process
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-700">Description:</p>
              <pre className="whitespace-pre-wrap font-sans text-gray-600 bg-gray-50 p-4 rounded-lg">
                {todo.description || "Tidak ada deskripsi"}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">Maturity Date:</p>
                <p className="text-gray-600">{formatDate(todo.due_date)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Priority:</p>
                <span className={`inline-block px-2 py-1 rounded ${
                  todo.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : todo.priority === "Medium"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
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
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
