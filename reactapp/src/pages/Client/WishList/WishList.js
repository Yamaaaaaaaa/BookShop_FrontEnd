import { useEffect, useState } from "react"
import "./WishList.scss"
import { deleteBookOnWishList, getWishListForUser } from "../../../service/userService"
import { toast } from "react-toastify"
import ConfirmWishlistModal from "./ConfirmDeleteWishListModal"

const WishList = () => {
    const [userCart, setUserCart] = useState([])
    const [selectedItems, setSelectedItems] = useState({})
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const user = sessionStorage.getItem("user")
    const userID = JSON.parse(sessionStorage.getItem("user"))?.id || ""

    const getCart = async () => {
        const responseGetCart = await getWishListForUser(userID)

        if (responseGetCart && responseGetCart.status === 1 && responseGetCart.data) {
            setUserCart(responseGetCart.data)
            // Initialize selected items
            const initialSelected = {}
            responseGetCart.data.forEach((item) => {
                initialSelected[item.id] = false
            })
            setSelectedItems(initialSelected)
            toast.success(responseGetCart.message)
        } else {
            setUserCart([])
            toast.error(responseGetCart.message)
        }
    }

    const handleDeleteOnWishList = async (listId) => {
        const responseGetCart = await deleteBookOnWishList({ listId: listId })

        if (responseGetCart && responseGetCart.status === 1 && responseGetCart.data) {
            getCart()
            toast.success(responseGetCart.message)
        } else {
            setUserCart([])
            toast.error(responseGetCart.message)
        }
    }

    const handleDeleteClick = (item) => {
        setItemToDelete(item)
        setShowConfirmModal(true)
    }

    const confirmDelete = () => {
        if (itemToDelete) {
            handleDeleteOnWishList(itemToDelete.id)
        }
    }

    useEffect(() => {
        if (userID) {
            getCart()
        }
    }, [userID])

    return (
    <div className="cart">
        <div className="cart-hero">
            <h1>Wish List</h1>
        </div>

        <div className="cart-container">
            <div className="cart-table-container">
                <div className="table-wrapper">
                    <table className="cart-table">
                        <thead>
                            <tr>
                            <th>Product</th>
                            <th>Product name</th>
                            <th>Book Price</th>
                            <th>Close</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCart.map((item) => (
                            <tr key={item.id}>
                                <td>
                                <img
                                    src={item.Book.bookImageUrl || "/placeholder.svg"}
                                    alt={item.Book.name}
                                    className="product-img"
                                />
                                </td>
                                <td>{item.Book.name}</td>
                                <td className="cart_price">${item.Book.sale.toFixed(2)}</td>
                                <td>
                                <button className="close-btn" onClick={() => handleDeleteClick(item)}>
                                    ×
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {showConfirmModal && itemToDelete && (
            <ConfirmWishlistModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={confirmDelete}
            itemName={itemToDelete.Book.name}
            />
        )}
    </div>
    )
}

export default WishList

