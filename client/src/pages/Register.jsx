import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { register } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await register(username, email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
