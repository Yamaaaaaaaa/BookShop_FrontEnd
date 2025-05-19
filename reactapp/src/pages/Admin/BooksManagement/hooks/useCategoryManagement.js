import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { updateBook } from "../../../../service/bookService"

export const useCategoryManagement = (book, fetchInitialBook, onClose) => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize selected categories from the book
    if (book && book.Categories) {
      const bookCategoryIds = book.Categories.map((cat) => cat.id)
      console.log("bookcateID", bookCategoryIds);
      
      setSelectedCategories(bookCategoryIds)
    }
  }, [book])

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        // Remove category if already selected
        return prev.filter((id) => id !== categoryId)
      } else {
        // Add category if not selected
        return [...prev, categoryId]
      }
    })
  }

  const handleSaveChanges = async () => {
    try {
      setLoading(true)

      // Call API to update book categories
      const response = await updateBook({
        id: book.id,
        categoriesId: JSON.stringify(selectedCategories),
      })

      if (response && response.status === 1) {
        toast.success("Categories updated successfully")
        fetchInitialBook() // Refresh book data
        onClose() // Close modal
      } else {
        toast.error(response?.message || "Failed to update categories")
      }
    } catch (error) {
      console.error("Error updating categories:", error)
      toast.error("An error occurred while updating categories")
    } finally {
      setLoading(false)
    }
  }

  return {
    selectedCategories,
    loading,
    handleCategoryToggle,
    handleSaveChanges
  }
}
