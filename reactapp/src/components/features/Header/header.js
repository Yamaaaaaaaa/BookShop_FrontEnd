import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./header.scss"

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo-section">
          <Link to="/" className="header__logo">
            <span className="header__logo-text">
              <span className="header__logo-brand">Book</span>
              <span className="header__logo-brand header__logo-brand--accent">land</span>
            </span>
          </Link>
          <span className="header__logo-subtitle">Book Store Website</span>
        </div>

        <div className="header__search-section">
          <div className="header__category-dropdown">
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

          <div className="header__search-bar">
            <input
              type="text"
              placeholder="Search Books Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="header__search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
        </div>

        <div className="header__user-section">
          <div className="header__icon-button">
            <span className="icon">
              <Link to="/cart">🛒</Link>
            </span>
            <span className="counter">5</span>
          </div>

          <div className="header__user-profile" ref={dropdownRef}>
            <div className="header__profile-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src="../../../assets/image/OIP.jpg" alt="User Avatar" className="header__avatar" />
              <div className="header__user-info">
                <span className="header__user-name">Brian</span>
                <span className="header__user-email">info@gmail.com</span>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="header__profile-dropdown">
                <div className="header__dropdown-header">
                  <span className="header__dropdown-name">Brian</span>
                  <span className="header__dropdown-email">info@gmail.com</span>
                </div>

                <div className="header__dropdown-menu">
                  <Link to="/profile" className="header__dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </Link>
                </div>

                <button onClick={handleLogout} className="header__logout-button">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="header__main-nav">
        <ul className="header__nav-links">
          <li className="header__nav-item">
            <Link to="/home" className="header__nav-link">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/pages" className="header__nav-link">
              Pages
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/shop" className="header__nav-link">
              Shop
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/blog" className="header__nav-link">
              Blog
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/contact" className="header__nav-link">
              Contact Us
            </Link>
          </li>
        </ul>
        <button className="header__get-in-touch">Get in Touch</button>
      </nav>
    </header>
  )
}

export default Header

