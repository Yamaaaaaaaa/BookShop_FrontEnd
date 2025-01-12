import { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const books = [
  {
    id: 1,
    title: 'Thunder Stunt',
    price: 20.11,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DECGAFw4lLuzh85VEVEwZexuOUmLPA.png'
  },
  {
    id: 2,
    title: 'Battler Drive', 
    price: 20.12,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cETOqCqBlA0JtM6j1ZRf09jSy5hQ56.png'
  },
  {
    id: 3,
    title: 'Take Out Tango',
    price: 20.22,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png'
  },
  {
    id: 4,
    title: 'Take Out Tango',
    price: 20.33,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png'
  },
  {
    id: 5,
    title: 'Take Out Tango',
    price: 20.4,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png'
  },
  {
    id: 6,
    title: 'Take Out Tango',
    price: 20.55,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png'
  },
  {
    id: 7,
    title: 'Take Out Tango',
    price: 20.8,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSwgSxohZGwqcwHyLgMhOHBNgVhr1i.png'
  }
]

const categories = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy']
const publishers = ['Publisher A', 'Publisher B', 'Publisher C']

const Shop = () => {
  const [openSection, setOpenSection] = useState('price')
  const [priceRange, setPriceRange] = useState(50)
  const [favorites, setFavorites] = useState([])

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    )
  }
  const handleResetFilter= () => {

  }
  return (
    <main className="shop">
      <div className="shop-container main-content">
        <aside className="sidebar">
          <h2>Filter Option</h2>
          
          <div className="filter-section">
            <button 
              className="section-header" 
              onClick={() => toggleSection('price')}
            >
              Price Range
              <span className="arrow">
                {openSection === 'price' ? '▼' : '▶'}
              </span>
            </button>
            <div className={`section-content ${openSection === 'price' ? 'active' : ''}`}>
              <div className="price-range">
                <span>0.0</span>
                <div className="range-slider">
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
          <div className="filter-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('category')}
            >
              Shop by Category
              <span className="arrow">
                {openSection === 'category' ? '▼' : '▶'}
              </span>
            </button>
            <div className={`section-content ${openSection === 'category' ? 'active' : ''}`}>
              {categories.map(category => (
                <label key={category} className="checkbox-label">
                  <input type="checkbox" value={category} />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('publisher')}
            >
              Choose Publisher
              <span className="arrow">
                {openSection === 'publisher' ? '▼' : '▶'}
              </span>
            </button>
            <div className={`section-content ${openSection === 'publisher' ? 'active' : ''}`}>
              {publishers.map(publisher => (
                <label key={publisher} className="checkbox-label">
                  <input type="checkbox" value={publisher} />
                  {publisher}
                </label>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <button 
              className="section-header"
              onClick={() => handleResetFilter()}
            >
              Reset Filter
            </button>
          </div>
        </aside>

        <div className="books-section">
          <div className="books-header">
            <h1>Books</h1>
            <div className="view-options">
              <select>
                <option>Categories</option>
              </select>
              <select>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="books-grid">
            {books.map(book => (
              <Link to="/bookdetail" key={book.id} className="book-card">
                <div className="book-image">
                  <img src={book.image} alt={book.title} />
                  <button 
                    className={`favorite-button ${favorites.includes(book.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(book.id)}
                  >
                    ❤️
                  </button>
                </div>
                
                <div className="book-info">
                  <span className="title"><h3>{book.title}</h3></span>
                  <span className="price">${book.price}</span>
                  <button className="add-to-cart">
                      <span className="cart-icon">🛒</span>
                      Add To Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Shop