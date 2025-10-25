import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import BasicInfo from './BasicInfo';
import Education from './Education';
import SkillsExperience from './SkillsExperience';
import { getCurrentUser } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const tabConfig = [
  { key: 'basic', label: 'Basic Info', component: BasicInfo },
  { key: 'education', label: 'Education & Skills', component: Education },
  { key: 'experience', label: 'Experience', component: SkillsExperience },
];

const mainBlue = "#2b6cb0";
const lightBlue = "#ecf4ff";

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState('basic');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);

  const handleSaveNewUser = () => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...newUser, password: '' });
    localStorage.setItem('users', JSON.stringify(users));
    setShowAddUser(false);
    setNewUser({ name: '', email: '', phone: '' });
    // Optionally trigger a rerender or refresh user list
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #2362a1 0%, #2b6cb0 80%)',
      padding: '0',
      margin: '0'
    }}>
      <div className="container-fluid py-4" style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* --- Profile Header --- */}
        <div style={{
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 12px 40px rgba(43, 108, 176, 0.18), 0 2px 8px #2b6cb030',
          padding: '42px 48px 32px',
          marginBottom: 24
        }}>
          <div className="row align-items-center">
            {/* Profile Icon */}
            <div className="col-12 col-lg-3 col-md-4 text-center mb-4 mb-md-0">
              <FaUserCircle size={120} color="#b3cdf6" />
            </div>
            {/* Info Section */}
            <div className="col-12 col-lg-7 col-md-6">
              <h1 style={{
                fontWeight: 800,
                marginBottom: 16,
                color: mainBlue,
                fontSize: "2.2em"
              }}>
                {user?.name || 'Student Name'}
              </h1>
              <div style={{ fontSize: "1.17em", color: "#444" }}>{user?.email}</div>
              <div style={{ fontSize: "1.17em", color: "#444" }}>{user?.phone}</div>
            </div>
            {/* Buttons */}
            <div className="col-12 col-lg-2 col-md-2 text-end">
              <div className="mb-2 text-end">
                <button
                  className="btn btn-success me-2 mb-2"
                  style={{ borderRadius: 14, fontWeight: 500 }}
                  onClick={handleAddUser}
                >
                  + Add User
                </button>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 16,
                  padding: '12px 24px',
                  fontSize: '1.1em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 3px 12px rgba(220, 53, 69, 0.25)'
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
          <hr style={{
            margin: "38px 0 24px",
            borderColor: "#b3cdf6",
            borderWidth: 2.3,
            opacity: 0.7
          }} />
          {/* Tabs */}
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {tabConfig.map(tab => (
              <button
                key={tab.key}
                type="button"
                style={{
                  background: currentTab === tab.key ? mainBlue : lightBlue,
                  color: currentTab === tab.key ? "#fff" : mainBlue,
                  border: "none",
                  borderRadius: 18,
                  padding: '14px 36px',
                  fontWeight: 700,
                  fontSize: "1.18em",
                  boxShadow: currentTab === tab.key
                    ? "0 4px 16px rgba(43, 108, 176, 0.3)"
                    : "0 2px 8px rgba(43, 108, 176, 0.1)",
                  transition: "all .2s",
                  cursor: "pointer",
                  minWidth: 170
                }}
                onClick={() => setCurrentTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* --- Tab Content --- */}
        <div style={{
          background: '#f8fafb',
          border: 'none',
          borderRadius: 22,
          padding: '38px 48px',
          fontSize: "1.15em",
          boxShadow: '0 8px 32px rgba(43, 108, 176, 0.12)',
          minHeight: 400
        }}>
          {React.createElement(tabConfig.find(tab => tab.key === currentTab).component)}
        </div>
      </div>
      {/* Add User Modal */}
      <Modal show={showAddUser} onHide={handleCloseAddUser} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Name of the user</label>
            <input className="form-control"
                   value={newUser.name}
                   onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
          </div>
          <div className="mb-3 d-flex gap-2">
            <div style={{ flex: 2 }}>
              <label>E-mail</label>
              <input className="form-control"
                     value={newUser.email}
                     onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Contact</label>
              <input className="form-control"
                     value={newUser.phone}
                     onChange={e => setNewUser({ ...newUser, phone: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddUser}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveNewUser}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
