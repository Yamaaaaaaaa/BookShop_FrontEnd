"use client"

import { MdEdit, MdDelete, MdVisibility, MdCategory } from "react-icons/md"

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}

const CategoryButton = ({ count, onClick }) => {
  return (
    <button className="category-button" onClick={onClick} title="View Categories">
      <MdCategory />
      <span>{count}</span>
    </button>
  )
}

const LoadingRow = ({ colSpan = 9 }) => {
  return (
    <tr className="loading-row">
      <td colSpan={colSpan}>
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <span>Đang tải dữ liệu...</span>
        </div>
      </td>
    </tr>
  )
}

const BookTableRow = ({ book, isSelected, onSelect, onView, onEdit, onDelete, onCategoryView, isLoading }) => {
  // If loading is explicitly set to true or book data is not available
  if (isLoading || !book) {
    return <LoadingRow />
  }

  return (
    <tr className={isSelected ? "selected-row" : ""}>
      <td>
        <input type="checkbox" checked={isSelected} onChange={onSelect} className="book-management__checkbox" />
      </td>
      <td>{book.id}</td>
      <td>{book.name}</td>
      <td>{book.Author?.name || "N/A"}</td>
      <td>
        <CategoryButton count={book.Categories?.length || 0} onClick={() => onCategoryView(book)} />
      </td>
      <td>{book.Serie ? book.Serie.name : "Unknown"}</td>
      <td>
        <div className="price">
          <span className="sale">{formatCurrency(book.sale || 0)}</span>
          {book.originalCost > book.sale && <span className="original">{formatCurrency(book.originalCost)}</span>}
        </div>
      </td>
      <td>{book.stock}</td>
      <td className="book-management__actions-cell">
        <button onClick={() => onView(book)} className="action-btn view" title="View Details">
          <MdVisibility />
        </button>
        <button onClick={() => onEdit(book)} className="action-btn edit" title="Edit Book">
          <MdEdit />
        </button>
        <button onClick={() => onDelete(book)} className="action-btn delete" title="Delete Book">
          <MdDelete />
        </button>
      </td>
    </tr>
  )
}

// You can also create a component to handle multiple rows or empty state
const BookTableRows = ({ books, isLoading, ...rowProps }) => {
  if (isLoading) {
    return (
      <>
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </>
    )
  }

  if (!books || books.length === 0) {
    return (
      <tr className="empty-row">
        <td colSpan={9}>
          <div className="empty-state">Không có sách nào</div>
        </td>
      </tr>
    )
  }

  return books.map((book) => <BookTableRow key={book.id} book={book} {...rowProps} />)
}

export default BookTableRow
export { BookTableRows, LoadingRow, CategoryButton }
