import { useEffect, useState } from "react"
import BookScroll from "./BookScroll"
import { getBookData} from "../../../../../service/bookService"
import { toast } from "react-toastify"

function AuthorSlider({ author, onPrev, onNext, currentIndex, totalAuthors }) {
	const [currentBooks, setCurrentBooks] = useState([])
	console.log("Author:", author);
	
	useEffect(() => {
		const fetchAllBooksOfAuthor = async () => {
			const response = await getBookData({authorId: author.id})
			if(response && response.status === 1){
				setCurrentBooks(response.data)
				console.log("Books of Author",response.data);
				toast.success(response.mmessage)
			}
			else toast.error(response.message)
		}
		fetchAllBooksOfAuthor(author.id)
	}, [author.id])
  	return (
		<div className="author-slider">
			{
				author ? 
					<>
						<div className="author-slider__background">
							<img src={author.authorImage || "/placeholder.svg"} alt={author.name} className="author-image" />

							<div className="author-slider__indicators">
								{Array.from({ length: totalAuthors }).map((_, index) => (
									<span key={index} className={`indicator ${index === currentIndex ? "active" : ""}`} />
								))}
							</div>
						</div>

						<div className="author-slider__content">
							{
								(currentBooks && currentBooks.length > 0) ?
								<>
									<div className="author-slider__info">
										<div className="author-slider__category">BEST OF AUTHORS</div>

										<h1 className="author-slider__title">
											{currentBooks[0].name}
										</h1>

										<div className="author-slider__author">
											{author.name} <span className="separator">|</span> {currentBooks[0].Categories[0].name}
										</div>

										<div className="author-slider__description">{currentBooks[0].description}</div>

										<div className="author-slider__price">
											<span className="current-price">${currentBooks[0].sale.toFixed(1)}</span>
											<span className="original-price">${currentBooks[0].originalCost.toFixed(2)}</span>
											<span className="discount-badge">{(100 - (currentBooks[0].sale / currentBooks[0].originalCost) * 100).toFixed(2)}% OFF</span>
										</div>

										<div className="author-slider__actions">
											<button className="btn btn-primary">Buy Now</button>
											<button className="btn btn-outline">See Details</button>
										</div>
									</div>

									<div className="author-slider__books">
										<BookScroll books={currentBooks} />
									</div>
								</>
								:
								<>Loading Books of Author</>
							}
							
						</div>

						<div className="author-slider__navigation">
							<button className="nav-button prev" onClick={onPrev}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
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
							<button className="nav-button next" onClick={onNext}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
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
					</>
				:
				<div className="author-slider__background">
					Loading Best Author
				</div>
			}
			
		</div>
  	)
}

export default AuthorSlider

