import { useEffect, useState } from "react"
import "./home.scss"
import { getBooks } from "../../../service/bookService"

const mockBooks = [
  {
    id: 1,
    title: "Cat Adventure",
    description: "Lorem ipsum dolor sit amet",
    category: "Adventure",
    price: 18.78,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 2,
    title: "Take Tango",
    description: "",
    category: "Dance",
    price: 18.78,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 3,
    title: "HOMIE",
    description: "DANZE STIMH",
    category: "Home",
    price: 18.78,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 4,
    title: "THUNDER STUNT",
    description: "",
    category: "Action",
    price: 18.78,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 5,
    title: "A HEAVY LIFT",
    description: "",
    category: "Fitness",
    price: 18.78,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
]

const mockBlogs = [
  {
    id: 1,
    title: "10 Things you must know to improve your reading skills",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "18 July, 2024",
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 2,
    title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "7 June, 2024",
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 3,
    title: "We Must know why reading is important for children?",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "30 May, 2024",
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
  {
    id: 4,
    title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
    date: "24 March, 2024",
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
  },
]

const Home = () => {
  const [recommendedBooks, setRecommendBooks] = useState([])
  const [saleBooks] = useState(mockBooks)
  const [blogs] = useState(mockBlogs)

  useEffect(() => {
    const fetchBook = async () => {
      const rcmBook = await getBooks({
        pin: 1,
        limit: 5, 
      })      
      console.log(rcmBook.data);
      
      if(rcmBook){
        setRecommendBooks(rcmBook.data.data)
      }
    }
    fetchBook()
  }, [])

  return (
    <main>
      <div className="hero-section">
        <div className="hero-section__content">
          <span className="hero-section__content__category">BEST MANAGEMENT</span>
          <h1 className="hero-section__content__title">Think and Grow Rich</h1>
          <p className="hero-section__content__author">Napoleon Hill | Business & Strategy</p>
          <p className="hero-section__content__description">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
          </p>
          <div className="hero-section__content__price-section">
            <span className="hero-section__content__price-section__current-price">$17.2</span>
            <span className="hero-section__content__price-section__original-price">$15.25</span>
            <span className="hero-section__content__price-section__discount">15% OFF</span>
          </div>
          <div className="hero-section__content__cta-buttons">
            <button className="hero-section__content__cta-buttons__buy-now">Buy Now</button>
            <button className="hero-section__content__cta-buttons__see-details">See Details</button>
          </div>
        </div>
      </div>

      <div className="recommended-section">
        <div className="container">
          <h2 className="container__label">Recommended For You</h2>
          <p className="recommended-section__subtitle">
            For you, passionate readers who love books and appreciate remarkable literary works.
          </p>

          <div className="recommended-section__product-grid">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="product-card">
                <div className="product-card__image" style={{ backgroundImage: `url(${book.bookImageUrl})` }}>
                  {/* <h3>{book.name}</h3>
                  <p>{book.description}</p> */}
                </div>
                <h4>{book.name}</h4>
                <span className="product-card__price">${book.sale.toFixed(2)}</span>
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
          <h2 className="container__label">Books on Sale</h2>
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
