import { useState } from "react"
import "./home.scss"

const mockBooks = [
  {
    id: 1,
    title: "Cat Adventure",
    description: "Lorem ipsum dolor sit amet",
    category: "Adventure",
    price: 18.78,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Take Tango",
    description: "",
    category: "Dance",
    price: 18.78,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wYZ3NbjFSO29DdKDKHJkcqKBx2Llvb.png",
  },
  {
    id: 3,
    title: "HOMIE",
    description: "DANZE STIMH",
    category: "Home",
    price: 18.78,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "THUNDER STUNT",
    description: "",
    category: "Action",
    price: 18.78,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "A HEAVY LIFT",
    description: "",
    category: "Fitness",
    price: 18.78,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const mockBlogs = [
  {
    id: 1,
    title: "10 Things you must know to improve your reading skills",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "18 July, 2024",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    id: 2,
    title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "7 June, 2024",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    id: 3,
    title: "We Must know why reading is important for children?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "30 May, 2024",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    id: 4,
    title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "24 March, 2024",
    image: "/placeholder.svg?height=250&width=400",
  },
]

const Home = () => {
  const [recommendedBooks] = useState(mockBooks)
  const [saleBooks] = useState(mockBooks)
  const [blogs] = useState(mockBlogs)

  return (
    <main>
      <div className="hero-section">
        <div className="hero-section__content">
          <span className="hero-section__category">BEST MANAGEMENT</span>
          <h1>Think and Grow Rich</h1>
          <p className="hero-section__author">Napoleon Hill | Business & Strategy</p>
          <p className="hero-section__description">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
          </p>
          <div className="hero-section__price-section">
            <span className="current-price">$17.2</span>
            <span className="original-price">$15.25</span>
            <span className="discount">15% OFF</span>
          </div>
          <div className="hero-section__cta-buttons">
            <button className="buy-now">Buy Now</button>
            <button className="see-details">See Details</button>
          </div>
        </div>
      </div>
      <div className="recommended-section">
        <div className="container">
          <h2>Recommended For You</h2>
          <p className="recommended-section__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>

          <div className="recommended-section__product-grid">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="product-card">
                <div className="product-card__image" style={{ backgroundImage: `url(${book.image})` }}>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </div>
                <h4>{book.category}</h4>
                <span className="product-card__price">${book.price.toFixed(2)}</span>
                <button className="product-card__add-to-cart">
                  <span className="cart-icon">🛒</span>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sale-section">
        <div className="container">
          <h2>Books on Sale</h2>
          <div className="sale-section__product-grid">
            {saleBooks.map((book) => (
              <div key={book.id} className="product-card">
                <div className="product-card__image" style={{ backgroundImage: `url(${book.image})` }}>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </div>
                <h4>{book.category}</h4>
                <span className="product-card__price">${book.price.toFixed(2)}</span>
                <button className="product-card__add-to-cart">
                  <span className="cart-icon">🛒</span>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="blog-section">
        <div className="container">
          <h2>Blog Newest</h2>
          <p className="blog-section__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua
          </p>

          <div className="blog-section__grid">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-card">
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="blog-card__image" />
                <div className="blog-card__content">
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <div className="blog-card__date">
                    <span className="calendar-icon">📅</span>
                    {blog.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
