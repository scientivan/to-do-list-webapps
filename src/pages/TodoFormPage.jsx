import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoFormComponent from "../components/TodoFormComponent";
import { addTodo, editTodo, getTodos } from "../api";

const TodoFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState({});

  // Fetch data untuk edit
  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const todos = await getTodos();
          const foundTodo = todos.list.find(t => t._id === id);
          if (foundTodo) {
            setInitialData(foundTodo);
          } else {
            navigate('/dashboard');
          }
        } catch (err) {
          setError('Gagal memuat data todo');
        }
      }
    };
    
    fetchTodo();
  }, [id, navigate]);

  const handleSave = async (todoData) => {
    setIsLoading(true);
    setError("");
    
    try {
      if (id) {
        // Edit todo
        console.log(todoData)
        
        await editTodo({
          todo_id: id,
          ...todoData
        });
      } else {
        // Tambah todo baru
        await addTodo(todoData);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || 'An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <TodoFormComponent
        initialData={initialData}
        onSave={handleSave}
        onCancel={() => navigate("/dashboard")}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TodoFormPage;