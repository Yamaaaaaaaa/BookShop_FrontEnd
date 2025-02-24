import { Link, useNavigate } from "react-router-dom"
import "./profile.scss"

const mock_profiles = {
    name : "Alexander Weir",
    job: "Web Designer",
    age: 18,
    language: "Language",
    description: "Lorem Ipsum is simply dummy text of the printing",
    phonenumber: "+1 123 456 7890",
    email: "info@example.com",
    country: "Country name",
    postcode: "Post Code",
    city: "City Name",
    fulladress: "New York"
}

const Profile = () => {
    const navigate = useNavigate()
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
                    <h2 className="profile-name">David Matin</h2>
                    <p className="profile-title">Web developer</p>
                </div>
                <nav>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link active"><i>👤</i> Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link"><i>🛒</i> My Cart</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i>❤️</i> Wishlist</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/shop" className="nav-link"><i>🏪</i>My Shop</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i>🔔</i> Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i>❓</i> Help Desk</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link"><i>🔒</i> Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link button-logout"><i>↪️</i> Log Out</button>
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
                            <input type="text" className="form-control" value={mock_profiles.name}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Professional title:</label>
                            <input type="text" className="form-control" value={mock_profiles.job}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Languages:</label>
                            <input type="text" className="form-control" value={mock_profiles.language}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Age:</label>
                            <input type="text" className="form-control" value={mock_profiles.age}/>
                        </div>
                        <div className="form-group full-width">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control">{mock_profiles.description}</textarea>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title">CONTACT INFORMATION</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Contact Number:</label>
                            <input type="tel" className="form-control" value={mock_profiles.phonenumber}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address:</label>
                            <input type="email" className="form-control" value={mock_profiles.email}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Country:</label>
                            <input type="text" className="form-control" value={mock_profiles.country}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Postcode:</label>
                            <input type="text" className="form-control" value={mock_profiles.postcode}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">City:</label>
                            <input type="text" className="form-control" value={mock_profiles.city}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Full Address:</label>
                            <input type="text" className="form-control" value={mock_profiles.city}/>
                        </div>
                    </div>
                    <button className="save-button">Save Setting</button>
                </section>
            </main>
        </div>
    )
}

export default Profile