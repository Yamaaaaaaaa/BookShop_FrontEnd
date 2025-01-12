import { Navigate, Route, Routes } from "react-router-dom"
import ProtectRoute from "./ProtectRoute"
import ShopLayout from "../components/layouts/ShopLayout"
import Login from "../pages/Auth/Login"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import Profile from "../pages/Profile"
import BookDetail from "../pages/BookDetail"

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