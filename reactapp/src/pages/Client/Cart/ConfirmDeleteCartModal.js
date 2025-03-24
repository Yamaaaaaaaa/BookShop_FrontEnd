import "./ConfirmDeleteCartModal.scss"

const ConfirmCartModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null

    return (
    <div className="confirm-cart__overlay">
      <div className="confirm-cart__modal">
        <div className="confirm-cart__header">
          <h3>Remove from Cart</h3>
          <button className="confirm-cart__close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="confirm-cart__content">
          <p className="confirm-cart__message">
            Are you sure you want to remove <span className="confirm-cart__item-name">{itemName}</span> from your cart?
          </p>
        </div>
        <div className="confirm-cart__actions">
          <button className="confirm-cart__cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-cart__remove-btn"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCartModal

