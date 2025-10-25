// src/components/Profile/Education.jsx
import React, { useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../utils/localStorage';
import { FaEdit } from 'react-icons/fa';

const degreeOptions = [
  'Bachelors in Technology', 'Masters', 'Diploma', 'Other'
];

const yearOptions = Array.from({ length: 40 }, (_, idx) => (new Date().getFullYear() - idx).toString());

const Education = () => {
  const user = getCurrentUser();
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    school: user?.school || '',
    degree: user?.degree || '',
    course: user?.course || '',
    yearOfCompletion: user?.yearOfCompletion || '',
    grade: user?.grade || '',
    skills: user?.skills || '',
    projects: user?.projects || '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveDetails = e => {
    e.preventDefault();
    updateCurrentUser(form);
    setEditMode(false);
  };

  return (
    <form onSubmit={saveDetails}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Education Details</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setEditMode(!editMode)}
        >
          <FaEdit className="me-1" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="row gx-3 gy-3">
        <div className="col-md-6">
          <label className="form-label">School / College</label>
          <input
            disabled={!editMode}
            type="text"
            name="school"
            className="form-control"
            placeholder="e.g. Lincoln College"
            value={form.school}
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Highest degree or equivalent</label>
          <input
            disabled={!editMode}
            type="text"
            name="degree"
            className="form-control"
            placeholder="e.g. Bachelors in Technology"
            value={form.degree}
            onChange={onChange}
            list="degree-list"
          />
          <datalist id="degree-list">
            {degreeOptions.map(opt => <option key={opt} value={opt} />)}
          </datalist>
        </div>
        <div className="col-md-4">
          <label className="form-label">Course</label>
          <input
            disabled={!editMode}
            type="text"
            name="course"
            className="form-control"
            placeholder="e.g. Computer Science Engineering"
            value={form.course}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Year of completion</label>
          <select
            disabled={!editMode}
            name="yearOfCompletion"
            className="form-select"
            value={form.yearOfCompletion}
            onChange={onChange}
          >
            <option value="">YYYY</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Grade</label>
          <input
            disabled={!editMode}
            type="text"
            name="grade"
            className="form-control"
            placeholder="Enter here"
            value={form.grade}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="row gx-3 gy-3 mt-4">
        <div className="col-md-6">
          <h6 className="mb-2">Skills</h6>
          <textarea
            disabled={!editMode}
            name="skills"
            className="form-control"
            placeholder="Enter here"
            value={form.skills}
            onChange={onChange}
            rows={3}
          />
        </div>
        <div className="col-md-6">
          <h6 className="mb-2">Projects</h6>
          <textarea
            disabled={!editMode}
            name="projects"
            className="form-control"
            placeholder="Enter here"
            value={form.projects}
            onChange={onChange}
            rows={3}
          />
        </div>
      </div>
      {editMode && (
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      )}
    </form>
  );
};

export default Education;
