import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddUserModal = ({ show, onHide, newUser, setNewUser, onSave }) => (
  <Modal show={show} onHide={onHide} centered>
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
      <Button variant="secondary" onClick={onHide}>Cancel</Button>
      <Button variant="primary" onClick={onSave}>Add</Button>
    </Modal.Footer>
  </Modal>
);

export default AddUserModal;
