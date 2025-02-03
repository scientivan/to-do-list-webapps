import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import FilterBar from '../components/FilterBar';
import AddTodoButton from '../components/AddTodoButton';
import { 
  getTodos, 
  getCompletedTodos, 
  toggleTodoStatus, 
  deleteTodo 
} from '../api';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sort, setSort] = useState('');

  const fetchTodos = async () => {
    try {
      let data;
      if (statusFilter === 'completed') {
        data = await getCompletedTodos(sort);
      } else {
        data = await getTodos(sort);
      }
      setTodos(data);
    } catch (error) {
      console.error('Gagal memuat todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [statusFilter, sort]);

  const handleToggleComplete = async (id) => {
    try {
      await toggleTodoStatus(id);
      await fetchTodos(); // Refresh data setelah update
    } catch (error) {
      console.error('Gagal mengubah status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await fetchTodos(); // Refresh data setelah delete
    } catch (error) {
      console.error('Gagal menghapus todo:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    // Filter by status (untuk incomplete)
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
        onSort={setSort}
      />
      <TodoList
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
      />
      <AddTodoButton />
    </div>
  );
};

export default Dashboard;