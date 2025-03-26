import "./ConfirmDeleteWishListModal.scss"


const ConfirmWishlistModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null

  return (
    <div className="confirm-wishlist__overlay">
      <div className="confirm-wishlist__modal">
        <div className="confirm-wishlist__header">
          <h3>Remove from Wishlist</h3>
          <button className="confirm-wishlist__close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="confirm-wishlist__content">
          <p className="confirm-wishlist__message">
            Are you sure you want to remove <span className="confirm-wishlist__item-name">{itemName}</span> from your
            wishlist?
          </p>
        </div>
        <div className="confirm-wishlist__actions">
          <button className="confirm-wishlist__cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-wishlist__remove-btn"
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

export default ConfirmWishlistModal

