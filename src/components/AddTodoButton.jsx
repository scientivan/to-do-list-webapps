import { Link } from 'react-router-dom';

const AddTodoButton = () => {
  return (
    <Link to="/create" className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800">
      + Add Todo
    </Link>
  );
};

export default AddTodoButton;