import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "../styles/Pagination.scss"


const Pagination = ({ currentPage, isLastPage, totalPages = 1, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="pagination">
      <button className="pagination__button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaChevronLeft />
      </button>

      <div className="pagination__pages">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`pagination__page ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="pagination__ellipsis">
              {page}
            </span>
          ),
        )}
      </div>

      <button className="pagination__button" onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage}>
        <FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination
