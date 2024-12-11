import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [historyStack, setHistoryStack] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [user, setUser] = useState(null);

  // Navigation History Management
  useEffect(() => {
    if (historyStack[currentIndex] !== location.pathname) {
      const updatedHistory = [...historyStack.slice(0, currentIndex + 1), location.pathname];
      setHistoryStack(updatedHistory);
      setCurrentIndex(updatedHistory.length - 1);
    }
  }, [location.pathname]);

  // Sync User Session
  useEffect(() => {
    const syncUserSession = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    syncUserSession();
    window.addEventListener('storage', syncUserSession);

    return () => window.removeEventListener('storage', syncUserSession);
  }, []);

  const handleNext = () => {
    if (currentIndex < historyStack.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      navigate(historyStack[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      navigate(historyStack[currentIndex - 1]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button className="nav-arrow" onClick={handlePrev} disabled={currentIndex <= 0}>
          &lt;
        </button>
        <button className="nav-arrow" onClick={handleNext} disabled={currentIndex >= historyStack.length - 1}>
          &gt;
        </button>
      </div>

      {user ? (
        <div className="user-menu">
          <span>Welcome, {user.name || user.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')} className="login-btn">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="signup-btn">
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
