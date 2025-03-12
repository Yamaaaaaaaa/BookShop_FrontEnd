import { useEffect, useState } from "react"
import "./cart.scss"
import { createBillForUser, getCartForUser, getPaymentMethod, updateCartForUser } from "../../../service/userService"
import { toast } from "react-toastify"
import { RiBankFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const Cart = () => {
    const [userCart, setUserCart] = useState([])
    const [selectedItems, setSelectedItems] = useState({})
    const [paymentMethod, setPaymentMethod] = useState({})
    const [paymentMethods, setPaymentMethods] = useState([])
    const user = sessionStorage.getItem("user")
    const userID = JSON.parse(sessionStorage.getItem("user"))?.id || ""

    const getCart = async () => {
        const responseGetCart = await getCartForUser(userID)
        
        if(responseGetCart && responseGetCart.status === 1 && responseGetCart.data){
            setUserCart(responseGetCart.data)
            // Initialize selected items
            const initialSelected = {}
            responseGetCart.data.forEach(item => {
                initialSelected[item.id] = false
            })
            setSelectedItems(initialSelected)
        } else {
            setUserCart([])
        }
    }
    const fetchAllPaymentMethod = async () => {
        const responseGetPayment = await getPaymentMethod()
        if(responseGetPayment && responseGetPayment.status === 1 && responseGetPayment.data){
            setPaymentMethods(responseGetPayment.data)
            console.log(responseGetPayment.data);
            
            toast.success(responseGetPayment.message)
            return
        } else {
            toast.error(responseGetPayment.message)
            setPaymentMethods([])
            return
        }
    }
    const handleUpdateCart = async (cartID, action) => {
        const response = await updateCartForUser(cartID, action)
        
        if(response){
            if(+response.status === 1) 
            {
                toast.success(response.message)
                getCart()
            }
            else {
                toast.error(response.message)
            }
        }
        else 
        {
            toast.error("Failed to update cart")
        }
    }

    const toggleItemSelection = (itemId) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }))
    }

    const selectAllItems = (isSelected) => {
        const newSelectedItems = {}
        userCart.forEach(item => {
            newSelectedItems[item.id] = isSelected
        })
        setSelectedItems(newSelectedItems)
    }

    const getSelectedItems = () => {
        return userCart.filter(item => selectedItems[item.id])
    }

    const calculateTotal = () => {
        return getSelectedItems()
            .reduce((total, item) => total + (item.Book.sale * item.quantity), 0)
            .toFixed(2)
    }

    const handleCheckout = async () => {
        const selectedItemsCount = getSelectedItems().length
        if (selectedItemsCount === 0) {
            toast.error("Please select at least one item to checkout")
            return
        }
        
        const books = getSelectedItems().map((item) => ({
            id: item.Book.id,
            quantity: item.quantity,
        }));
        const responseCreateBill = await createBillForUser({
            user: user,
            paymentMethodId: paymentMethod.id, 
            totalCost: (parseFloat(calculateTotal()) + 5).toFixed(2),
            shippingMethod: "GHTK",
            books: JSON.stringify(books)
        })
        if(responseCreateBill){
            if(responseCreateBill.status === 1){
                toast.success(responseCreateBill.message)
                return 
            }
            else {
                toast.error(responseCreateBill.message)
                return 
            }
        }
        toast.error("Failed to Create Bill")
    }

    useEffect(() => {
        if (userID) {
            getCart()
        }
        fetchAllPaymentMethod()
    }, [userID])

    const isAllSelected = userCart.length > 0 && userCart.every(item => selectedItems[item.id])

    return (
        <div className="cart">
            <div className="cart-hero">
                <h1>Cart</h1>
            </div>

            <div className="cart-container">
                <div className="cart-table-container">
                    <div className="select-all-container">
                        <label className="checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={isAllSelected}
                                onChange={(e) => selectAllItems(e.target.checked)}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Select All</span>
                        </label>
                    </div>
                    
                    <div className="table-wrapper">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th className="checkbox-column"></th>
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
                                            <td>
                                                <label className="checkbox-container">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedItems[item.id] || false}
                                                        onChange={() => toggleItemSelection(item.id)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                            <td><img src={item.Book.bookImageUrl || "/placeholder.svg"} alt={item.Book.name} className="product-img"/></td>
                                            <td>{item.Book.name}</td>
                                            <td className="cart_price">${item.Book.sale.toFixed(2)}</td>
                                            <td>
                                                <div className="quantity-control">
                                                    <button className="quantity-btn" disabled={item.quantity === 0} onClick={() => handleUpdateCart(item.id, "down")}>-</button>
                                                    <input type="text" value={item.quantity} className="quantity-input" readOnly/>
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

                <div className="checkout-section">
                    <div className="checkout-container">
                        <h2 className="checkout-title">Checkout</h2>
                        
                        <div className="checkout-summary">
                            <div className="selected-items">
                                <h3>Selected Items ({getSelectedItems().length})</h3>
                                <div className="selected-items-list">
                                    {getSelectedItems().length > 0 ? (
                                        getSelectedItems().map(item => (
                                            <div key={item.id} className="selected-item">
                                                <span className="item-name">{item.Book.name}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                                <span className="item-price">${(item.Book.sale * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-selection">No items selected</div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="payment-methods">
                                <h3>Payment Method</h3>
                                <div className="payment-options">
                                    {paymentMethods.length > 0 ? (
                                        paymentMethods.map(item => (
                                            <div className="payment-option">
                                                <label className="radio-container">
                                                    <input 
                                                        type="radio" 
                                                        name="payment" 
                                                        value="credit-card" 
                                                        onChange={() => setPaymentMethod(item)}
                                                    />
                                                    <span className="radio-checkmark"></span>
                                                    <div className="payment-label">
                                                        <span>{item.name}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        ))
                                    ) : (<></>)}
                                </div>
                            </div>
                            
                            <div className="checkout-total">
                                <div className="subtotal">
                                    <span>Subtotal:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                                <div className="shipping">
                                    <span>Shipping:</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="total">
                                    <span>Total:</span>
                                    <span>${(parseFloat(calculateTotal()) + 5).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            className={`checkout-button ${getSelectedItems().length === 0 ? 'disabled' : ''}`}
                            onClick={handleCheckout}
                            disabled={getSelectedItems().length === 0}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
