import { useEffect, useState } from "react"
import CategoryFormModal from "./CategoryFormModal"
import DeleteCategoryModal from "./DeleteCategoryModal"
import "./CategoriesManagement.scss"
import { MdDelete, MdEdit } from "react-icons/md"
import { getAllCategories } from "../../../service/categoryService"
import { toast } from "react-toastify"


const CategoriesManagement = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [formModal, setFormModal] = useState({ show: false, mode: "add", category: null })
    const [deleteModal, setDeleteModal] = useState({ show: false, category: null })

    const handleAdd = (newCategory) => {
        
    }

    const handleEdit = (editedCategory) => {

    }

    const handleDelete = (id) => {

    }

    const filteredCategories = categoriesData.filter(
        (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category.id.toString().includes(searchTerm),
    )
    const fetchCategories = async () => {
        try {
            const listCategories = await getAllCategories();
            if (listCategories?.data?.data) {
                setCategoriesData(listCategories.data.data);
                console.log("All Cate: ", listCategories.data.data);
                
                toast.success(listCategories.data.message)
                return
            }
            else toast.error(listCategories.data.message)
        } catch (error) {
            toast.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        fetchCategories()
    }, [])
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
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
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
                fetchCategories={fetchCategories}
            />
        )}

        {deleteModal.show && (
            <DeleteCategoryModal
            category={deleteModal.category}
            onClose={() => setDeleteModal({ show: false, category: null })}
            onConfirm={() => handleDelete(deleteModal.category.id)}
            fetchCategories={fetchCategories}
            />
        )}
    </div>
    )
}

export default CategoriesManagement

