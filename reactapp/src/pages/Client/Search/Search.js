import { useEffect, useState } from "react"
import "../Shop/shop.scss"
import { Link, useLocation } from "react-router-dom"
import { getBooks } from "../../../service/bookService";


const Search = () => {
    const location = useLocation()
    const keyword = location.state?.keyword
    console.log(keyword);
    
    const [books, setBooks] = useState([])

    const [favorites, setFavorites] = useState([])
    const toggleFavorite = (bookId) => {
        setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
    }
  
    // Lấy các Data Ban đầu
    useEffect(() => {
        const fetchInitialBook = async () => {
            try {
                const rcmBook = await getBooks({
                    keyword: keyword
                });
                if (rcmBook?.data?.data) {
                    setBooks(rcmBook.data.data);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchInitialBook();
    }, [keyword]);
    

    return (
    <main className="shop">
        <div className="shop__container">
            <div className="shop__books-section">
                <div className="shop__books-header">
                    <h1>Search Results</h1>
                    <div className="shop__view-options">
                        <select>
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                <div className="shop__books-grid">
                    {books.map((book) => (
                        <Link to="/bookdetail" key={book.id} className="shop__book-card">
                            <div className="shop__book-image">
                                <img src={book.bookImageUrl} alt={book.name} />
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
                                <h3 className="shop__book-title">{book.name}</h3>
                                {/* <span className="shop__book-price">${book.sale.toFixed(2)}</span> */}
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
    </main>
  )
}

export default Search

