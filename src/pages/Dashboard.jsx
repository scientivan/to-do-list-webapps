import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import FilterBar from '../components/FilterBar';
import AddTodoButton from '../components/AddTodoButton';
import { 
  getTodos, 
  getCompletedTodos, 
  toggleTodoStatus, 
  deleteTodo,
  deleteCompletedTodo
} from '../api';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sort, setSort] = useState('');

  const fetchTodos = async () => {
    try {
      let incompleteData, completedData;
      incompleteData = await getTodos(sort);

      if (statusFilter === 'completed') {
        setTodos(incompleteData.list.filter(todo=> todo.is_complete));
      } else {
        if (statusFilter === 'all') {
          setTodos(incompleteData.list);
          // completedData = await getCompletedTodos(sort);
          // console.log(completedData.list)
          // setTodos([...incompleteData.list, ...completedData.list]);
          
        } else {
          setTodos(incompleteData.list);
        }
      }
    } catch (error) {
      console.error('Gagal memuat todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [statusFilter, sort, priorityFilter]);

  const handleToggleComplete = async (id) => {
    try {
      await toggleTodoStatus(id);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, is_complete: !todo.is_complete } : todo
        )
      );
    } catch (error) {
      console.error('Gagal mengubah status:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      if (statusFilter === 'completed') {
        await deleteCompletedTodo(id);
      } else {
        await deleteTodo(id);
      }
      await fetchTodos(); 
    } catch (error) {
      console.error('Gagal menghapus todo:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
  };
  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'incomplete' && todo.is_complete) return false;
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
    return true;
  });
  return (
    <div className="container mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <FilterBar
        onFilter={handleFilterChange}
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
