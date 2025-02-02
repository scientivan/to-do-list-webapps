import { Link, useNavigate } from 'react-router-dom';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const navigate = useNavigate();
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-blue-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${
      todo.completed ? 'bg-green-100' : 'bg-white'
    } flex flex-col cursor-pointer hover:shadow-lg transition-shadow
      min-h-[120px] sm:min-h-[140px] md:min-h-[160px]`}>
        
      {/* Tambahkan div wrapper untuk click handler */}
      <div 
        className="flex-1"
        onClick={(e) => {
          if (!e.target.closest('button, a')) {
            navigate(`/todo/${todo.id}`); // Ganti dengan navigate
          }
        }}
      >
        <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through' : ''}`}>
          {todo.title}
        </h3>
        {/* Deskripsi dengan truncate */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">
          {todo.description}
        </p>
        <p className="text-gray-500 text-sm">Due: {todo.dueDate}</p>
        <p className={`text-sm ${getPriorityColor(todo.priority)}`}>
          {todo.priority} Priority
        </p>
      </div>

      {/* Tombol-tombol action */}
      <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`px-3 py-1 ${
            todo.completed ? 'bg-yellow-500' : 'bg-green-500'
          } text-white rounded`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <Link
          to={`/edit/${todo.id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded text-center"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;