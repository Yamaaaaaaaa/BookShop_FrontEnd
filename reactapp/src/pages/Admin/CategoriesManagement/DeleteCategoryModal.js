const DeleteCategoryModal = ({ category, onClose, onConfirm }) => {
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
              <p>Are you certain you wish to proceed with the deletion of category "{category.name}"?</p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default DeleteCategoryModal
  
  