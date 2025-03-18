import { useEffect, useState } from "react"
import AuthorFormModal from "./AuthorFormModal"
import DeleteAuthorModal from "./DeleteAuthorModal"
import "./AuthorManagement.scss"
import { MdDelete, MdEdit } from "react-icons/md"
import { toast } from "react-toastify"
import { getAllAuthor } from "../../../service/authorService"

const AuthorManagement = () => {
  const [authorsData, setAuthorsData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [formModal, setFormModal] = useState({ show: false, mode: "add", author: null })
  const [deleteModal, setDeleteModal] = useState({ show: false, author: null })

  const handleAdd = (newAuthor) => {}

  const handleEdit = (editedAuthor) => {}

  const handleDelete = (id) => {}

  const filteredAuthors = authorsData.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.id.toString().includes(searchTerm) ||
      (author.email && author.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const fetchAuthors = async () => {
    try {
      const listAuthors = await getAllAuthor()
      if (listAuthors && listAuthors.status === 1) {
        setAuthorsData(listAuthors.data)
        console.log("All Authors: ", listAuthors.data)

        toast.success(listAuthors.message)
        return
      } else toast.error(listAuthors.message)
    } catch (error) {
      toast.error("Error fetching authors:", error)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  return (
    <div className="authors-management">
      <div className="authors-management__header">
        <h1>Author Management</h1>
        <div className="authors-management__actions">
          <div className="authors-management__search">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="authors-management__add-btn"
            onClick={() => setFormModal({ show: true, mode: "add", author: null })}
          >
            <i className="fas fa-plus"></i> Add Author
          </button>
        </div>
      </div>

      <div className="authors-management__table">
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
            {filteredAuthors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.description}</td>
                <td className="action-cell">
                  <button
                    className="action-btn edit"
                    onClick={() =>
                      setFormModal({
                        show: true,
                        mode: "edit",
                        author,
                      })
                    }
                  >
                    <MdEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => setDeleteModal({ show: true, author })}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formModal.show && (
        <AuthorFormModal
          mode={formModal.mode}
          author={formModal.author}
          onClose={() => setFormModal({ show: false, mode: "add", author: null })}
          onSubmit={formModal.mode === "add" ? handleAdd : handleEdit}
          fetchAuthors={fetchAuthors}
        />
      )}

      {deleteModal.show && (
        <DeleteAuthorModal
          author={deleteModal.author}
          onClose={() => setDeleteModal({ show: false, author: null })}
          onConfirm={() => handleDelete(deleteModal.author.id)}
          fetchAuthors={fetchAuthors}
        />
      )}
    </div>
  )
}

export default AuthorManagement

