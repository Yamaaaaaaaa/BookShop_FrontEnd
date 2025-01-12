import "./style.css"

const mock_book = {

}
    
const BookDetail = () => {
    
    // C1: Để Setup Những Sách ta Recommend
    // C2: SetUp Full Shop Sách luôn
    return (
        <div class="bookdetail-main">
            <div class="bookdetail-product-grid">
                <div class="bookdetail-product-image-container">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IdA2GFt1ekr4vfiBZnTtYWkIAcSdie.png" alt="Think and Grow Rich Book Cover" class="product-image"/>
                </div>
                
                <div class="bookdetail-product-info">
                    <h1>Think and Grow Rich</h1>
                    <div class="bookdetail-rating">★★★★☆ 4.0</div>
                    
                    <div class="bookdetail-author-info">
                        <div>
                            <small>Written by</small>
                            <p>Kevin Smiley</p>
                        </div>
                        <div>
                            <small>Publisher</small>
                            <p>Printarea Studios</p>
                        </div>
                        <div>
                            <small>Year</small>
                            <p>2019</p>
                        </div>
                    </div>

                    <p class="bookdetail-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <div class="bookdetail-price">
                        $54.78 <span class="bookdetail-original-price">$70.00</span>
                    </div>

                    <div class="bookdetail-add-to-cart">
                        <div class="bookdetail-quantity">
                            <button>-</button>
                            <input type="number" value="1" min="1"/>
                            <button>+</button>
                        </div>
                        <button class="bookdetail-cart-button">Add To Cart</button>
                    </div>

                    <div class="bookdetail-social-share">
                        <a href="#" class="facebook">f</a>
                        <a href="#" class="twitter">t</a>
                        <a href="#" class="whatsapp">w</a>
                        <a href="#" class="email">e</a>
                    </div>
                </div>
            </div>

            <div class="bookdetail-tabs">
                <button class="bookdetail-tab-button active">Details Product</button>
                <button class="bookdetail-tab-button">Customer Reviews</button>
            </div>

            <div class="bookdetail-product-details">
                <table class="bookdetail-details-table">
                    <tr>
                        <td>Book Title</td>
                        <td>Think and Grow Rich</td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td>Napoleon Rich</td>
                    </tr>
                    <tr>
                        <td>ISBN</td>
                        <td>121341381648 (ISBN13: 121341381648)</td>
                    </tr>
                    <tr>
                        <td>Edition Language</td>
                        <td>English</td>
                    </tr>
                    <tr>
                        <td>Book Format</td>
                        <td>Paperback, 450 Pages</td>
                    </tr>
                    <tr>
                        <td>Tags</td>
                        <td>
                            <div class="bookdetail-tags">
                                <span class="bookdetail-tag">Drama</span>
                                <span class="tag">Adventure</span>
                                <span class="tag">Survival</span>
                                <span class="tag">Biography</span>
                                <span class="tag">Trending2024</span>
                                <span class="tag">Bestseller</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="bookdetail-related-books">
                <h2>RELATED BOOKS</h2>
                <div class="bookdetail-book-grid">
                    <div class="bookdetail-book-card">
                        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PoxiSzmwQfD4XbuWiVnIGxraL3aDR4.png" alt="Terrible Madness"/>
                        <h3>Terrible Madness</h3>
                        <div class="bookdetail-categories">THRILLE, DRAMA, HORROR</div>
                        <div class="bookdetail-price">$45.4 <span class="original-price">$98.4</span></div>
                        <button class="bookdetail-cart-button">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail