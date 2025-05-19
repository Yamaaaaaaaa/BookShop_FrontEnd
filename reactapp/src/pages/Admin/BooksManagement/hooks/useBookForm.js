"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { createBook, updateBook } from "../../../../service/bookService"

export const useBookForm = (type, initialBook, fetchInitialBook, onClose) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    series: "",
    seriesId: null,
    publisher: "",
    publisherId: null,
    author: "",
    authorId: null,
    originalCost: "",
    sale: "",
    stock: "",
    state: "",
    publishedDate: "",
    bookImageUrl: "",
  })

  // Add state for image file
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (type === "edit" && initialBook) {
      setFormData({
        id: initialBook.id,
        name: initialBook.name,
        description: initialBook.description,
        series: initialBook.Serie?.name || "",
        seriesId: initialBook.Serie?.id || null,
        publisher: initialBook.Publisher?.name || "",
        publisherId: initialBook.Publisher?.id || null,
        author: initialBook.Author?.name || "",
        authorId: initialBook.Author?.id || null,
        originalCost: initialBook.originalCost,
        sale: initialBook.sale,
        stock: initialBook.stock,
        state: initialBook.state,
        publishedDate: initialBook.publishedDate,
        bookImageUrl: initialBook.bookImageUrl,
      })

      // Set image preview if there's an existing image URL
      if (initialBook.bookImageUrl) {
        setImagePreview(initialBook.bookImageUrl)
      }
    }
  }, [type, initialBook])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setImageFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Prepare the data with the image URL
      const bookData = formData

      if (type === "edit") {
        const response = await updateBook({
          id: bookData.id,
          name: bookData.name,
          description: bookData.description,
          originalCost: bookData.originalCost,
          sale: bookData.sale,
          stock: bookData.stock,
          publisherId: bookData.publisherId,
          authorId: bookData.authorId,
          state: bookData.state,
          publishedDate: bookData.publishedDate,
          seriesId: bookData.seriesId,
          // image: imageFile
        })

        if (response) {
          if (response.status === 1) {
            toast.success(response.message)
            fetchInitialBook()
            onClose()
            return
          }
          toast.success(response.message)
        }
      } else {
        const response = await createBook({
          name: bookData.name,
          description: bookData.description,
          originalCost: bookData.originalCost,
          sale: bookData.sale,
          stock: bookData.stock,
          publisherId: bookData.publisherId,
          authorId: bookData.authorId,
          state: bookData.state,
          publishedDate: bookData.publishedDate,
          seriesId: bookData.seriesId,
          image: imageFile
        })

        if (response) {
          if (response.status === 1) {
            toast.success(response.message)
            fetchInitialBook()
            onClose()
            return
          }
          toast.success(response.message)
        }
      }

      fetchInitialBook()
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    imageFile,
    imagePreview,
    handleImageChange,
    isUploading,
  }
}
