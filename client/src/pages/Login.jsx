import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: '20px' }}>
      <h1>Log in</h1>
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '16px',
          border: '1px solid #ef9a9a'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: 'rgba(255,255,255,0.05)', 
              color: 'inherit'
            }} 
            required 
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'inherit'
            }} 
            required 
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '12px', 
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#ff4500',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
        New to Reddit? <Link to="/register" style={{ color: '#ff4500', fontWeight: 'bold' }}>Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
