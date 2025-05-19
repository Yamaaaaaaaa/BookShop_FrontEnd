"use client"

import { MdClose, MdCheck } from "react-icons/md"
import "../styles/CategoryManagement.scss"
import { useCategoryManagement } from "../hooks/useCategoryManagement"

const CategoryModal = ({ book, categories, onClose, fetchInitialBook }) => {
  const { selectedCategories, loading, handleCategoryToggle, handleSaveChanges } = useCategoryManagement(
    book,
    fetchInitialBook,
    onClose,
  )
  console.log("Book: ", book);
  
  return (
    <div className="category-modal-overlay">
      <div className="category-modal">
        <div className="category-modal__header">
          <h2>Categories for "{book?.name}"</h2>
          <button className="category-modal__close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="category-modal__content">
          <p className="category-modal__description">
            Select the categories that apply to this book. Click to toggle selection.
          </p>

          <div className="category-modal__list">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-modal__item ${selectedCategories.includes(category.id) ? "selected" : ""}`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <span className="category-modal__item-name">{category.name}</span>
                {selectedCategories.includes(category.id) && (
                  <span className="category-modal__item-check">
                    <MdCheck />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="category-modal__footer">
          <button className="category-modal__cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="category-modal__save-btn" onClick={handleSaveChanges} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal
