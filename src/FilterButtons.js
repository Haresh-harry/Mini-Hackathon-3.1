const FilterButtons = ({ filterPriority, handlePriorityFilterChange }) => {
    return (
      <div className="inner">
        {["All", "High", "Medium", "Low"].map((level) => (
          <button key={level} onClick={() => handlePriorityFilterChange(level)} style={{ fontWeight: filterPriority === level ? "bold" : "normal" }}>
            {level}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterButtons;
  