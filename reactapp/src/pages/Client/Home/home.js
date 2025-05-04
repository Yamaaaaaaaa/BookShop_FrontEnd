import { useCallback, useEffect, useState } from "react"
import "./home.scss"
import { getBooks } from "../../../service/bookService"
import { addBookToCartForUser } from "../../../service/userService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import HeroSection from "./HeroSection/HeroSection"
import Footer from "./Footer/Footer"

import useEmblaCarousel from 'embla-carousel-react'

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

	const options = { loop: true }
	const SLIDE_COUNT = 5
	const slides = Array.from(Array(SLIDE_COUNT).keys())

	const [emblaRef, emblaApi] = useEmblaCarousel(options)
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi)
  	return (
		<main>
			<HeroSection/>
			<div className="recommended-section">
				<div className="container">
					<h2 className="container__label_1">Recommended For You</h2>
					<p className="recommended-section__subtitle">
						For you, passionate readers who love books and appreciate remarkable literary works.
					</p>


					{/* <section className="embla">
						<div className="embla__viewport" ref={emblaRef}>
							<div className="embla__container">
							{slides.map((index) => (
								<div className="embla__slide" key={index}>
								<div className="embla__slide__number">{index + 1}</div>
								</div>
							))}
							</div>
						</div>

						<div className="embla__controls">
							<div className="embla__buttons">
								<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
								<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
							</div>
						</div>
					</section> */}

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
					<h2 className="container__label_2">Books on Sale</h2>
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
			<Footer/>
		</main>
  	)
}

const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}

export default Home
