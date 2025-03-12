import { toast } from "react-toastify"
import { updateBill } from "../../../service/billService"
import "./BillDetailModal.scss"
import { useNavigate } from "react-router-dom"
const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value)
}
const BillDetailModal = ({ bill, onClose, handleDeleteBill, fetchAllBill}) => {
  const navigate = useNavigate()
  const totalBooks = bill.Books.length
  const handleUpdateBill = async (billId, state) => {
    const response = await updateBill(billId, state)
    if(response) {
      if(response.status === 1){
        toast.success(response.message)
        console.log(response.data);
        onClose()
        fetchAllBill()
        return
      }
    }
    toast.error(response.message)
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="bill-detail-header">
          <div className="bill-id">
            <h2>ID</h2>
            <span>{bill.id}</span>
          </div>

          <div className="bill-summary">
            <div className="summary-item">
              <span>Total Books:</span>
              <span>{String(totalBooks).padStart(2, "0")} Books</span>
            </div>
            <div className="summary-item">
              <span>Total Costs:</span>
              <span>{formatCurrency(bill.totalCost)}</span>
            </div>
          </div>
        </div>

        <div className="bill-detail-body">
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>On Stock</th>
              </tr>
            </thead>
            <tbody>
              {bill.Books.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.Bill_Book.quantity}</td>
                  <td>{item.sale * item.Bill_Book.quantity}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bill-detail-footer">
          {
            bill.state !== "approved" ? 
              <button className="close-btn bill-detail-footer__approve" onClick={() => {
                    handleUpdateBill(bill.id, "approved")
                  }
                }>
                APPROVE
              </button>
            : <></>
          }
          <button className="close-btn bill-detail-footer__delete" onClick={() => {
                handleDeleteBill(bill.id)
                onClose()
              }
            }>
            DELETE
          </button>
          <button className="close-btn bill-detail-footer__close" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default BillDetailModal

