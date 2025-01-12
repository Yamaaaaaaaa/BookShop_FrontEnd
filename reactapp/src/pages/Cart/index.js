import "./style.css"

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
    
    // C1: Để Setup Những Sách ta Recommend
    // C2: SetUp Full Shop Sách luôn
    return (
        <div class="cart-main">
            <div class="cart-hero">
                <h1>Cart</h1>
            </div>

            <div class="cart-container">
                <table class="cart-table">
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
                                <tr>
                                    <td><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gePMbyniirM8evxLDQqDBRqvBrVjb7.png" alt="Battle Drive" class="product-img"/></td>
                                    <td>{item.name}</td>
                                    <td class="price">${item.price}</td>
                                    <td>
                                        <div class="quantity-control">
                                            <button class="quantity-btn">-</button>
                                            <input type="text" value={item.quantity} class="quantity-input"/>
                                            <button class="quantity-btn">+</button>
                                        </div>
                                    </td>
                                    <td class="price">{item.price * item.quantity}</td>
                                    <td><button class="close-btn">×</button></td>
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