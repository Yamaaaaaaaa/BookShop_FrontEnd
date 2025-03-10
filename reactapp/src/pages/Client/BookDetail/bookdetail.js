import { useState } from "react"
import "./bookdetail.scss"

const relatedBooks = [
    {
        id: 1,
        title: "Terrible Madness",
        author: "Kevin Smiley",
        price: 45.4,
        originalPrice: 98.4,
        image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
        rating: 4.5,
        publisher: "Thriller Press",
        year: 2023,
        categories: ["THRILLER", "DRAMA", "HORROR"],
    },
    {
        id: 2,
        title: "Cosmic Journey",
        author: "Luna Starlight",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
        rating: 4.7,
        publisher: "Galactic Books",
        year: 2024,
        categories: ["SCIENCE FICTION", "ADVENTURE"],
    },
]
const mockBook = {
    id: 1,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 54.78,
    originalPrice: 70.0,
    image: "https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg",
    rating: 4,
    publisher: "Printarea Studios",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    isbn: "121341381648 (ISBN13: 121341381648)",
    language: "English",
    format: "Paperback, 450 Pages",
    tags: ["Drama", "Adventure", "Survival", "Biography", "Trending2024", "Bestseller"],
    categories: ["Self-help", "Personal Development"],
}
const BookDetail = () => {
    const [activeTab, setActiveTab] = useState("details")
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount))
    }

    const renderRating = (rating) => {
        if (rating == null) return "No Rating"
        const fullStars = Math.floor(rating)
        const emptyStars = 5 - fullStars
        return (
            <>
                {"★".repeat(fullStars)}
                {"☆".repeat(emptyStars)} {rating.toFixed(1)}
            </>
        )
    }

    return (
        <div className="book-detail">
            <div className="book-detail__grid">
                <div className="book-detail__image-container">
                    <img src={mockBook.image || "/placeholder.svg"} alt={mockBook.title} className="book-detail__image" />
                </div>

                <div className="book-detail__info">
                    <h1 className="book-detail__title">{mockBook.title}</h1>
                    <div className="book-detail__rating">{renderRating(mockBook.rating)}</div>

                    <div className="book-detail__author-info">
                        <div>
                            <small>Written by</small>
                            <p>{mockBook.author}</p>
                        </div>
                        <div>
                            <small>Publisher</small>
                            <p>{mockBook.publisher}</p>
                        </div>
                        <div>
                            <small>Year</small>
                            <p>{mockBook.year}</p>
                        </div>
                    </div>

                    <p className="book-detail__description">{mockBook.description}</p>

                    <div className="book-detail__price">
                        ${mockBook.price.toFixed(2)}{" "}
                        <span className="book-detail__original-price">${mockBook.originalPrice.toFixed(2)}</span>
                    </div>

                    <div className="book-detail__add-to-cart">
                        <div className="book-detail__quantity">
                            <button onClick={() => handleQuantityChange(-1)}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <button className="book-detail__cart-button">Add To Cart</button>
                    </div>

                    <div className="book-detail__social-share">
                        <a href="#" className="book-detail__social-icon book-detail__social-icon--facebook">
                            f
                        </a>
                        <a href="#" className="book-detail__social-icon book-detail__social-icon--twitter">
                            t
                        </a>
                        <a href="#" className="book-detail__social-icon book-detail__social-icon--whatsapp">
                            w
                        </a>
                        <a href="#" className="book-detail__social-icon book-detail__social-icon--email">
                            e
                        </a>
                    </div>
                </div>
            </div>

            <div className="book-detail__tabs">
                <button
                    className={`book-detail__tab-button ${activeTab === "details" ? "active" : ""}`}
                    onClick={() => setActiveTab("details")}
                >
                    Details Product
                </button>
                <button
                    className={`book-detail__tab-button ${activeTab === "reviews" ? "active" : ""}`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Customer Reviews
                </button>
            </div>

            {activeTab === "details" && (
                <div className="book-detail__product-details">
                    <table className="book-detail__details-table">
                        <tbody>
                            <tr>
                                <td>Book Title</td>
                                <td>{mockBook.title}</td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>{mockBook.author}</td>
                            </tr>
                            <tr>
                                <td>ISBN</td>
                                <td>{mockBook.isbn}</td>
                            </tr>
                            <tr>
                                <td>Edition Language</td>
                                <td>{mockBook.language}</td>
                            </tr>
                            <tr>
                                <td>Book Format</td>
                                <td>{mockBook.format}</td>
                            </tr>
                            <tr>
                                <td>Tags</td>
                                <td>
                                    <div className="book-detail__tags">
                                        {mockBook.tags.map((tag, index) => (
                                            <span key={index} className="book-detail__tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "reviews" && (
                <div className="book-detail__reviews">
                    <p>Customer reviews will be displayed here.</p>
                </div>
            )}
            <div className="book-detail__related-books">
                <h2>RELATED BOOKS</h2>
                <div className="book-detail__book-grid">
                    {relatedBooks.map((book) => (
                        <div key={book.id} className="book-detail__book-card">
                            <img src={book.image || "/placeholder.svg"} alt={book.title} />
                            <h3>{book.title}</h3>
                            <div className="book-detail__categories">{book.categories?.join(", ") || "Unknown"}</div>
                            <div className="book-detail__price">
                                    {book.price != null ? `$${book.price.toFixed(2)}` : "N/A"} 
                                    {book.originalPrice ? <span className="book-detail__original-price">${book.originalPrice.toFixed(2)}</span> : null}
                            </div>
                            <button className="book-detail__cart-button">Add To Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookDetail
