import { useState } from "react"
import "./shop.scss"
import { Link } from "react-router-dom"
import { RxExit } from "react-icons/rx";

export const books = [
  {
    id: 1,
    title: "Thunder Stunt",
    price: 20.11,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DECGAFw4lLuzh85VEVEwZexuOUmLPA.png",
    category: "Action",
    publisher: "Publisher A",
  },
  {
    id: 2,
    title: "Battler Drive",
    price: 20.12,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cETOqCqBlA0JtM6j1ZRf09jSy5hQ56.png",
    category: "Adventure",
    publisher: "Publisher B",
  },
  {
    id: 3,
    title: "Take Out Tango",
    price: 20.22,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png",
    category: "Comedy",
    publisher: "Publisher C",
  },
  {
    id: 4,
    title: "Cosmic Journey",
    price: 20.33,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png",
    category: "Adventure",
    publisher: "Publisher A",
  },
  {
    id: 5,
    title: "Laugh Out Loud",
    price: 20.4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png",
    category: "Comedy",
    publisher: "Publisher B",
  },
  {
    id: 6,
    title: "Hero's Quest",
    price: 20.55,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png",
    category: "Action",
    publisher: "Publisher C",
  },
  {
    id: 7,
    title: "Mystic Tales",
    price: 20.8,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png",
    category: "Adventure",
    publisher: "Publisher A",
  },
]


export const categories = ["Action", "Adventure", "Animation", "Biography", "Comedy"]
export const publishers = ["Publisher A", "Publisher B", "Publisher C"]
const Shop = () => {
  const [openSection, setOpenSection] = useState("price")
  const [priceRange, setPriceRange] = useState(50)
  const [favorites, setFavorites] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPublishers, setSelectedPublishers] = useState([])
  const [openSideBarFilter, setOpenSideBarFilter] = useState(false)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const toggleFavorite = (bookId) => {
    setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const handleResetFilter = () => {
    setPriceRange(50)
    setSelectedCategories([])
    setSelectedPublishers([])
  }

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const togglePublisher = (publisher) => {
    setSelectedPublishers((prev) =>
      prev.includes(publisher) ? prev.filter((p) => p !== publisher) : [...prev, publisher],
    )
  }

  const filteredBooks = books.filter(
    (book) =>
      book.price <= priceRange &&
      (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
      (selectedPublishers.length === 0 || selectedPublishers.includes(book.publisher)),
  )



  return (
    <main className="shop">
      <div className="shop__container">
        <aside className="shop__sidebar">
          <h2>Filter Options</h2>

          {/* Chọn khoảng giá */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("price")}>
              Price Range
              <span className="shop__filter-section__arrow">{openSection === "price" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "price" ? "active" : ""}`}>
              <div className="shop__price-range">
                <span>0.0</span>
                <div className="shop__range-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                </div>
                <span>80.00</span>
              </div>
            </div>
          </div>
          {/* Lọc theo Category */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("category")}>
              Shop by Category
              <span className="shop__filter-section__arrow">{openSection === "category" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "category" ? "active" : ""}`}>
              {categories.map((category) => (
                <label key={category} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          {/* Lọc theo nhà xuất bản */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("publisher")}>
              Choose Publisher
              <span className="shop__filter-section__arrow">{openSection === "publisher" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "publisher" ? "active" : ""}`}>
              {publishers.map((publisher) => (
                <label key={publisher} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={publisher}
                    checked={selectedPublishers.includes(publisher)}
                    onChange={() => togglePublisher(publisher)}
                  />
                  {publisher}
                </label>
              ))}
            </div>
          </div>
          {/* Reset Filter */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={handleResetFilter}>
              Reset Filter
            </button>
          </div>
        </aside>

        <div className="shop__books-section">
          <div className="shop__books-header">
            <h1>Books</h1>
            <div className="shop__view-options">
              <select>
                <option>Categories</option>
              </select>
              <select>
                <option>Newest</option>
              </select>
              <button onClick={() => setOpenSideBarFilter(true)}>
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="shop__books-grid">
            {filteredBooks.map((book) => (
              <Link to="/bookdetail" key={book.id} className="shop__book-card">
                <div className="shop__book-image">
                  <img src={book.image || "/placeholder.svg"} alt={book.title} />
                  <button
                    className={`shop__favorite-button ${favorites.includes(book.id) ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(book.id)
                    }}
                  >
                    ❤️
                  </button>
                </div>

                <div className="shop__book-info">
                  <h3 className="shop__book-title">{book.title}</h3>
                  <span className="shop__book-price">${book.price.toFixed(2)}</span>
                  <button className="shop__add-to-cart">
                    <span className="shop__cart-icon">🛒</span>
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={openSideBarFilter ? "shop__sidebarfilter openFilterSidebar": "shop__sidebarfilter closeFilterSidebar"}>
        <div className="shop__sidebarfilter__title">
          <h1>Filter Option</h1>
          <button onClick={() => setOpenSideBarFilter(false)}><RxExit /></button>
        </div>
        
        <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("price")}>
              Price Range
              <span className="shop__filter-section__arrow">{openSection === "price" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "price" ? "active" : ""}`}>
              <div className="shop__price-range">
                <span>0.0</span>
                <div className="shop__range-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                </div>
                <span>80.00</span>
              </div>
            </div>
          </div>
          {/* Lọc theo Category */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("category")}>
              Shop by Category
              <span className="shop__filter-section__arrow">{openSection === "category" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "category" ? "active" : ""}`}>
              {categories.map((category) => (
                <label key={category} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          {/* Lọc theo nhà xuất bản */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("publisher")}>
              Choose Publisher
              <span className="shop__filter-section__arrow">{openSection === "publisher" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "publisher" ? "active" : ""}`}>
              {publishers.map((publisher) => (
                <label key={publisher} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={publisher}
                    checked={selectedPublishers.includes(publisher)}
                    onChange={() => togglePublisher(publisher)}
                  />
                  {publisher}
                </label>
              ))}
            </div>
          </div>
          {/* Reset Filter */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={handleResetFilter}>
              Reset Filter
            </button>
          </div>
      </div>
    </main>
  )
}

export default Shop

