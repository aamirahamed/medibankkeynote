import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CopilotPanel from './CopilotPanel';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-scroll">
          <Outlet />
        </div>
      </main>
      <CopilotPanel />
    </div>
  );
};

export default Layout;
