// src/components/Profile/BasicInfo.jsx
import React, { useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../utils/localStorage';
import { FaEdit } from 'react-icons/fa';

const genderOptions = ['Male', 'Female', 'Other'];
const stateOptions = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];
const countryOptions = ['India'];

const BasicInfo = () => {
  const user = getCurrentUser();
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    fname: user?.fname || '',
    lname: user?.lname || '',
    email: user?.email || '',
    yearOfBirth: user?.yearOfBirth || '',
    gender: user?.gender || '',
    phone: user?.phone || '',
    altPhone: user?.altPhone || '',
    address: user?.address || '',
    pincode: user?.pincode || '',
    domicileState: user?.domicileState || '',
    domicileCountry: user?.domicileCountry || '',
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
        <h5 className="mb-0">Basic Details</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setEditMode(!editMode)}
        >
          <FaEdit className="me-1" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="row gy-3">
        <div className="col-md-4">
          <label className="form-label">First name</label>
          <input
            disabled={!editMode}
            type="text"
            className="form-control"
            name="fname"
            placeholder="e.g. John"
            value={form.fname}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Last name</label>
          <input
            disabled={!editMode}
            type="text"
            className="form-control"
            name="lname"
            placeholder="e.g. Doe"
            value={form.lname}
            onChange={onChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email ID</label>
          <input
            disabled
            type="email"
            className="form-control"
            name="email"
            placeholder="e.g. mrnobody@mail.com"
            value={form.email}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Year of birth</label>
          <input
            disabled={!editMode}
            type="number"
            className="form-control"
            name="yearOfBirth"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="YYYY"
            value={form.yearOfBirth}
            onChange={onChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Gender</label>
          <select
            disabled={!editMode}
            className="form-select"
            name="gender"
            value={form.gender}
            onChange={onChange}
          >
            <option value="">Select an option</option>
            {genderOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Phone number</label>
          <div className="input-group">
            <span className="input-group-text">+91</span>
            <input
              disabled={!editMode}
              type="text"
              name="phone"
              className="form-control"
              placeholder="8332883854"
              value={form.phone}
              onChange={onChange}
              maxLength={10}
            />
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Alternate Phone no</label>
          <input
            disabled={!editMode}
            type="text"
            name="altPhone"
            className="form-control"
            placeholder="e.g. 9876543210"
            value={form.altPhone}
            onChange={onChange}
            maxLength={10}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            disabled={!editMode}
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter here"
            value={form.address}
            onChange={onChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Pincode</label>
          <input
            disabled={!editMode}
            type="text"
            name="pincode"
            className="form-control"
            placeholder="Enter here"
            value={form.pincode}
            onChange={onChange}
            maxLength={6}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Domicile state</label>
          <select
            disabled={!editMode}
            className="form-select"
            name="domicileState"
            value={form.domicileState}
            onChange={onChange}
          >
            <option value="">Select an option</option>
            {stateOptions.map(state => (
              <option value={state} key={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Domicile country</label>
          <select
            disabled={!editMode}
            className="form-select"
            name="domicileCountry"
            value={form.domicileCountry}
            onChange={onChange}
          >
            <option value="">Select an option</option>
            {countryOptions.map(c => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
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

export default BasicInfo;
