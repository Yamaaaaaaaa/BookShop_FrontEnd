import { useState, useEffect } from "react"
import "../ModalStyle/Modal.scss"
import { toast } from "react-toastify"
import { createSeries, updateSeries } from "../../../service/serieService"

const SeriesFormModal = ({ series, onClose, onSubmit, mode = "add", fetchSeries }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (mode === "edit" && series) {
      setName(series.name)
      setDescription(series.description)
    }
  }, [series, mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === "edit") {
      const response = await updateSeries({ id: series.id, name: name, description: description })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchSeries()
          onClose()
          return
        }
      }
      toast.error(response.message)
    } else {
      const response = await createSeries({ name: name, description: description })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchSeries()
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
      <div className="modal-content modal-series">
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fas fa-${mode === "add" ? "folder-plus" : "edit"}`}></i>
          </div>
          <h2>{mode === "add" ? "Add Series" : "Edit Series"}</h2>
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
                placeholder="Enter series name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter series Description"
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

export default SeriesFormModal

