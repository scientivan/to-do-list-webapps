const FilterBar = ({ onFilter, onPriorityFilter, onSort }) => {
  const handleStatusFilterChange = (e) => {
    onFilter(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    onPriorityFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select 
        onChange={handleStatusFilterChange} 
        className="p-2 border rounded w-full"
      >
        <option value="all">All Status</option>
        <option value="completed">Finish</option>
        <option value="incomplete">Unfinished</option>
      </select>
      
      <select 
        onChange={handlePriorityFilterChange} 
        className="p-2 border rounded w-full"
      >
        <option value="all">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Mid">Mid Priority</option>
        <option value="High">High Priority</option>
      </select>
      
      <select 
        onChange={handleSortChange} 
        className="p-2 border rounded w-full"
      >
        <option value="">Sort</option>
        <option value="due_date">By Date</option>
        <option value="priority_level">By Priority</option>
      </select>
    </div>
  );
};

export default FilterBar;