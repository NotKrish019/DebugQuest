import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Arena from './pages/Arena';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Docs from './pages/Docs';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import SetupProfile from './pages/SetupProfile';
import './App.css';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  user: null,
  xp: 1240,
  addXp: () => {},
  login: () => {},
  logout: () => {}
});

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(1240);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('dq_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setXp(parsed.xp || 1240);
      setIsAuthenticated(true);
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('dq_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dq_user');
  };

  const addXp = (amount) => {
    setXp(prev => {
      const newXp = Math.min(prev + amount, 100000);
      if (user) {
        const updatedUser = { ...user, xp: newXp };
        setUser(updatedUser);
        localStorage.setItem('dq_user', JSON.stringify(updatedUser));
      }
      return newXp;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, user, xp, addXp, login, logout }}>
      <Router>
        <div className="app-container h-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setup-profile" element={<SetupProfile />} />
            
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/login" />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/arena" element={isAuthenticated ? <Arena /> : <Navigate to="/login" />} />
            
            <Route path="/challenge" element={<Navigate to="/arena" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;


