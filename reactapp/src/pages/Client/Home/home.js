import { useEffect, useState } from "react"
import "./home.scss"
import { getBooks } from "../../../service/bookService"
import { addBookToCartForUser } from "../../../service/userService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import HeroSection from "./HeroSection/HeroSection"

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
	const [heroBook, setHeroBooks] = useState({})
	const [recommendedBooks, setRecommendBooks] = useState([])
	const [user] = useState(JSON.parse(sessionStorage.getItem("user")))
	const [saleBooks, setSaleBooks] = useState([])
	const [blogs] = useState(mockBlogs)

	const fetchHeroBook = async () => {
		const rcmBook = await getBooks({
			pin: 1,
			limit: 1, 
			})      
			
		if(rcmBook && +rcmBook.data.status === 1){
			setHeroBooks(rcmBook.data.data[0])
		}
		else{
			setHeroBooks([])
		}
	}

	const fetchBook = async () => {
		const rcmBook = await getBooks({
			pin: 1,
			limit: 5, 
			})      
			console.log(rcmBook.data);
			
		if(rcmBook && +rcmBook.data.status === 1){
			setRecommendBooks(rcmBook.data.data)
		}
		else{
			setRecommendBooks([])
		}
	}

	const fetchSaleBook = async () => {
		const rcmBook = await getBooks({
			limit: 5, 
			})      
			console.log(rcmBook.data);
			
		if(rcmBook && +rcmBook.data.status === 1){
			setSaleBooks(rcmBook.data.data)
		}
		else{
			setSaleBooks([])
		}
	}
	const handleAddToCart = async (bookId, userId) => {    
		const response = await addBookToCartForUser(bookId, userId, 1)

		if(response){
			if(+response.status === 1){
				toast.success(response.message)
				fetchBook()
			}
			else{
				toast.error(response.message)
			}
		}else{
			toast.error(response.message)
		}
	}

	useEffect(() => {
		fetchBook()
		fetchSaleBook()
		fetchHeroBook()
	}, [])

  	return (
		<main>
			<HeroSection/>
			<div className="recommended-section">
				<div className="container">
					<h2 className="container__label">Recommended For You</h2>
					<p className="recommended-section__subtitle">
						For you, passionate readers who love books and appreciate remarkable literary works.
					</p>

					<div className="recommended-section__product-grid">
						{recommendedBooks.map((book) => (
						<div key={book.id} className="product-card">
							<Link to="/bookdetail" state={{id: book.id}} className="product-card__image" style={{ backgroundImage: `url(${book.bookImageUrl})` }}>
							{/* <h3>{book.name}</h3>
							<p>{book.description}</p> */}
							</Link>
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
			<div className="sale-section">
				<div className="container">
					<h2 className="container__label">Books on Sale</h2>
					<div className="sale-section__product-grid">
						{saleBooks.map((book) => (
						<div key={book.id} className="product-card">
							<Link to="/bookdetail" state={{id: book.id}} className="product-card__image" style={{ backgroundImage: `url(${book.bookImageUrl})` }}>
							{/* <h3>{book.name}</h3>
							<p>{book.description}</p> */}
							</Link>
							<h4>{book.name}</h4>
							<span className="product-card__original-price">{book.originalCost.toLocaleString()}đ</span>
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
		</main>
  	)
}

export default Home
