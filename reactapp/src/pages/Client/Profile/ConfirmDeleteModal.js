import "./ConfirmDeleteModal.scss"

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, billId }) => {
  if (!isOpen) return null

  return (
    <div className="confirm__overlay">
      <div className="confirm__modal">
        <div className="confirm__header">
          <h3>Confirm Cancel</h3>
          <button className="confirm__close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="confirm__content">
          <p className="confirm__message">Are you sure you want to <span className="confirm__warning">Cancel</span> this bill #{billId}?</p>
          <p className="confirm__warning">This action cannot be undone.</p>
        </div>
        <div className="confirm__actions">
          <button className="confirm__cancel-btn" onClick={onClose}>
            Exit
          </button>
          <button
            className="confirm__delete-btn"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal

