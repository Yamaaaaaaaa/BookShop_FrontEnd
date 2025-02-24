import { useState } from "react"
import CategoryFormModal from "./CategoryFormModal"
import DeleteCategoryModal from "./DeleteCategoryModal"
import "./CategoriesManagement.scss"
import { MdDelete, MdEdit } from "react-icons/md"

const mockCategories = [
    {
        id: "001",
        name: "Education",
        amount: "002 Books",
        createdAt: "25-02-2024 10:39:43",
    },
    {
        id: "002",
        name: "Science",
        amount: "005 Books",
        createdAt: "25-02-2024 10:39:43",
    },
    {
        id: "003",
        name: "Technology",
        amount: "003 Books",
        createdAt: "25-02-2024 10:39:43",
    },
]

const CategoriesManagement = () => {
    const [categories, setCategories] = useState(mockCategories)
    const [searchTerm, setSearchTerm] = useState("")
    const [formModal, setFormModal] = useState({ show: false, mode: "add", category: null })
    const [deleteModal, setDeleteModal] = useState({ show: false, category: null })

    const handleAdd = (newCategory) => {
        const lastId = Math.max(...categories.map((cat) => Number.parseInt(cat.id)))
        const newId = (lastId + 1).toString().padStart(3, "0")
        const now = new Date()
            .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            .replace(",", "")

            setCategories([
            ...categories,
            {
                ...newCategory,
                id: newId,
                createdAt: now,
                amount: "000 Books",
            },
        ])
        setFormModal({ show: false, mode: "add", category: null })
    }

    const handleEdit = (editedCategory) => {
        setCategories(categories.map((category) => (category.id === editedCategory.id ? editedCategory : category)))
        setFormModal({ show: false, mode: "add", category: null })
    }

    const handleDelete = (id) => {
        setCategories(categories.filter((category) => category.id !== id))
        setDeleteModal({ show: false, category: null })
    }

    const filteredCategories = categories.filter(
        (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.id.includes(searchTerm),
    )

    return (
    <div className="categories-management">
        <div className="categories-management__header">
            <h1>Category Management</h1>
            <div className="categories-management__actions">
                <div className="categories-management__search">
                    <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    className="categories-management__add-btn"
                    onClick={() => setFormModal({ show: true, mode: "add", category: null })}
                >
                    <i className="fas fa-plus"></i> Add Category
                </button>
            </div>
        </div>

        <div className="categories-management__table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.amount}</td>
                            <td>{category.createdAt}</td>
                            <td className="action-cell">
                            <button
                                className="action-btn edit"
                                onClick={() =>
                                setFormModal({
                                    show: true,
                                    mode: "edit",
                                    category,
                                })
                                }
                            >
                                <MdEdit />
                            </button>
                            <button className="action-btn delete" onClick={() => setDeleteModal({ show: true, category })}>
                                <MdDelete />
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {formModal.show && (
            <CategoryFormModal
                mode={formModal.mode}
                category={formModal.category}
                onClose={() => setFormModal({ show: false, mode: "add", category: null })}
                onSubmit={formModal.mode === "add" ? handleAdd : handleEdit}
            />
        )}

        {deleteModal.show && (
            <DeleteCategoryModal
            category={deleteModal.category}
            onClose={() => setDeleteModal({ show: false, category: null })}
            onConfirm={() => handleDelete(deleteModal.category.id)}
            />
        )}
    </div>
    )
}

export default CategoriesManagement

