import React from 'react';

export default function Signup() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Signup Page</h2>
      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <button>Signup</button>
    </div>
  );
}
