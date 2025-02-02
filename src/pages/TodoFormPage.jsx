import { useNavigate, useParams } from "react-router-dom";
import TodoFormComponent from "../components/TodoFormComponent";

const TodoFormPage = ({ todos, setTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editingTodo = id ? todos.find(t => t.id === parseInt(id)) : null;

  const handleSave = (todo) => {
    if (editingTodo) {
      setTodos((prev) => prev.map((t) => (t.id === editingTodo.id ? { ...t, ...todo } : t)));
    } else {
      setTodos([...todos, { id: Date.now(), ...todo }]);
    }
    navigate("/dashboard"); // Kembali ke dashboard setelah simpan
  };

  return (
    <div className="p-6">
      <TodoFormComponent
        initialData={editingTodo || {}}
        onSave={handleSave}
        onCancel={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default TodoFormPage;