import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdArrowBack, MdPrint, MdDelete } from "react-icons/md"
import { toast } from "react-toastify"
import "./BillDetail.scss"
import { deleteBill, getBillById, updateBill } from "../../../../service/billService"

const BillDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [bill, setBill] = useState(null)
	const [loading, setLoading] = useState(true)

  	useEffect(() => {
    	const fetchBillDetail = async () => {
			setLoading(true)
			try {
				const response = await getBillById(id)
				if (response && response.status === 1) {
					setBill(response.data)
					console.log("Bills",response.data);
					
				} else {
					toast.error("Không thể tải thông tin đơn hàng")
				}
			} catch (error) {
				toast.error("Đã xảy ra lỗi khi tải thông tin đơn hàng")
			} finally {
				setLoading(false)
			}
    	}
		fetchBillDetail()
	}, [id])

	const handleUpdateBill = async (state) => {
		try {
		const response = await updateBill(id, state)
		if (response && response.status === 1) {
			toast.success("Cập nhật trạng thái thành công")
			// Cập nhật lại thông tin đơn hàng sau khi cập nhật trạng thái
			setBill({ ...bill, state })
		} else {
			toast.error(response.message || "Cập nhật trạng thái thất bại")
		}
		} catch (error) {
			toast.error("Đã xảy ra lỗi khi cập nhật trạng thái")
		}
  	}

  	const handleDeleteBill = async () => {
    	if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
			try {
				const response = await deleteBill(id)
				if (response && response.status === 1) {
					toast.success(response.message)
					navigate("/admin/bills")
				} else {
					toast.error(response.message || "Xóa đơn hàng thất bại")
				}
			} catch (error) {
				toast.error("Đã xảy ra lỗi khi xóa đơn hàng")
			}
		}
  	}

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

  if (loading) {
    return <div className="bill-detail__loading">Đang tải thông tin đơn hàng...</div>
  }

  if (!bill) {
    return <div className="bill-detail__error">Không tìm thấy thông tin đơn hàng</div>
  }

  return (
    <div className="bill-detail">
      <div className="bill-detail__header">
        <div className="bill-detail__back">
          <button className="back-button" onClick={() => navigate("/admin/bills")}>
            <MdArrowBack />
            <span>Quay lại</span>
          </button>
          <div>
            <h1 className="bill-detail__title">Đơn hàng #{bill.id}</h1>
            <p className="bill-detail__subtitle">Ngày đặt: {new Date(bill.createdAt).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>
        <div className="bill-detail__actions">
          <button className="action-button print-button">
            <MdPrint />
            <span>In hóa đơn</span>
          </button>
          <button className="action-button delete-button" onClick={handleDeleteBill}>
            <MdDelete />
            <span>Xóa đơn hàng</span>
          </button>
        </div>
      </div>

      <div className="bill-detail__content">
        <div className="bill-detail__cards">
          <div className="bill-detail__card">
            <div className="card__header">
              <h2>Thông tin đơn hàng</h2>
              <p>Chi tiết về đơn hàng và trạng thái</p>
            </div>
            <div className="card__content">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Trạng thái đơn hàng</span>
                  <span className={getStatusBadgeClass(bill.state)}>{getStatusLabel(bill.state)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phương thức thanh toán</span>
                  <span>{bill.PaymentMethod?.name || "N/A"}</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="status-update">
                <span className="info-label">Cập nhật trạng thái</span>
                <div className="status-buttons">
                  {bill.state !== "approved" && (
                    <button className="status-button approved" onClick={() => handleUpdateBill("approved")}>
                      Xác nhận đơn hàng
                    </button>
                  )}
                  {bill.state === "approved" && (
                    <button className="status-button shipping" onClick={() => handleUpdateBill("shipping")}>
                      Chuyển sang đang giao
                    </button>
                  )}
                  {bill.state === "shipping" && (
                    <button className="status-button delivered" onClick={() => handleUpdateBill("delivered")}>
                      Xác nhận đã giao
                    </button>
                  )}
                  {bill.state !== "cancelled" && bill.state !== "delivered" && (
                    <button className="status-button cancelled" onClick={() => handleUpdateBill("cancelled")}>
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bill-detail__card">
            <div className="card__header">
              <h2>Thông tin khách hàng</h2>
              <p>Chi tiết về người đặt hàng</p>
            </div>
            <div className="card__content">
              <div className="info-item">
                <span className="info-label">Tên khách hàng</span>
                <span className="info-value">{bill.User.name}</span>
              </div>
              <div className="divider"></div>
              <div className="info-item">
                <span className="info-label">Thông tin liên hệ</span>
                <div className="contact-info">
                  <div>{bill.User.email}</div>
                  <div>{bill.deliveryPhone}</div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="info-item">
                <span className="info-label">Địa chỉ giao hàng</span>
                <span className="info-value">{bill.deliveryAddress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bill-detail__products">
          <div className="card__header">
            <h2>Sản phẩm</h2>
          </div>
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sách</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {bill.Books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{formatCurrency(book.sale)}</td>
                    <td>{book.Bill_Book.quantity}</td>
                    <td>{formatCurrency(book.sale * book.Bill_Book.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4" className="text-right">
                    Tạm tính
                  </th>
                  <td>{formatCurrency(bill.totalCost)}</td>
                </tr>
                <tr>
                  <th colSpan="4" className="text-right">
                    Phí vận chuyển
                  </th>
                  <td>{formatCurrency(0)}</td>
                </tr>
                <tr className="total-row">
                  <th colSpan="4" className="text-right">
                    Tổng cộng
                  </th>
                  <td>{formatCurrency(bill.totalCost)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetail

