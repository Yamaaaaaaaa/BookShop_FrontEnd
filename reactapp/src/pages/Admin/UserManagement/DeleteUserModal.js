import { MdBook } from "react-icons/md"

const DeleteUserModal = ({ user, onClose, onConfirm }) => {
    return (
		<div className="modal-overlay">
			<div className="modal-content delete-modal">
				<div className="modal-header">
					<div className="modal-icon">
						<MdBook size={24} />
					</div>
					<h2>Delete Confirmation</h2>
				</div>
				<div className="modal-body">
					<div className="delete-confirmation">
						<p>Are you certain you wish to proceed with the deletion of user "{user.name}"?</p>
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

export default DeleteUserModal
  
  