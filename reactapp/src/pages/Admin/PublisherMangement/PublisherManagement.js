"use client"

import { useEffect, useState } from "react"
import PublisherFormModal from "./PublisherFormModal"
import DeletePublisherModal from "./DeletePublisherModal"
import "./PublisherManagement.scss"
import { MdDelete, MdEdit } from "react-icons/md"
import { toast } from "react-toastify"
import { getAllPublisher } from "../../../service/publisherService"

const PublisherManagement = () => {
  const [publishersData, setPublishersData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [formModal, setFormModal] = useState({ show: false, mode: "add", publisher: null })
  const [deleteModal, setDeleteModal] = useState({ show: false, publisher: null })

  const handleAdd = (newPublisher) => {}

  const handleEdit = (editedPublisher) => {}

  const handleDelete = (id) => {}

  const filteredPublishers = publishersData.filter(
    (publisher) =>
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) || publisher.id.toString().includes(searchTerm),
  )

  const fetchPublishers = async () => {
    try {
      const listPublishers = await getAllPublisher()
      if (listPublishers?.data?.data) {
        setPublishersData(listPublishers.data.data)
        console.log("All Publishers: ", listPublishers.data.data)

        toast.success(listPublishers.data.message)
        return
      } else toast.error(listPublishers.data.message)
    } catch (error) {
      toast.error("Error fetching publishers:", error)
    }
  }

  useEffect(() => {
    fetchPublishers()
  }, [])

  return (
    <div className="publishers-management">
      <div className="publishers-management__header">
        <h1>Publisher Management</h1>
        <div className="publishers-management__actions">
          <div className="publishers-management__search">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="publishers-management__add-btn"
            onClick={() => setFormModal({ show: true, mode: "add", publisher: null })}
          >
            <i className="fas fa-plus"></i> Add Publisher
          </button>
        </div>
      </div>

      <div className="publishers-management__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublishers.map((publisher) => (
              <tr key={publisher.id}>
                <td>{publisher.id}</td>
                <td>{publisher.name}</td>
                <td>{publisher.description}</td>
                <td className="action-cell">
                  <button
                    className="action-btn edit"
                    onClick={() =>
                      setFormModal({
                        show: true,
                        mode: "edit",
                        publisher,
                      })
                    }
                  >
                    <MdEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => setDeleteModal({ show: true, publisher })}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formModal.show && (
        <PublisherFormModal
          mode={formModal.mode}
          publisher={formModal.publisher}
          onClose={() => setFormModal({ show: false, mode: "add", publisher: null })}
          onSubmit={formModal.mode === "add" ? handleAdd : handleEdit}
          fetchPublishers={fetchPublishers}
        />
      )}

      {deleteModal.show && (
        <DeletePublisherModal
          publisher={deleteModal.publisher}
          onClose={() => setDeleteModal({ show: false, publisher: null })}
          onConfirm={() => handleDelete(deleteModal.publisher.id)}
          fetchPublishers={fetchPublishers}
        />
      )}
    </div>
  )
}

export default PublisherManagement

