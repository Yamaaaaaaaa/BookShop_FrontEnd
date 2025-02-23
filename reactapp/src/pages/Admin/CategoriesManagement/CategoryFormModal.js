import { useState, useEffect } from "react"
import "../BooksManagement/Modal.scss"
const CategoryFormModal = ({ category, onClose, onSubmit, mode = "add" }) => {
  const [name, setName] = useState("")

  useEffect(() => {
    if (mode === "edit" && category) {
      setName(category.name)
    }
  }, [category, mode])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === "edit") {
      onSubmit({ ...category, name })
    } else {
      onSubmit({ name })
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-category">
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fas fa-${mode === "add" ? "folder-plus" : "edit"}`}></i>
          </div>
          <h2>{mode === "add" ? "Add Category" : "Edit Category"}</h2>
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
                placeholder="Enter category name"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryFormModal

