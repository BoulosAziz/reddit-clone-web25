import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
