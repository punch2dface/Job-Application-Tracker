function FilterBar({ filter, setFilter }) {
    
    // Centralized list of supported status filters.
    const filters = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

    return (
        <div className="filter-bar">
            {filters.map((filterOption) => (
                <button
                    key={filterOption}
                    type="button"
                    className={
                        filter === filterOption
                            ? "filter-btn active-filter"
                            : "filter-btn"
                    }
                    onClick={() => setFilter(filterOption)}
                >
                    {filterOption}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;