import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    navigate("/login")
  };
  return (
    <header>
      <div className="top-header">
        <div className="logo-section">
          <Link to="/" className="logo">
            <span className="logo-text">
              <span className="brand-name">Book</span>
              <span className="brand-name-accent">land</span>
            </span>
          </Link>
          <span className="logo-subtitle">Book Store Website</span>
        </div>

        <div className="search-section">
          <div className="category-dropdown">
            <select>
              <option>Category</option>
              <option>Photography</option>
              <option>Arts</option>
              <option>Adventure</option>
              <option>Action</option>
              <option>Games</option>
              <option>Movies</option>
              <option>Comics</option>
              <option>Biographies</option>
              <option>Children's Books</option>
              <option>Historical</option>
              <option>Contemporary</option>
              <option>Classics</option>
              <option>Education</option>
            </select>
          </div>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search Books Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
        </div>

        <div className="user-section">
          <div className="icon-button">
            <span className="icon"><Link to="/cart">🛒</Link></span>
            <span className="counter">5</span>
          </div>

          <div className="user-profile" ref={dropdownRef}>
            <div 
              className="profile-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src="../../../assets/image/OIP.jpg" alt="User Avatar" className="avatar" />
              <div className="user-info">
                <span className="user-name">Brian</span>
                <span className="user-email">info@gmail.com</span>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <span className="dropdown-name">Brian</span>
                  <span className="dropdown-email">info@gmail.com</span>
                </div>
                
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </Link>
                </div>
                
                <button onClick={handleLogout} className="logout-button">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/pages" className="nav-link">Pages</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-link">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">Blog</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

