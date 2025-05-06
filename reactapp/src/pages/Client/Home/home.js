"use client"

import { useEffect, useState } from "react"
import "./home.scss"
import { getBooks } from "../../../service/bookService"
import { addBookToCartForUser } from "../../../service/userService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import HeroSection from "./HeroSection/HeroSection"
import FeaturesSection from "./FeatureSection/FeatureSection"
import Footer from "./Footer/Footer"
import { Star } from "lucide-react"

const Home = () => {
  const [heroBook, setHeroBooks] = useState({})
  const [recommendedBooks, setRecommendBooks] = useState([])
  const [user] = useState(JSON.parse(sessionStorage.getItem("user")))
  const [saleBooks, setSaleBooks] = useState([])
  const [blogs, setBlogs] = useState([])
  const [visibleBooks, setVisibleBooks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const booksPerSlide = window.innerWidth >= 768 ? 5 : 1

  const fetchHeroBook = async () => {
    const rcmBook = await getBooks({
      pin: 1,
      limit: 1,
    })

    if (rcmBook && +rcmBook.data.status === 1) {
      setHeroBooks(rcmBook.data.data[0])
    } else {
      setHeroBooks([])
    }
  }

  const fetchBook = async () => {
    const rcmBook = await getBooks({
      pin: 1,
      limit: 5,
    })
    console.log(rcmBook.data)

    if (rcmBook && +rcmBook.data.status === 1) {
      setRecommendBooks(rcmBook.data.data)
    } else {
      setRecommendBooks([])
    }
  }

  const fetchSaleBook = async () => {
    const rcmBook = await getBooks({
      limit: 10,
    })
    console.log("sale: ", rcmBook.data)

    if (rcmBook && +rcmBook.data.status === 1) {
      setSaleBooks(rcmBook.data.data)
    } else {
      setSaleBooks([])
    }
  }

  const handleAddToCart = async (bookId, userId) => {
    const response = await addBookToCartForUser(bookId, userId, 1)

    if (response) {
      if (+response.status === 1) {
        toast.success(response.message)
        fetchBook()
      } else {
        toast.error(response.message)
      }
    } else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    fetchBook()
    fetchSaleBook()
    fetchHeroBook()
  }, [])

  useEffect(() => {
    // Update visible books whenever saleBooks or currentIndex changes
    if (saleBooks.length > 0) {
      const endIndex = Math.min(currentIndex + booksPerSlide, saleBooks.length)
      setVisibleBooks(saleBooks.slice(currentIndex, endIndex))
    }
  }, [saleBooks, currentIndex, booksPerSlide])

  // Navigation functions
  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(0, prev - booksPerSlide)
      return newIndex
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(saleBooks.length - booksPerSlide, prev + booksPerSlide)
      return newIndex
    })
  }

  return (
    <main>
      <HeroSection />
      <div className="recommended-section">
        <div className="container">
          <h2 className="container__label_1">Recommended For You</h2>
          <p className="recommended-section__subtitle">
            For you, passionate readers who love books and appreciate remarkable literary works.
          </p>

          <div className="recommended-section__product-grid">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="product-card">
                <Link
                  to="/bookdetail"
                  state={{ id: book.id }}
                  className="product-card__image"
                  style={{ backgroundImage: `url(${book.bookImageUrl})` }}
                ></Link>
                <h4>{book.name}</h4>
                <span className="product-card__price">{book.sale.toLocaleString()}đ</span>
                <button className="product-card__add-to-cart" onClick={() => handleAddToCart(book.id, user.id)}>
                  <span className="cart-icon">🛒</span>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Books on Sale Section */}
      <div className="books-on-sale">
        <div className="books-on-sale__container">
          <div className="books-on-sale__header">
            <h2 className="books-on-sale__title">Books on Sale</h2>

            <div className="books-on-sale__navigation">
              <button className="books-on-sale__nav-button books-on-sale__nav-button--prev" onClick={prevSlide}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="books-on-sale__dots">
                {[...Array(Math.ceil(saleBooks.length / booksPerSlide))].map((_, i) => (
                  <span
                    key={i}
                    className={`books-on-sale__dot ${i === Math.floor(currentIndex / booksPerSlide) ? "books-on-sale__dot--active" : ""}`}
                    onClick={() => setCurrentIndex(i * booksPerSlide)}
                  ></span>
                ))}
              </div>

              <button className="books-on-sale__nav-button books-on-sale__nav-button--next" onClick={nextSlide}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="books-on-sale__slider">
            {saleBooks.slice(currentIndex, currentIndex + booksPerSlide).map((book) => (
              <div key={book.id} className="book-item">
                <Link to="/bookdetail" state={{ id: book.id }} className="book-item__image-link">
                  <img src={book.bookImageUrl || "/placeholder.svg"} alt={book.name} className="book-item__image" />
                </Link>
                <h3 className="book-item__title">{book.name}</h3>

                <div className="book-item__categories">
                  {book.Categories.map((cate, idx) => (
                    <p key={idx}>- {cate.name}</p>
                  ))}
                </div>
                <div className="book-item__ctn-rating">
                  <div className="book-item__rating">
                    <Star className="book-item__star" />
                    <span>{book.Book_Comments[0]?.rating || 5}</span>
                  </div>
                  <div className="book-item__price">
                    <span className="book-item__current-price">${(book.sale / 23000).toFixed(1)}</span>
                    <span className="book-item__original-price">${(book.originalCost / 23000).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Home
