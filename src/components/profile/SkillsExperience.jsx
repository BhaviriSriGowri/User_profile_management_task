// src/components/Profile/SkillsExperience.jsx
import React, { useState, useRef } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../utils/localStorage';
import { FaEdit, FaFilePdf } from 'react-icons/fa';

const experienceOptions = [
  'None', '0-1 years', '1-2 years', '2-3 years', '3+ years'
];

const SkillsExperience = () => {
  const user = getCurrentUser();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    exp1Domain: user?.exp1Domain || '',
    exp1SubDomain: user?.exp1SubDomain || '',
    exp1Experience: user?.exp1Experience || '',
    exp2Domain: user?.exp2Domain || '',
    exp2SubDomain: user?.exp2SubDomain || '',
    exp2Experience: user?.exp2Experience || '',
    linkedin: user?.linkedin || '',
    resume: user?.resume || null,
    resumeName: user?.resumeName || '',
  });
  const resumeRef = useRef();

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onResumeChange = e => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setForm(prev => ({
          ...prev,
          resume: evt.target.result,
          resumeName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDetails = e => {
    e.preventDefault();
    updateCurrentUser(form);
    setEditMode(false);
  };

  return (
    <form onSubmit={saveDetails}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ fontSize: "1.5em" }}>Work Experience</h5>
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ borderRadius: 10 }}
          onClick={() => setEditMode(!editMode)}
        >
          <FaEdit className="me-2" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      {/* Work Experience Block 1 */}
      <div className="row gx-3 gy-3">
        <div className="col-md-4">
          <label className="form-label">Domain</label>
          <input
            disabled={!editMode}
            type="text"
            name="exp1Domain"
            className="form-control"
            placeholder="e.g. Technology"
            value={form.exp1Domain}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Sub-domain</label>
          <input
            disabled={!editMode}
            type="text"
            name="exp1SubDomain"
            className="form-control"
            placeholder="e.g. MERN Stack"
            value={form.exp1SubDomain}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Experience</label>
          <select
            disabled={!editMode}
            name="exp1Experience"
            className="form-select"
            value={form.exp1Experience}
            onChange={onChange}
          >
            <option value="">Select an option</option>
            {experienceOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Work Experience Block 2 */}
      <div className="row gx-3 gy-3 mt-1">
        <div className="col-md-4">
          <input
            disabled={!editMode}
            type="text"
            name="exp2Domain"
            className="form-control"
            placeholder="e.g. Technology"
            value={form.exp2Domain}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <input
            disabled={!editMode}
            type="text"
            name="exp2SubDomain"
            className="form-control"
            placeholder="e.g. MERN Stack"
            value={form.exp2SubDomain}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <select
            disabled={!editMode}
            name="exp2Experience"
            className="form-select"
            value={form.exp2Experience}
            onChange={onChange}
          >
            <option value="">Select an option</option>
            {experienceOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row gx-3 gy-3 mt-4">
        <div className="col-md-6">
          <h6 className="mb-2">LinkedIn</h6>
          <input
            disabled={!editMode}
            type="text"
            name="linkedin"
            className="form-control"
            placeholder="linkedin.com/in/yourprofile"
            value={form.linkedin}
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <h6 className="mb-2">Resume</h6>
          <div className="d-flex align-items-center">
            <input
              ref={resumeRef}
              style={{ display: "none" }}
              type="file"
              accept="application/pdf"
              onChange={onResumeChange}
              disabled={!editMode}
            />
            <button
              type="button"
              className="btn btn-outline-primary btn-sm me-2"
              style={{ minWidth: 120 }}
              onClick={() => resumeRef.current && resumeRef.current.click()}
              disabled={!editMode}
            >
              Upload Resume
            </button>
            {form.resume && (
              <a href={form.resume} target="_blank" rel="noopener noreferrer" className="ms-2">
                <FaFilePdf size={22} className="text-primary me-1" />
                {form.resumeName || 'View Resume'}
              </a>
            )}
          </div>
        </div>
      </div>
      {editMode && (
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary" style={{ borderRadius: 10 }}>Save</button>
        </div>
      )}
    </form>
  );
};

export default SkillsExperience;
