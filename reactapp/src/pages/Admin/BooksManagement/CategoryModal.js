import { useState, useEffect, useRef } from "react"
import { MdBook } from "react-icons/md"
import "./Modal.scss"
import { getAllPublisher } from "../../../service/publisherService"
import { getAllAuthor } from "../../../service/authorService"
import { getAllSeries } from "../../../service/serieService"
import { toast } from "react-toastify"

const AddEditBookModal = ({ type, book, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
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

  // State for dropdown data
  const [publishers, setPublishers] = useState([])
  const [authors, setAuthors] = useState([])
  const [seriesList, setSeriesList] = useState([])

  // State for search terms
  const [publisherSearch, setPublisherSearch] = useState("")
  const [authorSearch, setAuthorSearch] = useState("")
  const [seriesSearch, setSeriesSearch] = useState("")

  // State for dropdown visibility
  const [publisherDropdownOpen, setPublisherDropdownOpen] = useState(false)
  const [authorDropdownOpen, setAuthorDropdownOpen] = useState(false)
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false)

  // Refs for dropdown containers
  const publisherRef = useRef(null)
  const authorRef = useRef(null)
  const seriesRef = useRef(null)

  useEffect(() => {
    if (type === "edit" && book) {
      setFormData({
        name: book.name,
        description: book.description,
        series: book.Serie?.name || "",
        seriesId: book.Serie?.id || null,
        publisher: book.Publisher?.name || "",
        publisherId: book.Publisher?.id || null,
        author: book.Author?.name || "",
        authorId: book.Author?.id || null,
        originalCost: book.originalCost,
        sale: book.sale,
        stock: book.stock,
        state: book.state,
        publishedDate: book.publishedDate,
        bookImageUrl: book.bookImageUrl,
      })
    }
  }, [type, book])

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

  // Handle clicks outside dropdowns to close them
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Filter functions for dropdowns
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
    setPublisherDropdownOpen(false)
  }

  const handleAuthorSelect = (author) => {
    setFormData((prev) => ({
      ...prev,
      author: author.name,
      authorId: author.id,
    }))
    setAuthorDropdownOpen(false)
  }

  const handleSeriesSelect = (series) => {
    setFormData((prev) => ({
      ...prev,
      series: series.name,
      seriesId: series.id,
    }))
    setSeriesDropdownOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting with selected data:", {
      publisher: { id: formData.publisherId, name: formData.publisher },
      author: { id: formData.authorId, name: formData.author },
      series: { id: formData.seriesId, name: formData.series },
    })
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">
            <MdBook size={24} />
          </div>
          <h2>{type === "add" ? "Add Book" : "Update Book"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input id="state" type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group" ref={seriesRef}>
              <label htmlFor="series">Series:</label>
              <div className="dropdown-container">
                <input
                  id="series"
                  type="text"
                  value={seriesSearch}
                  onChange={(e) => setSeriesSearch(e.target.value)}
                  onFocus={() => setSeriesDropdownOpen(true)}
                  placeholder={formData.series || "Search series..."}
                  required
                />
                {seriesDropdownOpen && (
                  <div className="dropdown-list">
                    {filteredSeries.length > 0 ? (
                      filteredSeries.map((series) => (
                        <div key={series.id} className="dropdown-item" onClick={() => handleSeriesSelect(series)}>
                          {series.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" ref={publisherRef}>
              <label htmlFor="publisher">Publisher:</label>
              <div className="dropdown-container">
                <input
                  id="publisher"
                  type="text"
                  value={publisherSearch}
                  onChange={(e) => setPublisherSearch(e.target.value)}
                  onFocus={() => setPublisherDropdownOpen(true)}
                  placeholder={formData.publisher || "Search publisher..."}
                  required
                />
                {publisherDropdownOpen && (
                  <div className="dropdown-list">
                    {filteredPublishers.length > 0 ? (
                      filteredPublishers.map((publisher) => (
                        <div
                          key={publisher.id}
                          className="dropdown-item"
                          onClick={() => handlePublisherSelect(publisher)}
                        >
                          {publisher.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group" ref={authorRef}>
              <label htmlFor="author">Author:</label>
              <div className="dropdown-container">
                <input
                  id="author"
                  type="text"
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
                  onFocus={() => setAuthorDropdownOpen(true)}
                  placeholder={formData.author || "Search author..."}
                  required
                />
                {authorDropdownOpen && (
                  <div className="dropdown-list">
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((author) => (
                        <div key={author.id} className="dropdown-item" onClick={() => handleAuthorSelect(author)}>
                          {author.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="originalCost">Original Price:</label>
              <input
                id="originalCost"
                type="number"
                name="originalCost"
                value={formData.originalCost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sale">Sale Price:</label>
              <input id="sale" type="number" name="sale" value={formData.sale} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock">Stock:</label>
              <input id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="bookImageUrl">Image URL:</label>
              <input
                id="bookImageUrl"
                type="text"
                name="bookImageUrl"
                value={formData.bookImageUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {type === "add" ? "ADD" : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditBookModal

