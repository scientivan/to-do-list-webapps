import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={() => onToggleComplete(todo.id)}
          onEdit={() => onEdit(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;