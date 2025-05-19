"use client"
import { MdDelete } from "react-icons/md"
import "../styles/Modal.scss"
import { deleteBook } from "../../../../service/bookService"
import { toast } from "react-toastify"

const DeleteBookModal = ({ book, onClose, fetchInitialBook }) => {
  const handleDeleteBook = async () => {
    const response = await deleteBook(book.id)
    if (response) {
      if (response.status === 1) {
        toast.success(response.message)
        fetchInitialBook()
        onClose()
        return
      }
    }
    toast.error(response.message)
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <MdDelete size={24} />
          </div>
          <h2>Delete Confirmation</h2>
        </div>

        <div className="modal-body delete-confirmation">
          <p>"Are you certain you wish to proceed with the deletion of the selected entry?"</p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn btn-danger" onClick={handleDeleteBook}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBookModal
