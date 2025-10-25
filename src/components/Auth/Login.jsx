import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

const mainBlue = '#2b6cb0';
const tabActive = '#fff';
const tabInactive = '#2b6cb0';
const tabActiveText = '#2b6cb0';

export default function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigate('/profile');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #2362a1 0%, #2b6cb0 80%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        minWidth: 350,
        maxWidth: 380,
        width: '100%',
        background: 'white',
        borderRadius: 22,
        boxShadow: '0 8px 32px rgba(43, 108, 176, 0.12), 0 1.5px 5px #2b6cb044',
        padding: '38px 28px 28px',
      }}>
        <div style={{ display: "flex", marginBottom: 36, gap: 16 }}>
          <button type="button"
            style={{
              flex: 1,
              background: showSignup ? tabInactive : tabActive,
              color: showSignup ? "#fff" : tabActiveText,
              border: "none",
              borderRadius: 12,
              padding: "11px 0",
              fontWeight: 600,
              fontSize: "1.13em",
              boxShadow: !showSignup ? "0 3px 10px #2b6cb022" : undefined,
              cursor: "pointer",
              transition: "background .18s"
            }}
            onClick={() => setShowSignup(false)}>
            Login
          </button>
          <button type="button"
            style={{
              flex: 1,
              background: showSignup ? tabActive : tabInactive,
              color: showSignup ? tabActiveText : "#fff",
              border: "none",
              borderRadius: 12,
              padding: "11px 0",
              fontWeight: 600,
              fontSize: "1.13em",
              boxShadow: showSignup ? "0 3px 10px #2b6cb022" : undefined,
              cursor: "pointer",
              transition: "background .18s"
            }}
            onClick={() => setShowSignup(true)}>
            Signup
          </button>
        </div>
        {!showSignup ? (
          <form onSubmit={handleLogin} autoComplete="off" style={{ animation: "fadein .5s" }}>
            <h4 style={{ color: mainBlue, fontWeight: 700, marginBottom: 18, letterSpacing: 1, textAlign: "center" }}>Student Login</h4>
            <input className="form-control mb-3"
              style={{
                fontSize: "1.09em", borderRadius: 10, padding: "10px",
                border: `1.2px solid ${mainBlue}22`
              }}
              autoFocus
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input className="form-control mb-3"
              style={{
                fontSize: "1.09em", borderRadius: 10, padding: "10px",
                border: `1.2px solid ${mainBlue}22`
              }}
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {loginError && <div className="text-danger mb-2" style={{ fontWeight: 'bold', textAlign: "center" }}>{loginError}</div>}
            <button style={{
              background: mainBlue,
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: 14,
              fontSize: "1.15em",
              padding: "11px 0",
              width: "100%",
              marginTop: 6,
              marginBottom: -6,
              letterSpacing: 1,
              boxShadow: "0 2.5px 10px #6cb7f322"
            }}>Login</button>
          </form>
        ) : <Signup setShowSignup={setShowSignup}/>}
      </div>
    </div>
  );
}

function Signup({ setShowSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      setSignupError("User already exists with this email");
      setSuccessMsg('');
      return;
    }
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccessMsg("Signup successful! You can login now.");
    setSignupError('');
    setTimeout(() => setShowSignup(false), 1200);
  };

  return (
    <form onSubmit={handleSignup} autoComplete="off" style={{ animation: "fadein .5s" }}>
      <h4 style={{ color: mainBlue, fontWeight: 700, marginBottom: 18, letterSpacing: 1, textAlign: "center" }}>Student Signup</h4>
      <input className="form-control mb-3"
        style={{
          fontSize: "1.09em", borderRadius: 10, padding: "10px",
          border: `1.2px solid ${mainBlue}22`
        }}
        required
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input className="form-control mb-3"
        style={{
          fontSize: "1.09em", borderRadius: 10, padding: "10px",
          border: `1.2px solid ${mainBlue}22`
        }}
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input className="form-control mb-3"
        style={{
          fontSize: "1.09em", borderRadius: 10, padding: "10px",
          border: `1.2px solid ${mainBlue}22`
        }}
        required
        placeholder="Phone Number"
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0,10))}
      />
      <input className="form-control mb-3"
        style={{
          fontSize: "1.09em", borderRadius: 10, padding: "10px",
          border: `1.2px solid ${mainBlue}22`
        }}
        required
        type="password"
        placeholder="Password"
        minLength={4}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {signupError && <div className="text-danger mb-2" style={{ fontWeight: 'bold', textAlign: "center" }}>{signupError}</div>}
      {successMsg && <div className="text-success mb-2" style={{ fontWeight: 'bold', textAlign: "center" }}>{successMsg}</div>}
      <button style={{
        background: mainBlue,
        color: "#fff",
        fontWeight: "600",
        border: "none",
        borderRadius: 14,
        fontSize: "1.15em",
        padding: "11px 0",
        width: "100%",
        marginTop: 6,
        marginBottom: -6,
        letterSpacing: 1,
        boxShadow: "0 2.5px 10px #6cb7f322"
      }}>Signup</button>
    </form>
  );
}
