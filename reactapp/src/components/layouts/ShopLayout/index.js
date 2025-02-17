import { Outlet } from "react-router-dom"
import Header from "../../features/Header/header"

const ShopLayout = () => {
    return (
        <>
            <div className="app">
                <Header />
                <main className="flex-grow p-8 overflow-y-auto ml-64">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default ShopLayout