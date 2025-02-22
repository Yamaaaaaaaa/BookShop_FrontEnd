import { Navigate, Route, Routes } from "react-router-dom"
import ProtectRoute from "./ProtectRoute"
import ShopLayout from "../components/layouts/ShopLayout"
import Login from "../pages/Client/Auth/Login"
import Home from "../pages/Client/Home/home"
import Shop from "../pages/Client/Shop/shop"
import Cart from "../pages/Client/Cart/cart"
import Profile from "../pages/Client/Profile/profile"
import BookDetail from "../pages/Client/BookDetail/bookdetail"

const ShopRoute = () =>{
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route
                path="/*"
                element={
                <ProtectRoute>
                    <ShopLayout />
                </ProtectRoute>
                }
            >   
                <Route path="home" element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="bookdetail" element={<BookDetail/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="cart" element={<Cart/>}/>
            </Route>
            <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
    )
}
export default ShopRoute