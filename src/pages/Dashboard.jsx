import { useState } from 'react';
import TodoList from '../components/TodoList';
import FilterBar from '../components/FilterBar';
import AddTodoButton from '../components/AddTodoButton';

const Dashboard = ({todos, setTodos}) => {

  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Edit todo with id:', id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    // Filter by status
    if (statusFilter === 'completed' && !todo.completed) return false;
    if (statusFilter === 'incomplete' && todo.completed) return false;

    // Filter by priority
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

    return true;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <FilterBar
        onFilter={setStatusFilter}
        onPriorityFilter={setPriorityFilter}
      />
      <TodoList
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddTodoButton />
    </div>
  );
};

export default Dashboard;