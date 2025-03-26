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
					toast.error("Failed to load Bill's Information")
				}
			} catch (error) {
				toast.error("Failed to load Bill's Information")
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
			toast.success("Update Status Successful")
			// Cập nhật lại thông tin đơn hàng sau khi cập nhật trạng thái
			setBill({ ...bill, state })
		} else {
			toast.error(response.message || "Failed to Update Status")
		}
		} catch (error) {
			toast.error("Failed to Update Status")
		}
  	}

  	const handleDeleteBill = async () => {
    	if (window.confirm("Are you sure to delete this Bill?")) {
			try {
				const response = await deleteBill(id)
				if (response && response.status === 1) {
					toast.success(response.message)
					navigate("/admin/bills")
				} else {
					toast.error(response.message || "Failed to Delete Status")
				}
			} catch (error) {
				toast.error("Failed to Delete Status")
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

  if (loading) {
    return <div className="bill-detail__loading">Loading Bill's Infomation...</div>
  }

  if (!bill) {
    return <div className="bill-detail__error">Failed to load Bill's Information</div>
  }

  return (
    <div className="bill-detail">
      <div className="bill-detail__header">
        <div className="bill-detail__back">
          <button className="back-button" onClick={() => navigate("/admin/bills")}>
            <MdArrowBack />
            <span>Back</span>
          </button>
          <div>
            <h1 className="bill-detail__title">Bill #{bill.id}</h1>
            <p className="bill-detail__subtitle">Created At: {new Date(bill.createdAt).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>
        <div className="bill-detail__actions">
          <button className="action-button delete-button" onClick={handleDeleteBill}>
            <MdDelete />
            <span>Delete Bill</span>
          </button>
        </div>
      </div>

      <div className="bill-detail__content">
        <div className="bill-detail__cards">
          <div className="bill-detail__card">
            <div className="card__header">
              <h2>Bill's Infomation</h2>
              <p>Bill Detail and Status</p>
            </div>
            <div className="card__content">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className={getStatusBadgeClass(bill.state)}>{getStatusLabel(bill.state)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Payment Method</span>
                  <span>{bill.PaymentMethod?.name || "N/A"}</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="status-update">
                <span className="info-label">Update Status</span>
                <div className="status-buttons">
                  {bill.state === "pending" && (
                    <button className="status-button approved" onClick={() => handleUpdateBill("approved")}>
                      Confirm
                    </button>
                  )}
                  {bill.state === "approved" && (
                    <button className="status-button shipping" onClick={() => handleUpdateBill("shipping")}>
                      Change to Shipping
                    </button>
                  )}
                  {bill.state === "shipping" && (
                    <button className="status-button delivered" onClick={() => handleUpdateBill("delivered")}>
                      Comfirm Delivered
                    </button>
                  )}
                  {bill.state !== "cancelled" && bill.state !== "delivered" && (
                    <button className="status-button cancelled" onClick={() => handleUpdateBill("cancelled")}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bill-detail__card">
            <div className="card__header">
              <h2>Customer Infomation</h2>
              <p>Customer Detail</p>
            </div>
            <div className="card__content">
              <div className="info-item">
                <span className="info-label">Customer Name</span>
                <span className="info-value">{bill.User.name}</span>
              </div>
              <div className="divider"></div>
              <div className="info-item">
                <span className="info-label">Customer Info</span>
                <div className="contact-info">
                  <div>{bill.User.email}</div>
                  <div>{bill.deliveryPhone}</div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="info-item">
                <span className="info-label">Delivery Address</span>
                <span className="info-value">{bill.deliveryAddress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bill-detail__products">
          <div className="card__header">
            <h2>Books: </h2>
          </div>
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
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
                    Price
                  </th>
                  <td>{formatCurrency(bill.totalCost)}</td>
                </tr>
                <tr>
                  <th colSpan="4" className="text-right">
                    Payment Cost
                  </th>
                  <td>{formatCurrency(0)}</td>
                </tr>
                <tr className="total-row">
                  <th colSpan="4" className="text-right">
                    Total
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

