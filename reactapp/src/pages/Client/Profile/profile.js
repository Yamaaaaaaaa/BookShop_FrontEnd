/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom"
import "./profile.scss"
import { LuShoppingCart } from "react-icons/lu";
import { FaBell, FaLock, FaQuestion, FaRegHeart, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlinePageview } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { deleteOwnBill } from "../../../service/billService";
import { getAllBillForUser } from "../../../service/userService";

import { toast } from "react-toastify";
import BillDetailsModal from "./BillDetailModal";
  

const Profile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [billData, setBillData] = useState([])
    const [selectedBill, setSelectedBill] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const fetchAllBillForUser = async () => {
        const responseGetBill = await getAllBillForUser(userProfile.id)
        console.log(responseGetBill);
        
        if(responseGetBill){
            if(responseGetBill.status === 1 && responseGetBill.data){
                setBillData(responseGetBill.data)
                toast.success(responseGetBill.message)
                return 
            }
        }
        toast.error("Failed to get Bill")
    }

    const handleDeleteOwnBill = async (userId, billId) => {
        const responseDeleteOwnBill = await deleteOwnBill(userId, billId)
        if(responseDeleteOwnBill){
            if(responseDeleteOwnBill.status === 1){
                toast.success(responseDeleteOwnBill.message)
                fetchAllBillForUser()
                return 
            }
            else{
                toast.error(responseDeleteOwnBill.message)
                return 
            }
        }
        toast.error("Failed to Delete Bill")
    }

    const handleViewDetails = (bill) => {
        setSelectedBill(bill)
        setShowModal(true)
    }
    

    useEffect(() => {
        setUserProfile(JSON.parse(sessionStorage.getItem("user")))
        fetchAllBillForUser()
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
					<div>
						<button className="profile_updateprofile">Update Profile</button>
					</div>
                </section>
                <section className="section bills-section">
                    <h2 className="section-title">MY BILLS</h2>
                    <div className="bills-table-container">
                        <table className="bills-table">
                            <thead>
                                <tr>
                                <th>Bill ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total Cost</th>
                                <th>Payment Method</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billData.map((bill) => (
                                    <tr key={bill.id}>
                                        <td>#{bill.id}</td>
                                        <td>{new Date(bill.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge`}>{bill.state}</span>
                                        </td>
                                        <td className="bill-amount">${bill.totalCost.toFixed(2)}</td>
                                        <td>{bill.PaymentMethod.name}</td>
                                        <td className="actions-cell">
                                            <button className="action-btn view-btn"  onClick={() => handleViewDetails(bill)}>
                                                <MdOutlinePageview />
                                            </button>
                                            <button className="action-btn delete-btn" onClick={() => handleDeleteOwnBill(userProfile.id, bill.id)}>
                                                <TiDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            {showModal && selectedBill && (
				<BillDetailsModal
					bill={selectedBill}
					onClose={() => {
						setShowModal(false)
						setSelectedBill(null)
					}}
				/>
            )}
        </div>
    )
}

export default Profile