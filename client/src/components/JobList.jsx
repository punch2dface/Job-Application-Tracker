import JobCard from "./JobCard";

function JobList({ filteredJobs, handleEditJob, handleDeleteJob }) {
    
    // Show a friendly empty state when no jobs match the current filter.
    if (filteredJobs.length === 0) {
        return(
            <div className="empty-state">
                <p className="empty-message">No jobs found for this status.</p>
            </div>
        );
    }

    return (
        <ul className="job-list">
            {filteredJobs.map((job) => (
                <JobCard
                    key={job._id}
                    job={job}
                    handleEditJob={handleEditJob}
                    handleDeleteJob={handleDeleteJob}
                />
            ))}
        </ul>
    );
}

export default JobList;