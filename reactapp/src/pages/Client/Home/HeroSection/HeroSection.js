import { useEffect, useState } from "react"
import AuthorSlider from "./components/AuthorSlide"
import BookScroll from "./components/BookScroll"
import { authors } from "./mockdata"
import "./HeroSection.scss"
import { getAllAuthor } from "../../../../service/authorService"
import { toast } from "react-toastify"
import PartnerLogos from "./components/PartnerLogos"
const authorDemo = {
  name: "Napoleon Hill",
  authorImage: "https://1.bp.blogspot.com/-bn1T1J66g4U/Xln98cp7R_I/AAAAAAAAPG8/qLYQIUmHJ-QqTyw1aEGs3oSrlGoCASwoQCLcBGAsYHQ/s1600/Eiichiro%2BOda%2Bterbaru.jpg",
  books: [
    {
      name: "Think and Grow Rich",
      Categories: ["Business ", "Straegy"],
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      originalCost: 15.25,
      sale: 9.5,
      imageBookUrl: "https://1.bp.blogspot.com/-bn1T1J66g4U/Xln98cp7R_I/AAAAAAAAPG8/qLYQIUmHJ-QqTyw1aEGs3oSrlGoCASwoQCLcBGAsYHQ/s1600/Eiichiro%2BOda%2Bterbaru.jpg",
    },
    {
      name: "Think and Grow Rich",
      Categories: ["Business ", "Straegy"],
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      originalCost: 15.25,
      sale: 9.5,
      imageBookUrl: "https://1.bp.blogspot.com/-bn1T1J66g4U/Xln98cp7R_I/AAAAAAAAPG8/qLYQIUmHJ-QqTyw1aEGs3oSrlGoCASwoQCLcBGAsYHQ/s1600/Eiichiro%2BOda%2Bterbaru.jpg",
    },
    {
      name: "Think and Grow Rich",
      Categories: ["Business ", "Straegy"],
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      originalCost: 15.25,
      sale: 9.5,
      imageBookUrl: "https://1.bp.blogspot.com/-bn1T1J66g4U/Xln98cp7R_I/AAAAAAAAPG8/qLYQIUmHJ-QqTyw1aEGs3oSrlGoCASwoQCLcBGAsYHQ/s1600/Eiichiro%2BOda%2Bterbaru.jpg",
    },
    {
      name: "Think and Grow Rich",
      Categories: ["Business ", "Straegy"],
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      originalCost: 15.25,
      sale: 9.5,
      imageBookUrl: "https://1.bp.blogspot.com/-bn1T1J66g4U/Xln98cp7R_I/AAAAAAAAPG8/qLYQIUmHJ-QqTyw1aEGs3oSrlGoCASwoQCLcBGAsYHQ/s1600/Eiichiro%2BOda%2Bterbaru.jpg",
    },
  ],
}
function HeroSection() {
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0)
  const [authorData, setAuthorData] = useState([])

  const fetchAuthors = async () => {
    try {
      const listAuthors = await getAllAuthor()
      if (listAuthors && listAuthors.status === 1) {
        setAuthorData(listAuthors.data)
        console.log("All Authors: ", listAuthors.data)
        toast.success(listAuthors.message)
        return
      } else {
        toast.error(listAuthors.message)
        setAuthorData([])
      }
    } catch (error) {
      toast.error("Error fetching authors:", error)
    }
  }

  const handlePrev = () => {
    setCurrentAuthorIndex((prev) => (prev === 0 ? authorData.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentAuthorIndex((prev) => (prev === authorData.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    fetchAuthors()
  }, [])
  return (
    <div className="book-app">
      <div className="book-app-container">
        <AuthorSlider
          author={authorData[currentAuthorIndex] ? authorData[currentAuthorIndex] : authorDemo}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={currentAuthorIndex}
          totalAuthors={authorData.length}
        />
        <PartnerLogos />
      </div>
    </div>
  )
}

export default HeroSection

