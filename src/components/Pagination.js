import React, { useState } from 'react';
import '../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPageChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 10) {
      alert('Maximum limit is 10');
      value = 10;
    }
    if (value < 1) {
      value = 1;
    }
    setItemsPerPage(value);
    onItemsPerPageChange(value);
  };

  if (totalPages === 0) return null;

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page: </label>
        <input
          type="number"
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
