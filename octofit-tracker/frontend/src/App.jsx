import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const logoUrl = new URL('../../../docs/octofitapp-small.png', import.meta.url).href;

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' }
];

function App() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <header className="bg-primary text-white py-4 shadow-sm">
        <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <img src={logoUrl} alt="Octofit Tracker" width="48" height="48" className="rounded" />
            <div>
              <h1 className="h3 mb-1">Octofit Tracker</h1>
              <p className="mb-0 text-white-50">React 19 presentation tier for the multi-tier application</p>
            </div>
          </div>
          <nav className="navbar navbar-expand">
            <ul className="navbar-nav flex-row gap-2">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink className="nav-link text-white" to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <div className="alert alert-info" role="status">
          <strong>Environment note:</strong> define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> before running the app. Example: <code>VITE_CODESPACE_NAME=my-codespace</code>
        </div>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
