import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { getAllPublisher } from "../../../../service/publisherService"
import { getAllAuthor } from "../../../../service/authorService"
import { getAllSeries } from "../../../../service/serieService"

export const useDropdown = (formData, setFormData) => {
  // dropdown data
  const [publishers, setPublishers] = useState([])
  const [authors, setAuthors] = useState([])
  const [seriesList, setSeriesList] = useState([])

  // search terms
  const [publisherSearch, setPublisherSearch] = useState("")
  const [authorSearch, setAuthorSearch] = useState("")
  const [seriesSearch, setSeriesSearch] = useState("")

  // dropdown visibility
  const [publisherDropdownOpen, setPublisherDropdownOpen] = useState(false)
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false)
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false)

  // dropdown containers
  const publisherRef = useRef(null)
  const authorRef = useRef(null)
  const seriesRef = useRef(null)

  const fetchPublishers = async () => {
    try {
      const listPublishers = await getAllPublisher()
      if (listPublishers?.data?.data) {
        setPublishers(listPublishers.data.data)
      }
    } catch (error) {
      toast.error("Error fetching publishers:", error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const listAuthor = await getAllAuthor()
      if (listAuthor?.data) {
        setAuthors(listAuthor.data)
      }
    } catch (error) {
      toast.error("Error fetching authors:", error)
    }
  }

  const fetchSeries = async () => {
    try {
      const listSeries = await getAllSeries()
      if (listSeries?.data) {
        setSeriesList(listSeries.data)
      }
    } catch (error) {
      toast.error("Error fetching series:", error)
    }
  }

  useEffect(() => {
    fetchSeries()
    fetchAuthors()
    fetchPublishers()
  }, [])

  // Ấn ra ngoài dropdown -> Đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (publisherRef.current && !publisherRef.current.contains(event.target)) {
        setPublisherDropdownOpen(false)
      }
      if (authorRef.current && !authorRef.current.contains(event.target)) {
        setAuthorDropdownOpen(false)
      }
      if (seriesRef.current && !seriesRef.current.contains(event.target)) {
        setSeriesDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter dropdowns
  const filteredPublishers = publishers.filter((pub) => pub.name.toLowerCase().includes(publisherSearch.toLowerCase()))
  const filteredAuthors = authors.filter((auth) => auth.name.toLowerCase().includes(authorSearch.toLowerCase()))
  const filteredSeries = seriesList.filter((series) => series.name.toLowerCase().includes(seriesSearch.toLowerCase()))

  // Handle selection from dropdowns
  const handlePublisherSelect = (publisher) => {
    setFormData((prev) => ({
      ...prev,
      publisher: publisher.name,
      publisherId: publisher.id,
    }))
    setPublisherSearch("")
    setPublisherDropdownOpen(false)
  }

  const handleAuthorSelect = (author) => {
    setFormData((prev) => ({
      ...prev,
      author: author.name,
      authorId: author.id,
    }))
    setAuthorSearch("")
    setAuthorDropdownOpen(false)
  }

  const handleSeriesSelect = (series) => {
    setFormData((prev) => ({
      ...prev,
      series: series.name,
      seriesId: series.id,
    }))
    setSeriesSearch("")
    setSeriesDropdownOpen(false)
  }

  return {
    publishers,
    authors,
    seriesList,
    publisherSearch,
    setPublisherSearch,
    authorSearch,
    setAuthorSearch,
    seriesSearch,
    setSeriesSearch,
    publisherDropdownOpen,
    setPublisherDropdownOpen,
    authorDropdownOpen,
    setAuthorDropdownOpen,
    seriesDropdownOpen,
    setSeriesDropdownOpen,
    publisherRef,
    authorRef,
    seriesRef,
    filteredPublishers,
    filteredAuthors,
    filteredSeries,
    handlePublisherSelect,
    handleAuthorSelect,
    handleSeriesSelect
  }
}
