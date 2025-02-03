import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;