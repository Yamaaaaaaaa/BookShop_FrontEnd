import "./cart.scss"

const mock_items = [
    {
        id: 1,
        name: "Battle Drive",
        price: 27.00,
        quantity: 5
    },
    {
        id: 2,
        name: "Battle Tank",
        price: 22.00,
        quantity: 2
    },
    {
        id: 3,
        name: "Shimmer",
        price: 218.00,
        quantity: 3
    },
    {
        id: 4,
        name: "Conclusion",
        price: 228.00,
        quantity: 4
    }
]

const Cart = () => {
    return (
        <div className="cart">
            <div className="cart-hero">
                <h1>Cart</h1>
            </div>

            <div className="cart-container">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Product name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            mock_items.map(item => (
                                <tr key={item.id}>
                                    <td><img src="https://bookland.dexignzone.com/xhtml/images/books/grid/book12.jpg" alt="Battle Drive" className="product-img"/></td>
                                    <td>{item.name}</td>
                                    <td className="cart_price">${item.price.toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button className="quantity-btn">-</button>
                                            <input type="text" value={item.quantity} className="quantity-input"/>
                                            <button className="quantity-btn">+</button>
                                        </div>
                                    </td>
                                    <td className="cart_price">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td><button className="close-btn">×</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart