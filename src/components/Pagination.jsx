function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <button
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        className="btn btn-secondary"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;