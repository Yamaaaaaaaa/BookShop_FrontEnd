import { Link, useNavigate } from "react-router-dom"
import "./profile.scss"
import { LuShoppingCart } from "react-icons/lu";
import { FaBell, FaLock, FaQuestion, FaRegHeart, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import { useEffect, useState } from "react";


const Profile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    useEffect(() => {
        setUserProfile(JSON.parse(sessionStorage.getItem("user")))
    }, [])
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        navigate("/login")
    }

    return (
        <div className="profile-main">
            <aside className="sidebar">
                <div className="profile-section">
                    <div className="profile-image">
                        <img src="https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg" alt="Profile Picture"/>
                    </div>
                    <h2 className="profile-name">{userProfile.name}</h2>
                    <p className="profile-title">Customer</p>
                </div>
                <nav>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link active"><i><FaUser /></i> Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link"><i><LuShoppingCart /></i> My Cart</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i><FaRegHeart /></i> Wishlist</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/shop" className="nav-link"><i><FaShop /></i>My Shop</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i><FaBell /></i> Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i><FaQuestion /></i> Help Desk</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i><FaLock /></i> Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link button-logout"><i><IoIosExit /></i> Log Out</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <section className="section">
                    <h2 className="section-title">BASIC INFORMATION</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Your Name:</label>
                            <input type="text" className="form-control" value={userProfile.name}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input type="text" className="form-control" value={userProfile.email}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Address:</label>
                            <input type="text" className="form-control" value={userProfile.address}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number:</label>
                            <input type="text" className="form-control" value={userProfile.phone}/>
                        </div>
                        <div className="form-group full-width">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Profile