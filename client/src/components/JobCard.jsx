function JobCard({ job, handleEditJob, handleDeleteJob }) {
    return (
        <li className="job-card">
            <div className="job-card-header">
                <div>
                    <h3>{job.company}</h3>
                    <p className="job-role">{job.role}</p>
                </div>

                {/* Compact delete action placed in the card header to reduce visual clutter. */}
                <button
                    type="button"
                    className="delete-icon-btn"
                    onClick={() => handleDeleteJob(job._id)}
                    aria-label={`Delete ${job.company}`}
                >
                    x
                </button>
            </div>

            <p className="job-status">
                <strong>Status:</strong> {job.status}
            </p>

            <p className="job-notes">
                <strong>Notes:</strong> {job.notes || "No notes"}
            </p>

            <div className="job-actions">
                <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEditJob(job)}
                >
                    Edit
                </button>
            </div>
        </li>
    );
}

export default JobCard;