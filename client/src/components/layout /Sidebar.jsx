import { Link } from "react-router-dom";
import { useState } from "react";

function Icon({ name, size = 18 }) {
  switch (name) {
    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case 'popular':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M5 9l7-7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case 'explore':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    default:
      return null;
  }
}

function Sidebar() {
  const [resourcesOpen, setResourcesOpen] = useState(true);

  const resources = [
    { key: 'about', label: 'About Reddit' },
    { key: 'advertise', label: 'Advertise' },
    { key: 'dev', label: 'Developer Platform' },
    { key: 'pro', label: 'Reddit Pro' },
    { key: 'help', label: 'Help' },
    { key: 'blog', label: 'Blog' },
    { key: 'careers', label: 'Careers' },
    { key: 'press', label: 'Press' },
  ];

  const communities = ['Popular', 'r/reactjs', 'r/webdev', 'r/javascript', 'r/frontend', 'r/design'];

  return (
    <div style={{ position: 'relative' }}>
      <button className="menu-circle" aria-label="menu" title="menu">☰</button>

      <nav className="sidebar-dark sidebar-sticky" aria-label="side navigation">
        <ul style={{ listStyle: 'none', padding: 8, margin: 0 }}>
          <li className="sidebar-item"><Link to="/" className="sidebar-link"><span className="sidebar-icon"><Icon name="home"/></span>Home</Link></li>
          <li className="sidebar-item sidebar-selected"><Link to="/popular" className="sidebar-link"><span className="sidebar-icon"><Icon name="popular"/></span>Popular</Link></li>
          <li className="sidebar-item"><Link to="/explore" className="sidebar-link"><span className="sidebar-icon"><Icon name="explore"/></span>Explore</Link></li>
        </ul>

        <div className="sidebar-divider" />

        <div style={{ padding: '8px 8px 0 8px' }}>
          <div className="sidebar-heading" onClick={() => setResourcesOpen((s) => !s)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: 1 }}>RESOURCES</div>
            <div style={{ color: 'var(--muted)' }}>{resourcesOpen ? '▾' : '▸'}</div>
          </div>

          {resourcesOpen && (
            <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
              {resources.map((r) => (
                <li key={r.key} className="sidebar-item"><Link to={`/${r.key}`} className="sidebar-link small"><span className="sidebar-icon">◻</span>{r.label}</Link></li>
              ))}
            </ul>
          )}
        </div>

        <div className="sidebar-divider" />

        <div style={{ padding: 8 }}>
          <div style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: 1, marginBottom: 6 }}>COMMUNITIES</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {communities.map((c) => (
              <li key={c} className="sidebar-item"><Link to={`/communities/${c}`} className="sidebar-link">{c}</Link></li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
