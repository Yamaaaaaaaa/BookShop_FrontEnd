"use client"
import { MdBook, MdCloudUpload, MdDelete } from "react-icons/md"
import "../styles/Modal.scss"
import { useBookForm } from "../hooks/useBookForm"
import { useDropdown } from "../hooks/useDropdown"

const AddEditBookModal = ({ type, book, onClose, fetchInitialBook }) => {
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    imageFile,
    imagePreview,
    handleImageChange,
    isUploading,
    setImagePreview,
  } = useBookForm(type, book, fetchInitialBook, onClose)

  const {
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
    handleSeriesSelect,
  } = useDropdown(formData, setFormData)

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
          <div className="form-row">
            <div className="form-group form-group--two-thirds">
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
            </div>

            <div className="form-group form-group--one-third">
              <label htmlFor="bookImage">Book Cover Image:</label>
              <div className="image-upload-container">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview || "/placeholder.svg"} alt="Book cover preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setImagePreview("")
                        setFormData((prev) => ({ ...prev, bookImageUrl: "" }))
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <input
                      type="file"
                      id="bookImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <label htmlFor="bookImage" className="file-label">
                      <MdCloudUpload size={32} />
                      <span>Click to upload image</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input id="state" type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group" ref={seriesRef}>
              <label htmlFor="series">Series:</label>
              <div className="search-dropdown">
                <input
                  id="series-search"
                  type="text"
                  value={seriesSearch}
                  onChange={(e) => setSeriesSearch(e.target.value)}
                  onFocus={() => setSeriesDropdownOpen(true)}
                  placeholder={type === "edit" ? "" : formData.series || "Search series..."}
                  className="search-input"
                />
                {formData.series && !seriesSearch && <div className="selected-item">{formData.series}</div>}
                {seriesDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredSeries.length > 0 ? (
                      filteredSeries.map((series) => (
                        <div key={series.id} className="dropdown-item" onClick={() => handleSeriesSelect(series)}>
                          {series.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">No results found</div>
                    )}
                  </div>
                )}
              </div>
              <input type="hidden" name="series" value={formData.series} required />
              <input type="hidden" name="seriesId" value={formData.seriesId || ""} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" ref={publisherRef}>
              <label htmlFor="publisher">Publisher:</label>
              <div className="search-dropdown">
                <input
                  id="publisher-search"
                  type="text"
                  value={publisherSearch}
                  onChange={(e) => setPublisherSearch(e.target.value)}
                  onFocus={() => setPublisherDropdownOpen(true)}
                  placeholder={type === "edit" ? "" : formData.publisher || "Search publisher..."}
                  className="search-input"
                />
                {formData.publisher && !publisherSearch && <div className="selected-item">{formData.publisher}</div>}
                {publisherDropdownOpen && (
                  <div className="dropdown-menu">
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
                      <div className="dropdown-item no-results">No results found</div>
                    )}
                  </div>
                )}
              </div>
              <input type="hidden" name="publisher" value={formData.publisher} required />
              <input type="hidden" name="publisherId" value={formData.publisherId || ""} />
            </div>
            <div className="form-group" ref={authorRef}>
              <label htmlFor="author">Author:</label>
              <div className="search-dropdown">
                <input
                  id="author-search"
                  type="text"
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
                  onFocus={() => setAuthorDropdownOpen(true)}
                  placeholder={type === "edit" ? "" : formData.author || "Search author..."}
                  className="search-input"
                />
                {formData.author && !authorSearch && <div className="selected-item">{formData.author}</div>}
                {authorDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((author) => (
                        <div key={author.id} className="dropdown-item" onClick={() => handleAuthorSelect(author)}>
                          {author.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">No results found</div>
                    )}
                  </div>
                )}
              </div>
              <input type="hidden" name="author" value={formData.author} required />
              <input type="hidden" name="authorId" value={formData.authorId || ""} />
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
              <label htmlFor="publishedDate">Published Date:</label>
              <input
                id="publishedDate"
                type="date"
                name="publishedDate"
                value={formData.publishedDate ? formData.publishedDate.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isUploading}>
            CANCEL
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "UPLOADING..." : type === "add" ? "ADD" : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditBookModal
