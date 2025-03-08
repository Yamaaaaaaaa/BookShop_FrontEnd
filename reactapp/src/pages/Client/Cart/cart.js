import { useEffect, useState } from "react"
import "./cart.scss"
import { getCartForUser, updateCartForUser } from "../../../service/userService"
import { toast } from "react-toastify"


const Cart = () => {
    const [userCart, setUserCart] = useState([])
    const userID = JSON.parse(sessionStorage.getItem("user")).id
    console.log("userID", userID);


    const getCart = async () => {
        const responseGetCart = await getCartForUser(userID)
        console.log("responseGetCart", responseGetCart);
        
        if(responseGetCart && responseGetCart.status === 1 && responseGetCart.data){
            setUserCart(responseGetCart.data)
            console.log("userCart",responseGetCart.data);
        }else{
            setUserCart([])
        }
    }
    const handleUpdateCart = async (cartID, action) => {
        const response = await updateCartForUser(cartID, action)
        console.log("Response Update Cart: ", response);
        
        if(response){
            if(+response.status === 1) 
            {
                toast.success(response.message);
                getCart()
            }
            else {
                toast.error(response.message);
            }
        }
        else 
        {
            toast.error(response.message);
        }
    }

    

    useEffect(() => {
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
                                            <button className="quantity-btn" disabled={item.quantity === 0} onClick={() => handleUpdateCart(item.id, "down")}>-</button>
                                            <input type="text" value={item.quantity} className="quantity-input"/>
                                            <button className="quantity-btn" disabled={item.quantity + 1 >= item.Book.stock} onClick={() => handleUpdateCart(item.id, "up")}>+</button>
                                        </div>
                                    </td>
                                    <td className="cart_price">${(item.Book.sale * item.quantity).toFixed(2)}</td>
                                    <td><button className="close-btn" onClick={() => handleUpdateCart(item.id, "delete")}>×</button></td>
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