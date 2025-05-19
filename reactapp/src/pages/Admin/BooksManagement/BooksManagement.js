"use client"

import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa"
import { MdAdd } from "react-icons/md"
import ViewBookModal from "./modals/ViewBookModal"
import AddEditBookModal from "./modals/AddEditBookModal"
import DeleteBookModal from "./modals/DeleteBookModal"
import CategoryModal from "./modals/CategoryModal"
import { BookTableRows } from "./components/BookTableRow"
import { useBookManagement } from "./hooks/useBookManagement"
import Pagination from "./components/Pagination"
import "./styles/BooksManagement.scss"
import { updateBook, deleteBook } from "../../../service/bookService"
import { toast } from "react-toastify"
import { useState } from "react"

const BooksManagement = () => {
  const {
    bookData,
    categoryData,
    publishers,
    selectedSeries,
    setSelectedSeries,
    selectedCategory,
    setSelectedCategory,
    seriesData,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    viewModal,
    setViewModal,
    addEditModal,
    setAddEditModal,
    deleteModal,
    setDeleteModal,
    categoryModal,
    setCategoryModal,
    fetchInitialBook,
    handleSort,
    getFilteredAndSortedBooks,
    formatCurrency,
    // Pagination
    currentPage,
    isLastPage,
    totalPages,
    handlePageChange,
  } = useBookManagement()

  const [selectedBooks, setSelectedBooks] = useState([])
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)

  const filteredAndSortedBooks = getFilteredAndSortedBooks()

  // Render sort icon based on current sort state
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="sort-icon" />
    }

    return sortDirection === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    )
  }

  const handleSelectBook = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    )
  }

  const handleSelectAll = () => {
    if (selectedBooks.length === filteredAndSortedBooks.length) {
      setSelectedBooks([])
    } else {
      setSelectedBooks(filteredAndSortedBooks.map((b) => b.id))
    }
  }

  const handleBulkSale = () => {
    setShowDiscountModal(true)
  }

  const handleApplyDiscount = async () => {
    setIsApplyingDiscount(true)
    try {
      await Promise.all(
        selectedBooks.map((id) => {
          const book = filteredAndSortedBooks.find((b) => b.id === id)
          if (!book) return null
          const sale = Math.round(book.originalCost * (1 - discountPercent / 100))
          return updateBook({
            id: book.id,
            name: book.name,
            description: book.description,
            originalCost: book.originalCost,
            sale,
            stock: book.stock,
            publisherId: book.Publisher?.id,
            authorId: book.Author?.id,
            state: book.state,
            publishedDate: book.publishedDate,
            seriesId: book.Serie?.id,
            // Thêm trường khác nếu BE yêu cầu
          })
        })
      )
      toast.success("Đã áp dụng giảm giá cho tất cả sách đã chọn!")
      fetchInitialBook()
      setSelectedBooks([])
      setShowDiscountModal(false)
      setDiscountPercent(0)
    } catch (err) {
      toast.error("Có lỗi khi giảm giá hàng loạt!")
    } finally {
      setIsApplyingDiscount(false)
    }
  }

  const handleBulkDelete = async () => {
    if (!window.confirm("Bạn chắc chắn muốn xóa tất cả sách đã chọn?")) return
    try {
      await Promise.all(
        selectedBooks.map((id) => deleteBook(id))
      )
      toast.success("Đã xóa tất cả sách đã chọn!")
      fetchInitialBook()
      setSelectedBooks([])
    } catch (err) {
      toast.error("Có lỗi khi xóa sách hàng loạt!")
    }
  }

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
          <div className="book-management__filters">
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="filter-select"
            >
              <option value="">All Series</option>
              {seriesData.map((series) => (
                <option key={series.id} value={series.id}>
                  {series.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categoryData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              <th>
                <input
                  type="checkbox"
                  checked={selectedBooks.length === filteredAndSortedBooks.length && filteredAndSortedBooks.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort("id")} className="sortable-header">
                ID {renderSortIcon("id")}
              </th>
              <th onClick={() => handleSort("name")} className="sortable-header">
                Name {renderSortIcon("name")}
              </th>
              <th>Author</th>
              <th>Categories</th>
              <th>Series</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBooks.map((book) => (
              <BookTableRows
                key={book.id}
                books={[book]}
                isSelected={selectedBooks.includes(book.id)}
                onSelect={() => handleSelectBook(book.id)}
                onView={(book) => setViewModal({ show: true, book })}
                onEdit={(book) => setAddEditModal({ show: true, type: "edit", book })}
                onDelete={(book) => setDeleteModal({ show: true, book })}
                onCategoryView={(book) => setCategoryModal({ show: true, book })}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        isLastPage={isLastPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Floating Bulk Bar */}
      {selectedBooks.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 16,
            padding: '16px 32px',
            minWidth: 320,
            maxWidth: 900,
            margin: '0 auto',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ color: '#333', fontWeight: 500 }}>
            <b>{selectedBooks.length}</b> sách được chọn
          </span>
          <button onClick={handleBulkSale} className="btn btn-primary" style={{ minWidth: 120 }}>
            <span style={{ marginRight: 6 }}>%</span> Giảm giá tất cả
          </button>
          <button onClick={handleBulkDelete} className="btn btn-danger" style={{ minWidth: 120 }}>
            <span style={{ marginRight: 6 }}>🗑️</span> Xóa tất cả
          </button>
        </div>
      )}

      {/* Discount Modal */}
      {showDiscountModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 350, width: '100%' }}>
            <div className="modal-header">
              <h2>Giảm giá hàng loạt</h2>
            </div>
            <div className="modal-body">
              <label>Nhập % giảm giá cho tất cả sách đã chọn:</label>
              <input
                type="number"
                min={0}
                max={100}
                value={discountPercent}
                onChange={e => setDiscountPercent(Number(e.target.value))}
                style={{ width: '100%', margin: '12px 0', padding: 8 }}
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDiscountModal(false)} disabled={isApplyingDiscount}>Hủy</button>
              <button className="btn btn-primary" onClick={handleApplyDiscount} disabled={isApplyingDiscount || discountPercent <= 0 || discountPercent > 100}>
                {isApplyingDiscount ? "Đang áp dụng..." : "Áp dụng"}
              </button>
            </div>
          </div>
        </div>
      )}

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
          fetchInitialBook={fetchInitialBook}
        />
      )}

      {deleteModal.show && (
        <DeleteBookModal
          book={deleteModal.book}
          onClose={() => setDeleteModal({ show: false, book: null })}
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
