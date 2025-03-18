import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdDelete, MdVisibility, MdFilterList, MdSearch } from "react-icons/md"
import { toast } from "react-toastify"
import { deleteBill, getAllBill } from "../../../service/billService"
import "./BillManagement.scss"

const BillsManagement = () => {
    const [dataBill, setDataBill] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentFilter, setPaymentFilter] = useState("all")
    const navigate = useNavigate()

    const filteredBills = dataBill.filter((bill) => {
        const matchesSearch =
            bill.User.name.toLowerCase().includes(searchTerm.toLowerCase()) || bill.id.toString().includes(searchTerm)
        const matchesStatus = statusFilter === "all" || bill.state === statusFilter
        const matchesPayment = paymentFilter === "all" || (bill.PaymentMethod && bill.PaymentMethod.name === paymentFilter)
        return matchesSearch && matchesStatus && matchesPayment
    })

    const handleViewBill = (billId) => {
        navigate(`/admin/bills/${billId}`)
    }

    const fetchAllBill = async () => {
        const response = await getAllBill()
        if (response) {
            if (response.status === 1) {
                toast.success(response.message)
                setDataBill(response.data)
                return
            }
        }
        toast.error(response.message)
    }

    const handleDeleteBill = async (billId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
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

    // Lấy danh sách các phương thức thanh toán duy nhất
    const paymentMethods = [
        { value: "all", label: "Tất cả phương thức" },
        ...Array.from(new Set(dataBill.filter((bill) => bill.PaymentMethod).map((bill) => bill.PaymentMethod.name))).map(
            (method) => ({ value: method, label: method }),
        ),
    ]

    useEffect(() => {
        fetchAllBill()
    }, [])

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
                return "Chờ xử lý"
            case "approved":
                return "Đã xác nhận"
            case "shipping":
                return "Đang giao"
            case "delivered":
                return "Đã giao"
            case "cancelled":
                return "Đã hủy"
            default:
                return status
        }
    }

    return (
    <div className="bills-management">
        <div className="bills-management__header">
            <h1>Quản lý đơn hàng</h1>
            <p className="bills-management__description">
                Quản lý và theo dõi tất cả đơn hàng trong hệ thống bán sách của bạn.
            </p>
        </div>

        <div className="bills-management__filters">
            <div className="bills-management__search">
                <MdSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo ID hoặc tên khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bills-management__filter-group">
                <div className="bills-management__filter">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="approved">Đã xác nhận</option>
                        <option value="shipping">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>

                <div className="bills-management__filter">
                    <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                    {paymentMethods.map((method) => (
                        <option key={method.value} value={method.value}>
                        {method.label}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="bills-management__table-container">
            <table className="bills-management__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Phương thức thanh toán</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
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
                        Không tìm thấy đơn hàng nào.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="bills-management__pagination">
            <div className="bills-management__pagination-info">
                Hiển thị {filteredBills.length} trong tổng số {dataBill.length} đơn hàng
            </div>
            <div className="bills-management__pagination-controls">
                <button className="pagination-btn" disabled>
                    Trước
                </button>
                <button className="pagination-btn" disabled>
                    Sau
                </button>
            </div>
        </div>
    </div>
    )
}

export default BillsManagement

