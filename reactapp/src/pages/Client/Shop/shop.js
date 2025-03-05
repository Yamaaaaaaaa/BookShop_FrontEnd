import { useEffect, useState } from "react"
import "./shop.scss"
import { Link } from "react-router-dom"
import { RxExit } from "react-icons/rx";
import { getBooks } from "../../../service/bookService";
import { getAllCategories } from "../../../service/categoryService";
import { getAllPublisher } from "../../../service/publisherService";


const Shop = () => {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [publishers, setPublishers] = useState([])

    //Lọc
    const [filteredBooks, setFilterBooks] = useState([])
    const [openSection, setOpenSection] = useState("price")
    const [priceRange, setPriceRange] = useState(0)
    const [favorites, setFavorites] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedPublishers, setSelectedPublishers] = useState([])
    const [openSideBarFilter, setOpenSideBarFilter] = useState(false)

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section)
    }
    const toggleFavorite = (bookId) => {
        setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
    }
    const handleResetFilter = () => {
        setPriceRange(0)
        setSelectedCategories([])
        setSelectedPublishers([])
    }
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
        )
    }
    const togglePublisher = (publisher) => {
        setSelectedPublishers((prev) =>
            prev.includes(publisher) ? prev.filter((p) => p !== publisher) : [...prev, publisher],
        )
    }
  
    // Lấy các Data Ban đầu
    useEffect(() => {
        const fetchInitialBook = async () => {
            try {
                const rcmBook = await getBooks();
                if (rcmBook?.data?.data) {
                    setBooks(rcmBook.data.data);
                    setFilterBooks(rcmBook.data.data);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
    
        const fetchCategories = async () => {
            try {
                const listCategories = await getAllCategories();
                if (listCategories?.data?.data) {
                    setCategories(listCategories.data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        const fetchPublishers = async () => {
            try {
                const listPublishers = await getAllPublisher();
                if (listPublishers?.data?.data) {
                    setPublishers(listPublishers.data.data);
                }
            } catch (error) {
                console.error("Error fetching publishers:", error);
            }
        };
    
        fetchInitialBook();
        fetchCategories();
        fetchPublishers();
    }, []);
    

    useEffect(() => {
        // if (books.length === 0) return;
    
        const handle_FilterBook = () => {
            // console.log("Filtered: ", selectedCategories, selectedPublishers);
            const filter = books.filter((book) => {
                // Chờ thay lại cái pricerange rồi bật lên
                // if (book.sale < priceRange) return true;
    
                if (selectedCategories.length > 0) {
                    const book_cates = book.Categories ? book.Categories.map(cate => cate.name) : [];
                    if (!selectedCategories.some(cate => book_cates.includes(cate))) return false;
                }
    
                if (selectedPublishers.length > 0 && !selectedPublishers.includes(book.Publisher?.name)) {
                    return false;
                }
    
                return true;
            });
            // console.log("Filtered Book: ", filter);
            
            setFilterBooks(filter);
        };
    
        handle_FilterBook();
    }, [books, priceRange, selectedCategories, selectedPublishers]);
    
  

    

    return (
    <main className="shop">
        <div className="shop__container">
            <aside className="shop__sidebar">
                <h2>Filter Options</h2>

                {/* Chọn khoảng giá */}
                <div className="shop__filter-section">
                    <button className="shop__filter-section__section-header" onClick={() => toggleSection("price")}>
                        Price Range
                        <span className="shop__filter-section__arrow">{openSection === "price" ? "▼" : "▶"}</span>
                    </button>
                    <div className={`shop__section-content ${openSection === "price" ? "active" : ""}`}>
                        <div className="shop__price-range">
                            <span>0.0</span>
                                <div className="shop__range-slider">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                    />
                                </div>
                            <span>80.00</span>
                        </div>
                    </div>
                </div>
                
                {/* Lọc theo Category */}
                <div className="shop__filter-section">
                    <button className="shop__filter-section__section-header" onClick={() => toggleSection("category")}>
                        Shop by Category
                        <span className="shop__filter-section__arrow">{openSection === "category" ? "▼" : "▶"}</span>
                    </button>
                    <div className={`shop__section-content ${openSection === "category" ? "active" : ""}`}>
                        {categories.map((category) => (
                            <label key={category.name} className="shop__checkbox-label">
                            <input
                                type="checkbox"
                                value={category.name}
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => toggleCategory(category.name)}
                            />
                            {category.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Lọc theo nhà xuất bản */}
                <div className="shop__filter-section">
                    <button className="shop__filter-section__section-header" onClick={() => toggleSection("publisher")}>
                        Choose Publisher
                        <span className="shop__filter-section__arrow">{openSection === "publisher" ? "▼" : "▶"}</span>
                    </button>
                    <div className={`shop__section-content ${openSection === "publisher" ? "active" : ""}`}>
                        {publishers.map((publisher) => (
                            <label key={publisher.name} className="shop__checkbox-label">
                                <input
                                    type="checkbox"
                                    value={publisher.name}
                                    checked={selectedPublishers.includes(publisher.name)}
                                    onChange={() => togglePublisher(publisher.name)}
                                />
                                {publisher.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Reset Filter */}
                <div className="shop__filter-section">
                    <button className="shop__filter-section__section-header" onClick={handleResetFilter}>
                        Reset Filter
                    </button>
                </div>
            </aside>

            <div className="shop__books-section">
                <div className="shop__books-header">
                    <h1>Books</h1>
                    <div className="shop__view-options">
                        <select>
                            <option>Categories</option>
                        </select>
                        <select>
                            <option>Newest</option>
                        </select>
                        <button onClick={() => setOpenSideBarFilter(true)}>
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                <div className="shop__books-grid">
                    {filteredBooks.map((book) => (
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


      <div className={openSideBarFilter ? "shop__sidebarfilter openFilterSidebar": "shop__sidebarfilter closeFilterSidebar"}>
        <div className="shop__sidebarfilter__title">
          <h1>Filter Option</h1>
          <button onClick={() => setOpenSideBarFilter(false)}><RxExit /></button>
        </div>
        
        <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("price")}>
              Price Range
              <span className="shop__filter-section__arrow">{openSection === "price" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "price" ? "active" : ""}`}>
              <div className="shop__price-range">
                <span>0.0</span>
                <div className="shop__range-slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                </div>
                <span>80.00</span>
              </div>
            </div>
          </div>
          {/* Lọc theo Category */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("category")}>
              Shop by Category
              <span className="shop__filter-section__arrow">{openSection === "category" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "category" ? "active" : ""}`}>
              {categories.map((category) => (
                <label key={category.name} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
          {/* Lọc theo nhà xuất bản */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={() => toggleSection("publisher")}>
              Choose Publisher
              <span className="shop__filter-section__arrow">{openSection === "publisher" ? "▼" : "▶"}</span>
            </button>
            <div className={`shop__section-content ${openSection === "publisher" ? "active" : ""}`}>
              {publishers.map((publisher) => (
                <label key={publisher.name} className="shop__checkbox-label">
                  <input
                    type="checkbox"
                    value={publisher.name}
                    checked={selectedPublishers.includes(publisher.name)}
                    onChange={() => togglePublisher(publisher.name)}
                  />
                  {publisher.name}
                </label>
              ))}
            </div>
          </div>
          {/* Reset Filter */}
          <div className="shop__filter-section">
            <button className="shop__filter-section__section-header" onClick={handleResetFilter}>
              Reset Filter
            </button>
          </div>
      </div>
    </main>
  )
}

export default Shop

