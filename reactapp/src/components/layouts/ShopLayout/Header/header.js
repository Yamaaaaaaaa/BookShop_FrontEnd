"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./header.scss"
import { RiMenu2Line } from "react-icons/ri"
import { LuShoppingCart } from "react-icons/lu"
import { RiFindReplaceLine } from "react-icons/ri"
import { FaRegHeart } from "react-icons/fa6"
import { IoMdNotificationsOutline } from "react-icons/io"

function Header() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isSideBarOpen, setIsSideBarStatus] = useState(false)
    const userProfile = JSON.parse(sessionStorage.getItem("user"))
    console.log(userProfile)

    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "New book added to your wishlist",
            time: "5 min ago",
            read: false,
        },
        {
            id: 2,
            message: "Your order has been shipped",
            time: "2 hours ago",
            read: false,
        },
    ])
    const notificationDropdownRef = useRef(null)

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
                setIsNotificationDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("access_token")
        navigate("/login")
    }

    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
        )
    }

    const unreadCount = notifications.filter((notification) => !notification.read).length

    return (
    <header className="header">
        <div className="header__top">
            <div className="header__logo-section">
                <Link to="/" className="header__logo-section__logo">
                    <span className="header__logo-section__logo-text">
                        <span className="header__logo-section__logo-brand">Book</span>
                        <span className="header__logo-section__logo-brand header__logo-section__logo-brand--accent">land</span>
                    </span>
                </Link>
                <span className="header__logo-section__logo-subtitle">Book Store Website</span>
            </div>

            <div className="header__search-section">
                <div className="header__search-section__category-dropdown">
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

                <div className="header__search-section__search-bar">
                    <input
                        type="text"
                        placeholder="Search Books Here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Link className="header__search-section__search-button" to="/search" state={{ keyword: searchQuery }}>
                        <i className="header__search-section__search-icon">
                            <RiFindReplaceLine />
                        </i>
                    </Link>
                </div>
            </div>

            <div className="header__user-section">
                <div className="header__user-section__icon-button">
                    <span className="header__user-section__icon-button__icon">
                        <Link to="/wish-list">
                            <FaRegHeart />
                            <span className="header__user-section__icon-button__icon__counter">5</span>
                        </Link>
                    </span>
                    <span className="header__user-section__icon-button__icon">
                        <Link to="/cart">
                            <LuShoppingCart />
                            <span className="header__user-section__icon-button__icon__counter">3</span>
                        </Link>
                    </span>
                    <span className="header__user-section__icon-button__icon" ref={notificationDropdownRef}>
                        <div onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}>
                            <IoMdNotificationsOutline />
                            {unreadCount > 0 && (
                            <span className="header__user-section__icon-button__icon__counter">{unreadCount}</span>
                            )}
                        </div>

                    {
                    isNotificationDropdownOpen && (
                        <div className="header__user-section__notification-dropdown">
                            <div className="header__user-section__notification-dropdown__header">
                                <span className="header__user-section__notification-dropdown__title">Notifications</span>
                            </div>

                            <div className="header__user-section__notification-dropdown__content">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`header__user-section__notification-dropdown__item ${notification.read ? "read" : ""}`}
                                        >
                                            <div className="header__user-section__notification-dropdown__item-content">
                                                <p className="header__user-section__notification-dropdown__message">
                                                {notification.message}
                                                </p>
                                                <span className="header__user-section__notification-dropdown__time">
                                                {notification.time}
                                                </span>
                                            </div>
                                            <div className="header__user-section__notification-dropdown__actions">
                                                <button
                                                    className="header__user-section__notification-dropdown__action-btn"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    title="Mark as read"
                                                >
                                                    <span className="checkmark">✓</span>
                                                </button>
                                                <button
                                                    className="header__user-section__notification-dropdown__action-btn"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    title="Mark as read"
                                                >
                                                    <span className="checkmark">X</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                <div className="header__user-section__notification-dropdown__empty">No notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                    </span>
                </div>

                <div className="header__user-section__user-profile" ref={dropdownRef}>
                    <div
                    className="header__user-section__user-profile__profile-trigger"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src="../../../assets/image/OIP.jpg"
                            alt="User Avatar"
                            className="header__user-section__user-profile__profile-trigger__avatar"
                        />
                        <div className="header__user-section__user-profile__profile-trigger__user-info">
                            <span className="header__user-section__user-profile__profile-trigger__user-name">
                                {userProfile.name}
                            </span>
                            <span className="header__user-section__user-profile__profile-trigger__user-email">
                                {userProfile.email}
                            </span>
                        </div>
                    </div>

                    {isDropdownOpen && (
                    <div className="header__user-section__user-profile__profile-dropdown">
                        <div className="header__user-section__user-profile__profile-dropdown__dropdown-header">
                        <span className="header__user-section__user-profile__profile-dropdown__dropdown-name">
                            {userProfile.name}
                        </span>
                        <span className="header__user-section__user-profile__profile-dropdown__dropdown-email">
                            {userProfile.email}
                        </span>
                        </div>

                        <div className="header__user-section__user-profile__profile-dropdown__dropdown-menu">
                        <Link to="/profile" className="header__user-section__user-profile__profile-dropdown__dropdown-item">
                            <span className="header__user-section__user-profile__profile-dropdown__dropdown-icon">👤</span>
                            Profile
                        </Link>
                        </div>

                        <button
                        onClick={handleLogout}
                        className="header__user-section__user-profile__profile-dropdown__logout-button"
                        >
                        Log Out
                        </button>
                    </div>
                    )}
                </div>
                <button className="header__user-section__open-sidebar" onClick={() => setIsSideBarStatus(true)}>
                    <RiMenu2Line />
                </button>
            </div>
        </div>

        <nav className="header__main-nav">
            <ul className="header__main-nav__nav-links">
            <li className="header__main-nav__nav-links__nav-item">
                <Link to="/home" className="header__main-nav__nav-links__nav-link">
                Home
                </Link>
            </li>
            <li className="header__main-nav__nav-links__nav-item">
                <Link to="/shop" className="header__main-nav__nav-links__nav-link">
                Shop
                </Link>
            </li>
            <li className="header__main-nav__nav-links__nav-item">
                <Link to="/contact" className="header__main-nav__nav-links__nav-link">
                Contact Us
                </Link>
            </li>
            </ul>
        </nav>
        <div className={isSideBarOpen ? "header__side-bar open1" : "header__side-bar close"}>
            <div className={isSideBarOpen ? "header__side-bar__main open2" : "header__side-bar__main close"}>
            <Link to="/" className="header__side-bar__main__logo">
                <span className="header__side-bar__main__logo-text">
                <span className="header__side-bar__main__logo-brand">Book</span>
                <span className="header__side-bar__main__logo-brand header__side-bar__main__logo-brand--accent">
                    land
                </span>
                </span>
            </Link>
            <div className="header__side-bar__main__search-bar">
                <input
                type="text"
                placeholder="Search Books Here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="header__search-section__search-button">
                <i className="header__search-section__search-icon">
                    <RiFindReplaceLine />
                </i>
                </button>
            </div>
            <ul className="header__side-bar__main__nav-links">
                <li className="header__side-bar__main__nav-links__nav-item">
                <Link to="/home" className="header__side-bar__main__nav-links__nav-link">
                    Home
                </Link>
                </li>
                <li className="header__side-bar__main__nav-links__nav-item">
                <Link to="/pages" className="header__side-bar__main__nav-links__nav-link">
                    Pages
                </Link>
                </li>
                <li className="header__side-bar__main__nav-links__nav-item">
                <Link to="/shop" className="header__side-bar__main__nav-links__nav-link">
                    Shop
                </Link>
                </li>
                <li className="header__side-bar__main__nav-links__nav-item">
                <Link to="/blog" className="header__side-bar__main__nav-links__nav-link">
                    Blog
                </Link>
                </li>
                <li className="header__side-bar__main__nav-links__nav-item">
                <Link to="/contact" className="header__side-bar__main__nav-links__nav-link">
                    Contact Us
                </Link>
                </li>
            </ul>
            </div>
            <div className="header__side-bar__exit" onClick={() => setIsSideBarStatus(false)}></div>
        </div>
    </header>
  )
}

export default Header
