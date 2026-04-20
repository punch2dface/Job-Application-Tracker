import { useEffect, useState } from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import FilterBar from "./components/FilterBar";
import JobList from "./components/JobList";

function App() {
  
  // Stores all job applications returned from the backend.
  const [jobs, setJobs] = useState([]);

  // UI state for request handling and user feedback.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state used for both creating and editing a job.
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  // Tracks the job currently being edited.
  // null means the form is in "add new job" mode.
  const [editJobId, setEditJobId] = useState(null);

  // Controls which jobs are visible in the list.
  const [filter, setFilter] = useState("All");

  // Controls modal visibility for add/edit actions.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all jobs from the backend when the page loads.
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/jobs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      setJobs(data);
    } catch (err) {
      setError("Could not load jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields and exit edit/modal state.
  const resetForm = () => {
    setCompany("");
    setRole("");
    setStatus("Applied");
    setNotes("");
    setEditJobId(null);
    setIsModalOpen(false);
  };

  // Open the modal in "add new job" mode.
  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open the modal in edit mode and preload the selected job values.
  const handleEditJob = (job) => {
    setEditJobId(job._id);
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setNotes(job.notes || "");
    setIsModalOpen(true);
  };

  // Handle both create and update actions using the same form.
  const handleSubmitJob = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const isEditing = Boolean(editJobId);
      const url = isEditing
        ? `http://localhost:5000/jobs/${editJobId}`
        : "http://localhost:5000/jobs";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          status,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          isEditing ? "Failed to update job" : "Failed to create job"
        );
      }

      if (isEditing) {
        // Replace the updated job in local state.
        setJobs((previousJobs) =>
          previousJobs.map((job) => (job._id === editJobId ? data : job))
        );
      } else {
        // Add the new job to the top of the list.
        setJobs((previousJobs) => [data, ...previousJobs]);
      }

      resetForm();
    } catch (err) {
      setError(editJobId ? "Could not update job." : "Could not add job.");
    }
  };

  // Delete a job from the backend and remove it from local state.
  const handleDeleteJob = async (id) => {
    try {
      setError("");

      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );
    } catch (err) {
      setError("Could not delete job.");
    }
  };

  // Derive the visible job list from the selected filter.
  const filteredJobs = jobs.filter((job) => {
    if (filter === "All") return true;
    return job.status === filter;
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="app">
      <div className="page-header">
        <h1>Job Application Tracker</h1>
      </div>

      <div className="toolbar">
        <FilterBar filter={filter} setFilter={setFilter} />
        <button className="open-modal-btn" onClick={handleOpenAddModal}>
          Add Job
        </button>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <JobList
          filteredJobs={filteredJobs}
          handleEditJob={handleEditJob}
          handleDeleteJob={handleDeleteJob}
        />
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <JobForm
              company={company}
              setCompany={setCompany}
              role={role}
              setRole={setRole}
              status={status}
              setStatus={setStatus}
              notes={notes}
              setNotes={setNotes}
              editJobId={editJobId}
              handleSubmitJob={handleSubmitJob}
              resetForm={resetForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;