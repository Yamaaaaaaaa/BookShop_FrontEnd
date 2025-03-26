"use client"

import { useState, useEffect } from "react"
import "../BooksManagement/Modal.scss"
import { createPublisher, updatePublisher } from "../../../service/publisherService"
import { toast } from "react-toastify"

const PublisherFormModal = ({ publisher, onClose, onSubmit, mode = "add", fetchPublishers }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (mode === "edit" && publisher) {
      setName(publisher.name)
      setDescription(publisher.description || "")
    }
  }, [publisher, mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === "edit") {
      const response = await updatePublisher({
        id: publisher.id,
        name: name,
        description: description,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchPublishers()
          onClose()
          return
        }
      }
      toast.error(response.message)
    } else {
      const response = await createPublisher({
        name: name,
        description: description,
      })
      if (response) {
        if (response.status === 1) {
          toast.success(response.message)
          fetchPublishers()
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
      <div className="modal-content modal-publisher">
        <div className="modal-header">
          <div className="modal-icon">
            <i className={`fas fa-${mode === "add" ? "building-plus" : "edit"}`}></i>
          </div>
          <h2>{mode === "add" ? "Add Publisher" : "Edit Publisher"}</h2>
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
                placeholder="Enter publisher name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter publisher description"
                rows={4}
                className="form-textarea"
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

export default PublisherFormModal

