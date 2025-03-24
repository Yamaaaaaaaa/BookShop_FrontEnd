import { useRef } from "react"
import "../HeroSection.scss"

function BookScroll({ books }) {
	const scrollRef = useRef(null)

	const handleScroll = (direction) => {
		if (scrollRef.current) {
			const { current } = scrollRef
			const scrollAmount = 300

			if (direction === "left") {
				current.scrollLeft -= scrollAmount
			} else {
				current.scrollLeft += scrollAmount
			}
		}
	}


  	return (
		<>
			{
			(books && books.length > 0) ? 
				<div className="book-scroll">
					<div className="book-scroll__container" ref={scrollRef}>
						{books.map((book, index) => (
						<div className="book-card" key={index}>
							<div className="book-card__image">
								<img src={book.bookImageUrl || "/placeholder.svg"} alt={book.title} />
							</div>
							<div className="book-card__info">
								<h3 className="book-card__title">{book.name}</h3>
								<p className="book-card__author">by {book.Author.name}</p>
								<div className="book-card__price">${book.sale.toFixed(1)}</div>
							</div>
						</div>
						))}
					</div>
			
					<div className="book-scroll__controls">
						<button className="scroll-button left" onClick={() => handleScroll("left")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>
						<button className="scroll-button right" onClick={() => handleScroll("right")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					</div>
				</div>
			:
				<>Loading Current Book</>
		}
		</>
  	)
}

export default BookScroll

