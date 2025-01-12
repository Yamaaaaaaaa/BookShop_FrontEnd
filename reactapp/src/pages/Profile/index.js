import { Link, useNavigate } from "react-router-dom"
import "./style.css"

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
        <div class="profile-main">
            <aside class="sidebar">
                <div class="profile-section">
                    <div class="profile-image">
                        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jgjKb0hqsVkr7AgPQC1MHBJ1cW17Qx.png" alt="Profile Picture"/>
                    </div>
                    <h2 class="profile-name">David Matin</h2>
                    <p class="profile-title">Web developer</p>
                </div>
                <nav>
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <Link to="/profile" class="nav-link active"><i>👤</i> Profile</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/cart" class="nav-link"><i>🛒</i> My Cart</Link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><i>❤️</i> Wishlist</a>
                        </li>
                        <li class="nav-item">
                            {/* Chuyển Link sang My Shop */}
                            <Link to="/shop" class="nav-link"><i>🏪</i>My Shop</Link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><i>🔔</i> Services</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><i>❓</i> Help Desk</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link"><i>🔒</i> Privacy Policy</a>
                        </li>
                        <li class="nav-item">
                            <button onClick={handleLogout} class="nav-link button-logout"><i>↪️</i> Log Out</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main class="main-content">
                <section class="section">
                    <h2 class="section-title">BASIC INFORMATION</h2>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Your Name:</label>
                            <input type="text" class="form-control" value={mock_profiles.name}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Professional title:</label>
                            <input type="text" class="form-control" value={mock_profiles.job}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Languages:</label>
                            <input type="text" class="form-control" value={mock_profiles.language}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Age:</label>
                            <input type="text" class="form-control" value={mock_profiles.age}/>
                        </div>
                        <div class="form-group full-width">
                            <label class="form-label">Description:</label>
                            <textarea class="form-control">{mock_profiles.description}</textarea>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <h2 class="section-title">CONTACT INFORMATION</h2>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Contact Number:</label>
                            <input type="tel" class="form-control" value={mock_profiles.phonenumber}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email Address:</label>
                            <input type="email" class="form-control" value={mock_profiles.email}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Country:</label>
                            <input type="text" class="form-control" value={mock_profiles.country}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Postcode:</label>
                            <input type="text" class="form-control" value={mock_profiles.postcode}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">City:</label>
                            <input type="text" class="form-control" value={mock_profiles.city}/>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Full Address:</label>
                            <input type="text" class="form-control" value={mock_profiles.city}/>
                        </div>
                    </div>
                    <button class="save-button">Save Setting</button>
                </section>
            </main>
        </div>
    )
}

export default Profile