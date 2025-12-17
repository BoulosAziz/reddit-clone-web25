import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";

function Navbar() {
  return (
    <header className="topbar" style={{ background: 'linear-gradient(90deg,#ff4500,#ff6a00)', color: 'white' }}>
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px' }}>
        <div className="topbar-logo" style={{ alignItems: 'center', display: 'flex' }}>
          <div className="logo-circle" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>r</div>
          <Link to="/" style={{ marginLeft: 8, color: 'var(--text)', textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>RedditClone</Link>
        </div>

        <div style={{ marginLeft: 12, flex: 1 }}>
          <input className="topbar-search" placeholder="Search RedditClone" />
        </div>

        <nav style={{ marginLeft: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link to="/communities" style={{ color: 'var(--text)', textDecoration: 'none' }}>Communities</Link>
          <Link to="/create" style={{ color: 'var(--text)', textDecoration: 'none' }}>Create Post</Link>
          <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none' }}>Log in</Link>
          <Link to="/register" className="signup-btn" style={{ textDecoration: 'none' }}>Sign up</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '6px 8px', borderRadius: 6 }}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}