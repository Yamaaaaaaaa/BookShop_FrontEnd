import { MdBook } from "react-icons/md"
import { toast } from "react-toastify"
import { deleteUser } from "../../../service/userService"

const DeleteUserModal = ({ user, onClose, fetchAllUser }) => {
	const handleDeleteUser = async (userId) => {
		try {
			const response = await deleteUser(userId)
			if (response && response.status === 1) {                
				toast.success(response.message)
				onClose()
				fetchAllUser()
				return
			}
			toast.error(response.message)
		} catch (error) {
			toast.error("Error fetching All User:", error);
		} 
	}
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
					<button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
						Confirm
					</button>
				</div>
			</div>
		</div>
    )
}

export default DeleteUserModal
  
  