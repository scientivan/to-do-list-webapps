const FilterBar = ({ onFilter, onPriorityFilter }) => {
  const handleStatusFilterChange = (e) => {
    onFilter(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    onPriorityFilter(e.target.value);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select onChange={handleStatusFilterChange} className="p-2 border rounded w-full">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <select onChange={handlePriorityFilterChange} className="p-2 border rounded w-full">
        <option value="all">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
    </div>
  );
};

export default FilterBar;