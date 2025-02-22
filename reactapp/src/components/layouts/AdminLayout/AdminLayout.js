import { Outlet } from "react-router-dom"
import "./AdminLayout.scss"
import Admin_SideBar from "./Admin_SideBar/Admin_SideBar"
import Admin_Header from "./Admin_Header/Admin_Header"
const AdminLayout = () => {
    return (
        <>
            <div className="admin-app">
                <sidebar className="admin-app__sidebar">
                    <Admin_SideBar/>
                </sidebar>
                <main className="admin-app__main">
                    <Admin_Header className="admin-app__main__header"/>
                    <div  className="admin-app__main__content">
                        <Outlet />
                    </div>   
                </main>
            </div>
        </>
    )
}

export default AdminLayout