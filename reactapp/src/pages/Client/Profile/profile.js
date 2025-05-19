import { Link, useNavigate, Navigate } from "react-router-dom"
import "./profile.scss"
import { LuShoppingCart } from "react-icons/lu"
import { FaBell, FaLock, FaMoneyBillWave, FaQuestion, FaRegHeart, FaUser } from "react-icons/fa"
import { FaShop } from "react-icons/fa6"
import { IoIosExit } from "react-icons/io"
import { useEffect, useState } from "react"
import { MdOutlinePageview } from "react-icons/md"
import { TiDelete } from "react-icons/ti"
import { deleteOwnBill, updateBill } from "../../../service/billService"
import { getAllBillForUser } from "../../../service/userService"
import { useAuth } from "../../../context/AuthContext"

import { toast } from "react-toastify"
import BillDetailsModal from "./BillDetailModal"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import PaymentModal from "./PaymentModal"

const Profile = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [billData, setBillData] = useState([])
    const [selectedBill, setSelectedBill] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [filterState, setFilterState] = useState("all")
    const [sortOrder, setSortOrder] = useState("desc") // desc = newest first
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [billToDelete, setBillToDelete] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const handlePaymentClick = (bill) => {
      if (
        bill.PaymentMethod.name.toLowerCase().includes("cash") ||
        bill.PaymentMethod.name.toLowerCase().includes("cod") ||
        bill.PaymentMethod.name.toLowerCase().includes("delivery")
      ) {
        toast.info("This order is cash on delivery. No payment needed.")
        return
      }
      setSelectedPaymentMethod({
        name: bill.PaymentMethod.name,
        description: bill.PaymentMethod.description || "Please scan the QR code to complete payment",
        qrUrl: bill.PaymentMethod.qrUrl,
      })
      setShowPaymentModal(true)
    }
    
    const fetchAllBillForUser = async () => {
        if (!user) return;
        const responseGetBill = await getAllBillForUser(user.id)
        if (responseGetBill) {
            if (responseGetBill.status === 1 && responseGetBill.data) {
                setBillData(responseGetBill.data)
                toast.success(responseGetBill.message)
                return
            }
        }
        toast.error("Failed to get Bill")
    }

    const handleDeleteOwnBill = async (userId, billId) => {
        const responseDeleteOwnBill = await updateBill(billId, "cancelled")
        if (responseDeleteOwnBill) {
            if (responseDeleteOwnBill.status === 1) {
                toast.success(responseDeleteOwnBill.message)
                fetchAllBillForUser()
                return
            } else {
                toast.error(responseDeleteOwnBill.message)
                return
            }
        }
        toast.error("Failed to Cancel Bill")
    }

  const handleDeleteClick = (userId, billId, bill) => {
    if(bill.state === "pending"){
        setBillToDelete({ userId, billId })
        setShowConfirmModal(true)
    }
    else{
        toast.error("This Bill can not Cancel")
    }
  }

  const confirmDelete = () => {
    if (billToDelete) {
      handleDeleteOwnBill(billToDelete.userId, billToDelete.billId)
    }
  }

  const handleViewDetails = (bill) => {
    setSelectedBill(bill)
    setShowModal(true)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge status-badge__pending"
      case "approved":
        return "status-badge status-badge__approved"
      case "shipping":
        return "status-badge status-badge__shipping"
      case "delivered":
        return "status-badge status-badge__delivered"
      case "cancelled":
        return "status-badge status-badge__cancelled"
      default:
        return "status-badge"
    }
  }

  useEffect(() => {
    fetchAllBillForUser()
  }, [user])

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getFilteredAndSortedBills = () => {
    let filteredBills = [...billData]
    if (filterState !== "all") {
      filteredBills = filteredBills.filter((bill) => bill.state === filterState)
    }
    filteredBills.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })
    return filteredBills
  }

  return (
    <div className="profile-main">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-image">
            <img src="https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg" alt="Profile Picture" />
          </div>
          <h2 className="profile-name">{user?.name || ""}</h2>
          <p className="profile-title">Customer</p>
        </div>
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/profile" className="nav-link active">
                <i>
                  <FaUser />
                </i>{" "}
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <i>
                  <LuShoppingCart />
                </i>{" "}
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i>
                  <FaRegHeart />
                </i>{" "}
                Wishlist
              </a>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">
                <i>
                  <FaShop />
                </i>
                My Shop
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i>
                  <FaBell />
                </i>{" "}
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i>
                  <FaQuestion />
                </i>{" "}
                Help Desk
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i>
                  <FaLock />
                </i>{" "}
                Privacy Policy
              </a>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link button-logout">
                <i>
                  <IoIosExit />
                </i>{" "}
                Log Out
              </button>
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
              <input type="text" className="form-control" value={user?.name || ""} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input type="text" className="form-control" value={user?.email || ""} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Address:</label>
              <input type="text" className="form-control" value={user?.address || ""} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number:</label>
              <input type="text" className="form-control" value={user?.phone || ""} readOnly />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description:</label>
              <textarea className="form-control" readOnly></textarea>
            </div>
          </div>
          <div>
            <button className="profile_updateprofile">Update Profile</button>
          </div>
        </section>
        <section className="section bills-section">
          <div className="bills-header">
            <h2 className="section-title">MY BILLS</h2>
            <div className="bills-controls">
              <div className="filter-control">
                <label>Filter by: </label>
                <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="filter-select">
                  <option value="all">All States</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="sort-control">
                <label>Sort by: </label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
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
                {getFilteredAndSortedBills().map((bill) => (
                  <tr key={bill.id}>
                    <td>#{bill.id}</td>
                    <td>{new Date(bill.date).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadgeClass(bill.state)}>{bill.state}</span>
                    </td>
                    <td className="bill-amount">${bill.totalCost.toFixed(2)}</td>
                    <td>{bill.PaymentMethod.name}</td>
                    <td className="actions-cell">
                      <button className="action-btn view-btn" onClick={() => handleViewDetails(bill)}>
                        <MdOutlinePageview />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteClick(user.id, bill.id, bill)}
                      >
                        <TiDelete />
                      </button>
                      <button className="action-btn payment-btn" onClick={() => handlePaymentClick(bill)}>
                        <FaMoneyBillWave />
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
      {showConfirmModal && billToDelete && (
        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmDelete}
          billId={billToDelete.billId}
        />
      )}
      {showPaymentModal && selectedPaymentMethod && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentMethod={selectedPaymentMethod}
        />
      )}
    </div>
  )
}

export default Profile

