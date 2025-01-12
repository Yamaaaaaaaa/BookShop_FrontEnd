import "./style.css"
const Home = () => {
    
    // C1: Để Setup Những Sách ta Recommend
    // C2: SetUp Full Shop Sách luôn
    return (
        <main >
            <div className="hero-section">
                <div className="hero-content">
                    <span className="category">BEST MANAGEMENT</span>
                    <h1>Think and Grow Rich</h1>
                    <p className="author">Napoleon Hill | Business & Strategy</p>
                    <p className="description">
                        It is a long established fact that a reader will be distracted by the 
                        readable content of a page when looking at its layout. The point of using 
                        Lorem Ipsum is that it has a more-or-less normal.
                    </p>
                    <div className="price-section">
                        <span className="current-price">$17.2</span>
                        <span className="original-price">$15.25</span>
                        <span className="discount">15% OFF</span>
                    </div>
                    <div className="cta-buttons">
                        <button className="buy-now">Buy Now</button>
                        <button className="see-details">See Details</button>
                    </div>
                </div>
            </div>
            <div className="recommended-section">
                <div className="container">
                    <h2>Recomended For You</h2>
                    <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
                    
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-image">
                                <h3>Cat Adventure</h3>
                                <p>Lorem ipsum dolor sit amet</p>
                            </div>
                            <h4>Adventure</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wYZ3NbjFSO29DdKDKHJkcqKBx2Llvb.png" alt="Take Tango" class="product-image"/>
                            <h4>Take Tango</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image" >
                                <h3>HOMIE</h3>
                                <p>DANZE STIMH</p>
                            </div>
                            <h4>Home</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image">
                                <h3>THUNDER STUNT</h3>
                            </div>
                            <h4>Thunder Stunt</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image">
                                <h3>A HEAVY LIFT</h3>
                            </div>
                            <h4>Heavy Lift</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sale-section">
                <div className="container">
                    <h2>Books on Sale</h2>                    
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-image">
                                <h3>Cat Adventure</h3>
                                <p>Lorem ipsum dolor sit amet</p>
                            </div>
                            <h4>Adventure</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wYZ3NbjFSO29DdKDKHJkcqKBx2Llvb.png" alt="Take Tango" class="product-image"/>
                            <h4>Take Tango</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image" >
                                <h3>HOMIE</h3>
                                <p>DANZE STIMH</p>
                            </div>
                            <h4>Home</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image">
                                <h3>THUNDER STUNT</h3>
                            </div>
                            <h4>Thunder Stunt</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>

                        <div className="product-card">
                            <div className="product-image">
                                <h3>A HEAVY LIFT</h3>
                            </div>
                            <h4>Heavy Lift</h4>
                            <span className="price">$18,78</span>
                            <button className="add-to-cart">
                                <span className="cart-icon">🛒</span>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
            <section class="blog-section">
                <div class="container">
                    <h2>Blog Newest</h2>
                    <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    
                    <div class="blog-grid">
                        <article class="blog-card">
                            <img src="/placeholder.svg?height=250&width=400" alt="Man reading at desk" class="blog-image"/>
                            <div class="blog-content">
                                <h3>10 Things you must know to improve your reading skills</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor</p>
                                <div class="blog-date">
                                    <span class="calendar-icon">📅</span>
                                    18 July, 2024
                                </div>
                            </div>
                        </article>

                        <article class="blog-card">
                            <img src="/placeholder.svg?height=250&width=400" alt="Book closeup" class="blog-image"/>
                            <div class="blog-content">
                                <h3>Benefits of reading: Smart, Diligent, Happy, Intelligent</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor</p>
                                <div class="blog-date">
                                    <span class="calendar-icon">📅</span>
                                    7 June, 2024
                                </div>
                            </div>
                        </article>

                        <article class="blog-card">
                            <img src="/placeholder.svg?height=250&width=400" alt="Woman reading on couch" class="blog-image"/>
                            <div class="blog-content">
                                <h3>We Must know why reading is important for children?</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor</p>
                                <div class="blog-date">
                                    <span class="calendar-icon">📅</span>
                                    30 May, 2024
                                </div>
                            </div>
                        </article>

                        <article class="blog-card">
                            <img src="/placeholder.svg?height=250&width=400" alt="Woman in library" class="blog-image"/>
                            <div class="blog-content">
                                <h3>Benefits of reading: Smart, Diligent, Happy, Intelligent</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor</p>
                                <div class="blog-date">
                                    <span class="calendar-icon">📅</span>
                                    24 March, 2024
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home