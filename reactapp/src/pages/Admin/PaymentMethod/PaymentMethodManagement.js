import { useEffect, useState } from "react"
import PaymentMethodFormModal from "./PaymentMethodFormModal"
import DeletePaymentMethodModal from "./DeletePaymentMethodModal"
import "./PaymentMethodManagement.scss"
import { MdDelete, MdEdit, MdQrCode } from "react-icons/md"
import { toast } from "react-toastify"
import { getAllPaymentMethod } from "../../../service/paymentService"

const PaymentMethodManagement = () => {
  const [paymentMethodsData, setPaymentMethodsData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [formModal, setFormModal] = useState({ show: false, mode: "add", paymentMethod: null })
  const [deleteModal, setDeleteModal] = useState({ show: false, paymentMethod: null })
  const [qrModal, setQrModal] = useState({ show: false, paymentMethod: null })

  const handleAdd = (newPaymentMethod) => {}

  const handleEdit = (editedPaymentMethod) => {}

  const handleDelete = (id) => {}

  const filteredPaymentMethods = paymentMethodsData.filter(
    (paymentMethod) =>
      paymentMethod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paymentMethod.id.toString().includes(searchTerm),
  )

  const fetchPaymentMethods = async () => {
    try {
      const listPaymentMethods = await getAllPaymentMethod()
      if (listPaymentMethods && listPaymentMethods.status === 1) {
        setPaymentMethodsData(listPaymentMethods.data)
        console.log("All Payment Methods: ", listPaymentMethods.data)

        toast.success(listPaymentMethods.message)
        return
      } else toast.error(listPaymentMethods.message)
    } catch (error) {
      toast.error("Error fetching payment methods:", error)
    }
  }

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  return (
    <div className="payment-methods-management">
      <div className="payment-methods-management__header">
        <h1>Payment Method Management</h1>
        <div className="payment-methods-management__actions">
          <div className="payment-methods-management__search">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="payment-methods-management__add-btn"
            onClick={() => setFormModal({ show: true, mode: "add", paymentMethod: null })}
          >
            <i className="fas fa-plus"></i> Add Payment Method
          </button>
        </div>
      </div>

      <div className="payment-methods-management__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>QR Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPaymentMethods.map((paymentMethod) => (
              <tr key={paymentMethod.id}>
                <td>{paymentMethod.id}</td>
                <td>{paymentMethod.name}</td>
                <td>{paymentMethod.description}</td>
                <td>
                  {paymentMethod.qrUrl && (
                    <button className="action-btn view-qr" onClick={() => setQrModal({ show: true, paymentMethod })}>
                      <MdQrCode />
                    </button>
                  )}
                </td>
                <td className="action-cell">
                  <button
                    className="action-btn edit"
                    onClick={() =>
                      setFormModal({
                        show: true,
                        mode: "edit",
                        paymentMethod,
                      })
                    }
                  >
                    <MdEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => setDeleteModal({ show: true, paymentMethod })}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formModal.show && (
        <PaymentMethodFormModal
          mode={formModal.mode}
          paymentMethod={formModal.paymentMethod}
          onClose={() => setFormModal({ show: false, mode: "add", paymentMethod: null })}
          onSubmit={formModal.mode === "add" ? handleAdd : handleEdit}
          fetchPaymentMethods={fetchPaymentMethods}
        />
      )}

      {deleteModal.show && (
        <DeletePaymentMethodModal
          paymentMethod={deleteModal.paymentMethod}
          onClose={() => setDeleteModal({ show: false, paymentMethod: null })}
          onConfirm={() => handleDelete(deleteModal.paymentMethod.id)}
          fetchPaymentMethods={fetchPaymentMethods}
        />
      )}

      {qrModal.show && (
        <div className="modal-overlay">
          <div className="modal-content qr-modal">
            <div className="modal-header">
              <div className="modal-icon">
                <i className="fas fa-qrcode"></i>
              </div>
              <h2>QR Code for {qrModal.paymentMethod.name}</h2>
            </div>
            <div className="modal-body">
              <div className="qr-image-container">
                <img
                  src={qrModal.paymentMethod.qrUrl || "/placeholder.svg"}
                  alt={`QR Code for ${qrModal.paymentMethod.name}`}
                  className="qr-image"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setQrModal({ show: false, paymentMethod: null })}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethodManagement

