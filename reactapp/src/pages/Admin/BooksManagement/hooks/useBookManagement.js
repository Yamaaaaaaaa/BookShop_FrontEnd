"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { getBookData } from "../../../../service/bookService"
import { getAllCategories } from "../../../../service/categoryService"
import { getAllPublisher } from "../../../../service/publisherService"

export const useBookManagement = () => {
  const [bookData, setBookData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [publishers, setPublishers] = useState([])
  const [selectedSeries, setSelectedSeries] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [seriesData, setSeriesData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Sorting states
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")

  // Modal states
  const [viewModal, setViewModal] = useState({ show: false, book: null })
  const [addEditModal, setAddEditModal] = useState({ show: false, type: null, book: null })
  const [deleteModal, setDeleteModal] = useState({ show: false, book: null })
  const [categoryModal, setCategoryModal] = useState({ show: false, book: null })

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const fetchInitialBook = async (page = 1) => {
    try {
      const rcmBook = await getBookData({ pageSize, page, sortBy: "id", sortOrder: "ASC" })
      if (rcmBook?.data) {
        setBookData(rcmBook.data)
        setIsLastPage(rcmBook.isLastPage || false)
        setTotalPages(rcmBook.totalPages || 1)
        toast.success(rcmBook.message)
        return
      }
      toast.error(rcmBook.message)
    } catch (error) {
      toast.error("Error to fetch Books")
    }
  }

  const fetchCategories = async () => {
    try {
      const listCategories = await getAllCategories()
      if (listCategories?.data?.data) {
        setCategoryData(listCategories.data.data)
        toast.success(listCategories.data.message)
        return
      }
    } catch (error) {
      toast.error("Error fetching categories:", error)
    }
  }

  const fetchPublishers = async () => {
    try {
      const listPublishers = await getAllPublisher()
      if (listPublishers?.data?.data) {
        setPublishers(listPublishers.data.data)
      }
    } catch (error) {
      console.error("Error fetching publishers:", error)
    }
  }

  const extractSeriesData = () => {
    const uniqueSeries = []
    const seriesIds = new Set()

    bookData.forEach((book) => {
      if (book.Serie && !seriesIds.has(book.Serie.id)) {
        seriesIds.add(book.Serie.id)
        uniqueSeries.push(book.Serie)
      }
    })

    return uniqueSeries
  }

  useEffect(() => {
    fetchInitialBook(currentPage)
    fetchCategories()
    fetchPublishers()
  }, [currentPage])

  useEffect(() => {
    if (bookData.length > 0) {
      setSeriesData(extractSeriesData())
    }
  }, [bookData])

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // If sorting by a new field, default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get filtered and sorted books
  const getFilteredAndSortedBooks = () => {
    // First filter the books
    const filtered = bookData.filter((book) => {
      const matchesSearch =
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.id.toString().includes(searchTerm)

      const matchesSeries = selectedSeries === "" || (book.Serie && book.Serie.id.toString() === selectedSeries)

      const matchesCategory =
        selectedCategory === "" || book.Categories.some((cat) => cat.id.toString() === selectedCategory)

      return matchesSearch && matchesSeries && matchesCategory
    })

    // Then sort the filtered books
    return filtered.sort((a, b) => {
      let comparison = 0

      if (sortField === "id") {
        comparison = a.id - b.id
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      }

      // Reverse if descending
      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    } else {
      // If already on page 1, just refresh the data
      fetchInitialBook(1)
    }
  }, [searchTerm, selectedCategory, selectedSeries])

  return {
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
    setCurrentPage,
    isLastPage,
    pageSize,
    handlePageChange,
    totalPages,
  }
}
