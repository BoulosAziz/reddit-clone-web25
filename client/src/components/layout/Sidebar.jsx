import { Link } from 'react-router-dom';
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar-left">
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">FEEDS</h3>
        <Link to="/" className="sidebar-link active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </Link>
        <Link to="/popular" className="sidebar-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span>Popular</span>
        </Link>
        <Link to="/explore" className="sidebar-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8"/>
          </svg>
          <span>Explore</span>
        </Link>
        <div className="sidebar-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span>All</span>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">RECENT COMMUNITIES</h3>
        <div className="sidebar-link">
          <span className="community-emoji">💻</span>
          <span>r/technology</span>
        </div>
        <div className="sidebar-link">
          <span className="community-emoji">🔬</span>
          <span>r/science</span>
        </div>
        <div className="sidebar-link">
          <span className="community-emoji">🎮</span>
          <span>r/gaming</span>
        </div>
        <div className="sidebar-link">
          <span className="community-emoji">🎬</span>
          <span>r/movies</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
