function JobForm({
    company,
    setCompany,
    role,
    setRole,
    status,
    setStatus,
    notes,
    setNotes,
    editJobId,
    handleSubmitJob,
    resetForm,
}) {
    return (
        <form className="job-form" onSubmit={handleSubmitJob}>

            {/* The same form is reused for both add and edit flows. */}
            <h2 className="form-title">
                {editJobId ? "Edit Job" : "Add New Job"}
            </h2>

            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />

            <button type="submit">
                {editJobId ? "Update Job" : "Add Job"}
            </button>

            {editJobId && (
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default JobForm;