import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, ShieldCheck, LogOut, Search } from 'lucide-react';
import './AdminLayout.css';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>BePilot <span>Admin</span></h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/pending" 
            className={`nav-link ${location.pathname.includes('/pending') ? 'active' : ''}`}
          >
            <ShieldCheck size={20} />
            <span>Validações Pendentes</span>
          </Link>
          
          <Link 
            to="/active" 
            className={`nav-link ${location.pathname.includes('/active') ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Instrutores Ativos</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="search-bar">
            <Search size={20} color="#6B7280" />
            <input type="text" placeholder="Buscar instrutor..." />
          </div>
          <div className="admin-profile">
            <div className="avatar">AD</div>
            <span>Administrador</span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
