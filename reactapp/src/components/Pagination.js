import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Update URL with new page number
      navigate(`?page=${page}`);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Số trang tối đa hiển thị
    
    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang ít hơn maxVisiblePages, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu tiên
      pages.push(1);
      
      // Tính toán các trang ở giữa
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Điều chỉnh để luôn hiển thị đủ 3 trang ở giữa
      if (startPage === 2) endPage = 4;
      if (endPage === totalPages - 1) startPage = totalPages - 3;
      
      // Thêm dấu ... nếu cần
      if (startPage > 2) pages.push('...');
      
      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Thêm dấu ... nếu cần
      if (endPage < totalPages - 1) pages.push('...');
      
      // Luôn hiển thị trang cuối cùng
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__dwnbtn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            className={`pagination__page ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="pagination__ellipsis">
            {page}
          </span>
        )
      ))}

      <button
        className="pagination__button pagination__dwnbtn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 