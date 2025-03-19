import { toast } from "react-toastify"
import { deletePayment } from "../../../service/paymentService"

const DeletePaymentMethodModal = ({ paymentMethod, onClose, onConfirm, fetchPaymentMethods }) => {
  const handleDelete = async (e) => {
    e.preventDefault()
    const response = await deletePayment(paymentMethod.id)
    if (response) {
      if (response.status === 1) {
        toast.success(response.message)
        fetchPaymentMethods()
        onClose()
        return
      }
    }
    toast.error(response.message)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <i className="fas fa-trash"></i>
          </div>
          <h2>Delete Confirmation</h2>
        </div>
        <div className="modal-body">
          <div className="delete-confirmation">
            <p>Are you certain you wish to proceed with the deletion of payment method "{paymentMethod.name}"?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={(e) => handleDelete(e)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePaymentMethodModal

