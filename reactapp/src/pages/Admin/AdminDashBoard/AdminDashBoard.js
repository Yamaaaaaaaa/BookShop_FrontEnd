"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Users, BookOpen, Receipt, User, Building, ExternalLink } from "lucide-react"
import "./AdminDashBoard.scss"
import { toast } from "react-toastify"
import { getAllBill } from "../../../service/billService"
import { getAllUser } from "../../../service/userService"
import { getBooks, getMostBookData } from "../../../service/bookService"

const AdminDashboard = () => {
    const statusColors = {
        pending: "#f39c12", // Orange
        approved: "#2ecc71", // Green
        shipping: "#3498db", // Blue
        delivered: "#27ae60", // Dark Green
        cancelled: "#e74c3c", // Red
    }

    const [loading, setLoading] = useState(true)
    const [bills, setBills] = useState([])
    const [pendingBills, setPendingBills] = useState([])
    const [users, setUsers] = useState([])
    const [books, setBookData] = useState([])
    const fetchAllBill = async () => {
        try {
            const response = await getAllBill()
            if (response) {
                if (response.status === 1) {
                    toast.success(response.message)
                    setBills(response.data)
                    setPendingBills(response.data.filter(item => item.state === "pending"))
                    console.log("Bills data:", response.data) // Debug log
                } else {
                    toast.error(response.message)
                }
            } else {
                toast.error("Failed to fetch bills")
            }
        } catch (error) {
            console.error("Error fetching bills:", error)
            toast.error("An error occurred while fetching bills")
        } finally {
            setLoading(false)
        }
    }
    const fetchAllUser = async () => {
        try {
            const dataUsers = await getAllUser()
            if (dataUsers?.data) {
                setUsers(dataUsers.data);
                console.log("All User: ", dataUsers.data);
                
                toast.success(dataUsers.message)
                return
            }
            else toast.error(dataUsers.message)
        } catch (error) {
            toast.error("Error fetching All User:", error);
        } 
    }
    const fetchInitialBook = async () => {
        try {
            const rcmBook = await getMostBookData()
            if (rcmBook) {
                setBookData(rcmBook)
                console.log("BookData",rcmBook)
                return
                // filteredBooks()
            }
        } catch (error) {
            toast.error("Error to fetch Books")
        }
    }
    const getStatusCounts = () => {
        const counts = {
            pending: 0,
            approved: 0,
            shipping: 0,
            delivered: 0,
            cancelled: 0,
        }

        bills.forEach((bill) => {
        // Check both status and state properties to be safe
        const billStatus = bill.status || bill.state
        if (billStatus && counts.hasOwnProperty(billStatus)) {
            counts[billStatus]++
        }
    })

    // Debug log
    console.log("Status counts:", counts)

    return Object.keys(counts)
        .map((status) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: counts[status],
            color: statusColors[status],
        }))
        .filter((item) => item.value > 0)
    }

    // Get pie chart data
    const pieData = getStatusCounts()

    useEffect(() => {
        fetchAllBill()
        fetchAllUser()
        fetchInitialBook()
    }, [])

    // Add default data if no real data is available
    const finalPieData =
        pieData.length > 0
        ? pieData
        : [
            { name: "Pending", value: 25, color: "#f39c12" },
            { name: "Approved", value: 20, color: "#2ecc71" },
            { name: "Shipping", value: 15, color: "#3498db" },
            { name: "Delivered", value: 30, color: "#27ae60" },
            { name: "Cancelled", value: 10, color: "#e74c3c" },
        ]

    return (
    <div className="admin-dashboard">
        <div className="dashboard-container">
            <div className="chart-section">
                {loading ? (
                    <div className="loading">Loading chart data...</div>
                ) : (
                <>
                    <ResponsiveContainer width="100%" height={500}>
                        <PieChart>
                            <Pie
                                data={finalPieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={200}
                                fill="#8884d8"
                                dataKey="value"
                                label={false}
                                strokeWidth={2}
                                stroke="#fff"
                            >
                                {finalPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} Bills`, "Count"]} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="chart-legend">
                        {finalPieData.map((entry, index) => (
                        <div key={`legend-${index}`} className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
                            <span>
                                {entry.name}: {entry.value}
                            </span>
                        </div>
                        ))}
                    </div>
                    </>
                )}
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">
                        <Users size={24} />
                    </div>
                    <div className="stat-content">
                        <h2>{users.length}</h2>
                        <p>Total User Base</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <BookOpen size={24} />
                    </div>
                    <div className="stat-content">
                        <h2>{books.length}</h2>
                        <p>Total Book Count</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <Receipt size={24} />
                    </div>
                    <div className="stat-content">
                        <h2>{bills.length}</h2>
                        <p>Bills Count</p>
                    </div>
                </div>
            </div>

            <div className="details-section">
                <div className="admins-section">
                    <h2>BookLand Users</h2>
                    <div className="admin-list">
                        {users.map((admin) => (
                            <div key={admin.id} className="admin-card">
                                <div className="admin-info">
                                    <div className="admin-avatar">
                                        <User size={24} />
                                    </div>
                                    <div className="admin-details">
                                        <p>{admin ? admin.name : ""}</p>
                                        <span>Role: {admin && admin.Group ? admin.Group.name : ""}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="side-sections">
                    <div className="bills-section">
                        <h2>Bills Pending</h2>
                        <div className="bills-list">
                            {pendingBills.map((bill) => (
                            <div key={bill.id} className="bill-card">
                                <div className="bill-info">
                                <div className="bill-avatar">
                                    <User size={18} />
                                </div>
                                <div className="bill-details">
                                    <p>Bill ID: {bill.id}</p>
                                    <span>Price: {bill.totalCost}</span>
                                </div>
                                </div>
                                <a href={`/admin/bills/${bill.id}`} className="edit-link">
                                <ExternalLink size={16} />
                                </a>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="branch-section">
                        <h2>Most Popular Books: </h2>
                        <div className="branch-list">
                            {books.map((book) => (
                                <div key={book.id} className="branch-card">
                                    <div className="branch-info">
                                        <div className="branch-avatar">
                                            <Building size={18} />
                                        </div>
                                        <div className="branch-details">
                                            <p>{book.Book.name}</p>
                                            <span>Sold Amount: {book.totalQuantity}</span>
                                        </div>
                                    </div>
                                    <a href={`/book/${book.id}`} className="edit-link">
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard

