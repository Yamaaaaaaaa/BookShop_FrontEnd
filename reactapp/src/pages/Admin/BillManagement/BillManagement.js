import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdDelete, MdVisibility, MdFilterList, MdSearch } from "react-icons/md"
import { toast } from "react-toastify"
import { deleteBill, getAllBill } from "../../../service/billService"
import "./BillManagement.scss"
import Pagination from "../../../components/Pagination"
const BillsManagement = () => {
    const [dataBill, setDataBill] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("pending")
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [totalPages, setTotalPages] = useState(1)
    
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const filteredBills = dataBill.filter((bill) => {
        const matchesSearch =
            bill.User.name.toLowerCase().includes(searchTerm.toLowerCase()) || bill.id.toString().includes(searchTerm)
        return matchesSearch
    })

    const handleViewBill = (billId) => {
        navigate(`/admin/bills/${billId}`)
    }

    const fetchAllBill = async () => {
        const response = await getAllBill({page, pageSize: limit, state: statusFilter, sortOrder: "ASC"})
        if (response) {
            if (response.status === 1) {
                toast.success(response.message)
                setDataBill(response.data)
                setTotalPages(response.totalPages)
                return
            }
        }
        toast.error(response.message)
    }

    const handleDeleteBill = async (billId) => {
        if (window.confirm("Are you sure to delete this bill?")) {
            const response = await deleteBill(billId)
            if (response) {
                if (response.status === 1) {
                    toast.success(response.message)
                    fetchAllBill()
                    return
                }
            }
            toast.error(response.message)
        }
    }


    useEffect(() => {
        fetchAllBill()
    }, [page, statusFilter])

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value)
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "pending":
                return "status-badge status-badge--pending"
            case "approved":
                return "status-badge status-badge--approved"
            case "shipping":
                return "status-badge status-badge--shipping"
            case "delivered":
                return "status-badge status-badge--delivered"
            case "cancelled":
                return "status-badge status-badge--cancelled"
            default:
                return "status-badge"
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case "pending":
                return "Pending"
            case "approved":
                return "Approved"
            case "shipping":
                return "Shipping"
            case "delivered":
                return "Delivered"
            case "cancelled":
                return "Cancelled"
            default:
                return status
        }
    }

    return (
    <div className="bills-management">
        <div className="bills-management__header">
            <h1>Bills Management</h1>
        </div>

        <div className="bills-management__filters">
            <div className="bills-management__search">
                <MdSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by Name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bills-management__filter-group">
                <div className="bills-management__filter">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

            </div>
        </div>

        <div className="bills-management__table-container">
            <table className="bills-management__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Total Cost</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBills.length > 0 ? (
                    filteredBills.map((bill) => (
                        <tr key={bill.id}>
                            <td>{bill.id}</td>
                            <td>{bill.User.name}</td>
                            <td>{bill.deliveryPhone}</td>
                            <td className="address-cell">{bill.deliveryAddress}</td>
                            <td>{formatCurrency(bill.totalCost)}</td>
                            <td>{bill.PaymentMethod?.name || "N/A"}</td>
                            <td>
                                <span className={getStatusBadgeClass(bill.state)}>{getStatusLabel(bill.state)}</span>
                            </td>
                            <td className="bills-management__actions-cell">
                                <button className="action-btn view" title="Xem chi tiết" onClick={() => handleViewBill(bill.id)}>
                                    <MdVisibility />
                                </button>
                                <button
                                    className="action-btn delete"
                                    title="Xóa đơn hàng"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteBill(bill.id)
                                    }}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="8" className="no-results">
                            Bill not Founded
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    </div>
    )
}

export default BillsManagement

