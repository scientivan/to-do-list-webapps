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
        return 'text-blue-500';
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${
      todo.is_complete ? 'bg-green-100 border-2 border-green-400' : 'bg-white'
    } flex flex-col cursor-pointer hover:shadow-lg transition-shadow
      min-h-[120px] sm:min-h-[140px] md:min-h-[160px]`}
    >
      <div 
        className="flex-1"
        onClick={(e) => {
          if (!e.target.closest('button, a')) {
            navigate(`/details/${todo._id}`);
          }
        }}
      >
        <h3 className={`font-semibold text-lg ${todo.is_complete ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">
          {todo.description}
        </p>
        <p className="text-gray-500 text-sm">Due: {formatDate(todo.due_date)}</p>
        <p className={`text-sm ${getPriorityColor(todo.priority)}`}>
          {todo.priority} Priority
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-2">
        {!todo.is_complete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(todo._id);
            }}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}
        {!todo.is_complete && ( // Tambahkan kondisi ini untuk tombol Edit
          <Link
            to={`/edit/${todo._id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Link>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo._id);
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
