import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import NewCampaign from './pages/NewCampaign';
import Campaigns from './pages/Campaigns';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Register from './pages/Register';
import Financeiro from './pages/Financeiro';
import Sidebar from './components/Sidebar';
import Flows from './pages/Flows';
import FlowEditor from './pages/FlowEditor';
import { Toaster } from 'react-hot-toast';

// Inner component so useLocation works inside <Router>
function AppRoutes({ token, handleLogin, handleLogout, isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#102a43',
            border: '1px solid rgba(11, 61, 145, 0.16)',
            backdropFilter: 'blur(10px)'
          },
          success: { iconTheme: { primary: '#1677e8', secondary: '#ffffff' } },
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          .mobile-topbar {
            display: none !important;
          }
        }
      `}} />
      {!token ? (
        <Routes key={location.pathname}>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {/* Mobile Header Bar */}
          <header className="mobile-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0.75rem 1rem', height: '56px', boxSizing: 'border-box' }}>
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', padding: '8px', position: 'absolute', left: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#102a43', fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.05em' }}><svg width="25" height="25" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 10.5 16 5l9 5.5v11L16 27l-9-5.5v-11Z" fill="#eaf3ff" stroke="#1677e8" strokeWidth="2"/><path d="M10.5 17h4.2l2.2-4 2.2 4h2.4" stroke="#0b3d91" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>Meta<span style={{ color: '#1677e8' }}>Flow</span></span>
          </header>

          {/* Drawer Backdrop click listener overlay */}
          <div className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />

          <div className="app-container">
            <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="main-content">
              <Routes key={location.pathname}>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/contacts" element={<Contacts token={token} />} />
                <Route path="/campaigns" element={<Campaigns token={token} />} />
                <Route path="/new-campaign" element={<NewCampaign token={token} />} />
                <Route path="/reports" element={<Reports token={token} />} />
                <Route path="/settings" element={<Settings token={token} />} />
                <Route path="/financial" element={<Financeiro token={token} />} />
                <Route path="/flows" element={<Flows token={token} />} />
                <Route path="/flows/:platform" element={<FlowEditor token={token} setIsSidebarOpen={setIsSidebarOpen} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const hasDisparos = window.location.pathname.startsWith('/disparos');
  const routerBasename = hasDisparos ? '/disparos' : undefined;

  return (
    <Router basename={routerBasename}>
      <AppRoutes
        token={token}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </Router>
  );
}

export default App;
