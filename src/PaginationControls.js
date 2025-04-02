const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
      <div className="inner">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
  
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}>
            {i + 1}
          </button>
        ))}
  
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  
  export default PaginationControls;
  