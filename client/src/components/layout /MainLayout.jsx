import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="app-container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, padding: '20px 12px' }}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
