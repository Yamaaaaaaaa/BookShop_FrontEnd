import "./PaymentModal.scss"

const PaymentModal = ({ isOpen, onClose, paymentMethod }) => {
  if (!isOpen) return null

  return (
    <div className="payment__overlay">
      <div className="payment__modal">
        <div className="payment__header">
          <h3>Payment QR Code</h3>
          <button className="payment__close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="payment__content">
          <div className="payment__info">
            <h4>{paymentMethod.name}</h4>
            <p>{paymentMethod.description}</p>
          </div>
          <div className="payment__qr-container">
            {paymentMethod.qrUrl && (
              <img src={paymentMethod.qrUrl || "/placeholder.svg"} alt="Payment QR Code" className="payment__qr-image" />
            )}
          </div>
          <p className="payment__instructions">Scan the QR code to complete your payment</p>
        </div>
        <div className="payment__actions">
          <button className="payment__close-btn-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
