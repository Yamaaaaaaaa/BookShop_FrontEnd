import { useState, useEffect } from "react"
import "../BooksManagement/Modal.scss"
import { createAuthor, updateAuthor } from "../../../service/authorService"
import { toast } from "react-toastify"

const AuthorFormModal = ({ author, onClose, onSubmit, mode = "add", fetchAuthors }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (mode === "edit" && author) {
        setName(author.name)
        setDescription(author.description)
    }
  }, [author, mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === "edit") {
      const response = await updateAuthor({
        id: author.id,
        name: name,
        description: description,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchAuthors()
          onClose()
          return
        }
      }
      toast.error(response.message)
    } else {
      const response = await createAuthor({
        name: name,
        description: description,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchAuthors()
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
      <div className="modal-content modal-author">
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fas fa-${mode === "add" ? "user-plus" : "edit"}`}></i>
          </div>
          <h2>{mode === "add" ? "Add Author" : "Edit Author"}</h2>
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
                placeholder="Enter author name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="email"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter author description"
              />
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

export default AuthorFormModal

