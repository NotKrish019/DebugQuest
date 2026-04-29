import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import LandingPage from './pages/LandingPage';
import Arena from './pages/Arena';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Docs from './pages/Docs';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import SetupProfile from './pages/SetupProfile';
import ArenaSelection from './pages/ArenaSelection';
import './App.css';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  user: null,
  xp: 0,
  addXp: () => {},
  logout: () => {}
});

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData;
        if (userDoc.exists()) {
          userData = { id: firebaseUser.uid, ...userDoc.data() };
        } else {
          // New user, create profile
          userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.displayName || 'Hunter',
            xp: 0,
            level: 1,
            rank_title: 'Novice Hunter',
            joinedAt: new Date().toISOString()
          };
          await setDoc(userDocRef, userData);
        }
        
        setUser(userData);
        setXp(userData.xp || 0);
        setIsAuthenticated(true);
        
        // Listen for real-time XP updates
        const unsubDoc = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setXp(doc.data().xp || 0);
            setUser(prev => ({ ...prev, ...doc.data() }));
          }
        });
        
        setLoading(false);
        return () => unsubDoc();
      } else {
        setUser(null);
        setXp(0);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
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

  const logout = async () => {
    await signOut(auth);
  };

  const addXp = async (amount) => {
    if (!user) return;
    const newXp = (user.xp || 0) + amount;
    const newLevel = Math.floor(newXp / 2000) + 1;
    
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, { 
      xp: newXp,
      level: newLevel
    }, { merge: true });
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, user, xp, addXp, logout }}>
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
            <Route path="/arena-selection" element={isAuthenticated ? <ArenaSelection /> : <Navigate to="/login" />} />
            <Route path="/arena" element={isAuthenticated ? <Arena /> : <Navigate to="/login" />} />
            
            <Route path="/challenge" element={<Navigate to="/arena" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;


