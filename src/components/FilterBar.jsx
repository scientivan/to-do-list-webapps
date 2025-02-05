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
        <option value="all">Semua Status</option>
        <option value="completed">Selesai</option>
        <option value="incomplete">Belum Selesai</option>
      </select>
      
      <select 
        onChange={handlePriorityFilterChange} 
        className="p-2 border rounded w-full"
      >
        <option value="all">Semua Prioritas</option>
        <option value="Low">Prioritas Rendah</option>
        <option value="Mid">Prioritas Menengah</option>
        <option value="High">Prioritas Tinggi</option>
      </select>
      
      <select 
        onChange={handleSortChange} 
        className="p-2 border rounded w-full"
      >
        <option value="">Urutkan</option>
        <option value="due_date">Berdasarkan Tanggal</option>
        <option value="priority_level">Berdasarkan Prioritas</option>
      </select>
    </div>
  );
};

export default FilterBar;