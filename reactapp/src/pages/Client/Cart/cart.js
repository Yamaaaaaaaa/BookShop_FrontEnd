import { useEffect, useState } from "react"
import "./cart.scss"
import { getCartforUser } from "../../../service/userService"

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
    const [userCart, setUserCart] = useState([])
    const userID = JSON.parse(sessionStorage.getItem("user")).id
    console.log("userID", userID);
    
    useEffect(() => {
        const getCart = async () => {
            const responseGetCart = await getCartforUser(userID)
            console.log("responseGetCart", responseGetCart);
            
            if(responseGetCart && responseGetCart.status === 1 && responseGetCart.data){
                setUserCart(responseGetCart.data)
                console.log("userCart",responseGetCart.data);
            }else{
                setUserCart([])
            }
        }
        getCart()
    }, [userID])
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
                            userCart.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.Book.bookImageUrl} alt="Battle Drive" className="product-img"/></td>
                                    <td>{item.Book.name}</td>
                                    <td className="cart_price">${item.Book.sale.toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button className="quantity-btn">-</button>
                                            <input type="text" value={item.quantity} className="quantity-input"/>
                                            <button className="quantity-btn">+</button>
                                        </div>
                                    </td>
                                    <td className="cart_price">${(item.Book.sale * item.quantity).toFixed(2)}</td>
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