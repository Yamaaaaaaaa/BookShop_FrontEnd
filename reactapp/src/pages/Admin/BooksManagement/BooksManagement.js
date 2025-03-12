import { useEffect, useState } from "react"
import { MdAdd, MdEdit, MdDelete, MdVisibility, MdCategory } from "react-icons/md"
import ViewBookModal from "./ViewBookModal"
import AddEditBookModal from "./AddEditBookModal"
import DeleteBookModal from "./DeleteBookModal"
import CategoryModal from "./CategoryModal"
import "./BooksManagement.scss"
import { getBooks } from "../../../service/bookService"
import { toast } from "react-toastify"
import {getAllCategories} from "../../../service/categoryService"
const CategoryButton = ({ count, onClick }) => {
    return (
      <button className="category-button" onClick={onClick} title="View Categories">
        <MdCategory />
        <span>{count}</span>
      </button>
    )
}
  

const BooksManagement = () => {
  const [bookData, setBookData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [viewModal, setViewModal] = useState({ show: false, book: null })
  const [addEditModal, setAddEditModal] = useState({ show: false, type: null, book: null })
  const [deleteModal, setDeleteModal] = useState({ show: false, book: null })
  const [categoryModal, setCategoryModal] = useState({ show: false, book: null })
  const [searchTerm, setSearchTerm] = useState("")

  // Handlers
  const handleAdd = (newBook) => {}

  const handleEdit = (updatedBook) => {}

  const handleDelete = (id) => {}


  

  const filteredBooks = bookData.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.id.toString().includes(searchTerm),
  )

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  const fetchInitialBook = async () => {
    try {
      const rcmBook = await getBooks()
      if (rcmBook?.data?.data) {
        setBookData(rcmBook.data.data)
        console.log(rcmBook.data.data)
        toast.success(rcmBook.data.message)
        return
        // filteredBooks()
      }
      toast.error(rcmBook.data.message)
    } catch (error) {
      toast.error("Error to fetch Books")
    }
  }
    const fetchCategories = async () => {
        try {
            const listCategories = await getAllCategories();
            if (listCategories?.data?.data) {
                setCategoryData(listCategories.data.data);
                console.log("All Cate: ", listCategories.data.data);
                toast.success(listCategories.data.message)
                return
            }
        } catch (error) {
            toast.error("Error fetching categories:", error);
        }
    };
  useEffect(() => {
    fetchInitialBook()
    fetchCategories()
  }, [])

  return (
    <div className="book-management">
      {/* Header Section */}
      <div className="book-management__header">
        <h1>Book Management</h1>
        <div className="book-management__actions">
          <div className="book-management__search">
            <input
              type="text"
              placeholder="Search by ID, Name or Author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="book-management__add-btn"
            onClick={() => setAddEditModal({ show: true, type: "add", book: null })}
          >
            <MdAdd /> Add Book
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="book-management__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Series</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.Author.name}</td>
                <td>
                  <CategoryButton
                    count={book.Categories.length}
                    onClick={() =>
                      setCategoryModal({
                        show: true,
                        book: book,
                      })
                    }
                  />
                </td>
                <td>{book.Serie ? book.Serie.name : "Unknown"}</td>
                <td>
                  <div className="price">
                    <span className="sale">{formatCurrency(book.sale)}</span>
                    {book.originalCost > book.sale && (
                      <span className="original">{formatCurrency(book.originalCost)}</span>
                    )}
                  </div>
                </td>
                <td>{book.stock}</td>
                <td className="book-management__actions-cell">
                  <button
                    onClick={() => setViewModal({ show: true, book })}
                    className="action-btn view"
                    title="View Details"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    onClick={() => setAddEditModal({ show: true, type: "edit", book })}
                    className="action-btn edit"
                    title="Edit Book"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, book })}
                    className="action-btn delete"
                    title="Delete Book"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {viewModal.show && (
        <ViewBookModal
          book={viewModal.book}
          onClose={() => setViewModal({ show: false, book: null })}
          formatCurrency={formatCurrency}
        />
      )}

      {addEditModal.show && (
        <AddEditBookModal
          type={addEditModal.type}
          book={addEditModal.book}
          onClose={() => setAddEditModal({ show: false, type: null, book: null })}
          onSubmit={addEditModal.type === "add" ? handleAdd : handleEdit}
          fetchInitialBook={fetchInitialBook}
        />
      )}

      {deleteModal.show && (
        <DeleteBookModal
          book={deleteModal.book}
          onClose={() => setDeleteModal({ show: false, book: null })}
          onConfirm={() => handleDelete(deleteModal.book.id)}
          fetchInitialBook={fetchInitialBook}
        />
      )}

      {categoryModal.show && (
        <CategoryModal
          book={categoryModal.book}
          categories={categoryData}
          onClose={() => setCategoryModal({ show: false, book: null })}
          fetchInitialBook={fetchInitialBook}
        />
      )}
    </div>
  )
}

export default BooksManagement

