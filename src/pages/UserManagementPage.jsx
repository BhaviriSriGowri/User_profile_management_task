import React, { useState } from 'react';
import UserTable from '../components/Users/UserTable';
import AddUserModal from '../components/Users/AddUserModal';

const UserManagementPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...newUser, password: '' });
    localStorage.setItem('users', JSON.stringify(users));
    setShowAdd(false);
    setNewUser({ name: '', email: '', phone: '' });
  };

  return (
    <div style={{ background: "#f8fafb", minHeight: "100vh", padding: "36px 0" }}>
      <UserTable onAddUserClick={() => setShowAdd(true)} />
      <AddUserModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        newUser={newUser}
        setNewUser={setNewUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagementPage;
