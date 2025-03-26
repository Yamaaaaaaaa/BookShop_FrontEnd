import { useEffect, useState } from "react";
import "./bookdetail.scss";
import { useLocation } from "react-router-dom";
import { getABooks } from "../../../service/bookService";
import { toast } from "react-toastify";
import { addBookToCartForUser } from "../../../service/userService";

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
];

const BookDetail = () => {
    const params = useLocation();
    const bookId = params.state?.id;
    const userId = JSON.parse(sessionStorage.getItem("user"))?.id
    const [activeTab, setActiveTab] = useState("details");
    const [quantity, setQuantity] = useState(1);
    const [bookData, setBookData] = useState({
        name: "Unknown",
        Author: { name: "Unknown" },
        Publisher: { name: "Unknown" },
        sale: 0,
        originalCost: 0,
        description: "No description available.",
        bookImageUrl: "/placeholder.svg",
    });

    const fetchBook = async () => {
        try {
            const response = await getABooks({ id: bookId });
            if (response?.status === 1) {
                setBookData(response.data);
                toast.success(response.message);
            } else {
                toast.error("Failed to get book data");
            }
        } catch (error) {
            toast.error("Error fetching book data");
        }
    };

    const handleAddtoCard = async (e) => {
        const response = await addBookToCartForUser(bookId, userId, quantity)

        if(response){
            if(+response.status === 1){
                toast.success(response.message)
                fetchBook()
            }
            else{
                toast.error(response.message)
            }
            
        }
        else toast.error(response.message)
    }

    useEffect(() => {
        if (!bookId) {
            toast.error("Book ID is missing");
            return;
        }
        fetchBook();
    }, [bookId]);

    return (
        <div className="book-detail">
            <div className="book-detail__grid">
                <div className="book-detail__image-container">
                    <img
                        src={bookData.bookImageUrl || "/placeholder.svg"}
                        alt={bookData.name}
                        className="book-detail__image"
                    />
                </div>

                <div className="book-detail__info">
                    <h1 className="book-detail__title">{bookData.name}</h1>
                    <div className="book-detail__author-info">
                        <div>
                            <small>Written by</small>
                            <p>{bookData?.Author?.name || "Unknown Author"}</p>
                        </div>
                        <div>
                            <small>Publisher</small>
                            <p>{bookData?.Publisher?.name || "Unknown Publisher"}</p>
                        </div>
                    </div>

                    <p className="book-detail__description">{bookData.description}</p>

                    <div className="book-detail__price">
                        ${bookData.sale?.toFixed(2)}{" "}
                        <span className="book-detail__original-price">${bookData.originalCost?.toFixed(2)}</span>
                    </div>

                    <div className="book-detail__add-to-cart">
                        <div className="book-detail__quantity">
                            <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        </div>
                        <button className="book-detail__cart-button" onClick={(e) => handleAddtoCard(e)}>Add To Cart</button>
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
                                <td>{bookData.name}</td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>{bookData?.Author?.name || "Unknown Author"}</td>
                            </tr>
                            <tr>
                                <td>Publisher</td>
                                <td>{bookData?.Publisher?.name || "Unknown Publisher"}</td>
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
                                {book.price != null ? `$${book.price.toFixed(2)}` : "N/A"}{" "}
                                {book.originalPrice ? (
                                    <span className="book-detail__original-price">${book.originalPrice.toFixed(2)}</span>
                                ) : null}
                            </div>
                            <button className="book-detail__cart-button">Add To Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
