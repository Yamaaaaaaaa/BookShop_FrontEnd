"use client"

import { useState, useEffect } from "react"
import "../ModalStyle/Modal.scss"
import { toast } from "react-toastify"
import { createPayment, updatePayment } from "../../../service/paymentService"

const PaymentMethodFormModal = ({ paymentMethod, onClose, onSubmit, mode = "add", fetchPaymentMethods }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [qrUrl, setQrUrl] = useState("")

  useEffect(() => {
    if (mode === "edit" && paymentMethod) {
      setName(paymentMethod.name)
      setDescription(paymentMethod.description || "")
      setQrUrl(paymentMethod.qrUrl || "")
    }
  }, [paymentMethod, mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === "edit") {
      const response = await updatePayment({
        id: paymentMethod.id,
        name: name,
        description: description,
        qrUrl: qrUrl,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchPaymentMethods()
          onClose()
          return
        }
      }
      toast.error(response.message)
    } else {
      const response = await createPayment({
        name: name,
        description: description,
        qrUrl: qrUrl,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchPaymentMethods()
          onClose()
          return
        }
      }
      toast.error(response.message)
    }
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-payment-method">
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fas fa-${mode === "add" ? "credit-card" : "edit"}`}></i>
          </div>
          <h2>{mode === "add" ? "Add Payment Method" : "Edit Payment Method"}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter payment method name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter payment method description"
                rows={3}
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label>QR Code URL</label>
              <input
                type="text"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                placeholder="Enter QR code URL"
              />
              {qrUrl && (
                <div className="qr-preview">
                  <p>Preview:</p>
                  <img
                    src={qrUrl || "/placeholder.svg"}
                    alt="QR Code Preview"
                    className="qr-preview-image"
                    onError={(e) => {
                      // Set a flag to prevent infinite loop
                      if (!e.target.hasAttribute("data-error-handled")) {
                        e.target.setAttribute("data-error-handled", "true")
                        e.target.src = "/placeholder.svg?height=100&width=100"
                      }
                      // Hide the image if even the placeholder fails
                      e.target.onerror = () => {
                        e.target.style.display = "none"
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentMethodFormModal

