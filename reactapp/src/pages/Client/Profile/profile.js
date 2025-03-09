import { Link, useNavigate } from "react-router-dom"
import "./profile.scss"
import { LuShoppingCart } from "react-icons/lu";
import { FaBell, FaLock, FaQuestion, FaRegHeart, FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlinePageview } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { getAllBillForUser } from "../../../service/userService";
import { toast } from "react-toastify";

// Mock data for bills
const mockBills = [
    {
      id: 1,
      date: "2024-03-09T10:30:00",
      status: "Completed",
      totalCost: 45.97,
      subtotal: 39.97,
      shipping: 6.00,
      paymentMethod: "Credit Card",
      items: [
        {
            id: 1,
            book: {
                name: "The Great Gatsby",
                imageUrl: "/gatsby.jpg",
            },
            price: 12.99,
            quantity: 2
        },
        {
            id: 2,
            book: {
                name: "1984",
                imageUrl: "/1984.jpg",
            },
            price: 13.99,
            quantity: 1
        }
      ]
    },
    {
      id: 2,
      date: "2024-03-08T15:45:00",
      status: "Pending",
      totalCost: 33.98,
      subtotal: 27.98,
      shipping: 6.00,
      paymentMethod: "PayPal",
      items: [
        {
          id: 3,
          book: {
            name: "To Kill a Mockingbird",
            imageUrl: "/mockingbird.jpg",
          },
          price: 13.99,
          quantity: 2
        }
      ]
    },
    {
      id: 3,
      date: "2024-03-07T09:15:00",
      status: "Cancelled",
      totalCost: 26.99,
      subtotal: 20.99,
      shipping: 6.00,
      paymentMethod: "Cash on Delivery",
      items: [
        {
          id: 4,
          book: {
            name: "Pride and Prejudice",
            imageUrl: "/pride.jpg",
          },
          price: 10.99,
          quantity: 1
        },
        {
          id: 5,
          book: {
            name: "The Catcher in the Rye",
            imageUrl: "/catcher.jpg",
          },
          price: 9.99,
          quantity: 1
        }
      ]
    },
    {
      id: 4,
      date: "2024-03-05T14:20:00",
      status: "Completed",
      totalCost: 52.97,
      subtotal: 46.97,
      shipping: 6.00,
      paymentMethod: "Credit Card",
      items: [
        {
          id: 6,
          book: {
            name: "The Hobbit",
            imageUrl: "/hobbit.jpg",
          },
          price: 15.99,
          quantity: 1
        },
        {
          id: 7,
          book: {
            name: "Harry Potter and the Sorcerer's Stone",
            imageUrl: "/harry.jpg",
          },
          price: 14.99,
          quantity: 1
        },
        {
          id: 8,
          book: {
            name: "The Lord of the Rings",
            imageUrl: "/lotr.jpg",
          },
          price: 15.99,
          quantity: 1
        }
      ]
    },
    {
      id: 5,
      date: "2024-03-01T09:10:00",
      status: "Completed",
      totalCost: 29.98,
      subtotal: 23.98,
      shipping: 6.00,
      paymentMethod: "Bank Transfer",
      items: [
        {
          id: 9,
          book: {
            name: "The Alchemist",
            imageUrl: "/alchemist.jpg",
          },
          price: 11.99,
          quantity: 2
        }
      ]
    },
    {
      id: 6,
      date: "2024-02-28T16:35:00",
      status: "Pending",
      totalCost: 41.97,
      subtotal: 35.97,
      shipping: 6.00,
      paymentMethod: "PayPal",
      items: [
        {
          id: 10,
          book: {
            name: "Brave New World",
            imageUrl: "/brave.jpg",
          },
          price: 11.99,
          quantity: 1
        },
        {
          id: 11,
          book: {
            name: "The Odyssey",
            imageUrl: "/odyssey.jpg",
          },
          price: 12.99,
          quantity: 1
        },
        {
          id: 12,
          book: {
            name: "Crime and Punishment",
            imageUrl: "/crime.jpg",
          },
          price: 10.99,
          quantity: 1
        }
      ]
    },
    {
      id: 7,
      date: "2024-02-25T11:20:00",
      status: "Cancelled",
      totalCost: 18.99,
      subtotal: 12.99,
      shipping: 6.00,
      paymentMethod: "Credit Card",
      items: [
        {
          id: 13,
          book: {
            name: "The Shining",
            imageUrl: "/shining.jpg",
          },
          price: 12.99,
          quantity: 1
        }
      ]
    }
  ];
  
  

const Profile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [billData, setBillData] = useState([])

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
                                            <button className="action-btn view-btn">
                                                <MdOutlinePageview />
                                            </button>
                                            <button className="action-btn delete-btn">
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
        </div>
    )
}

export default Profile