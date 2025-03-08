import { Outlet } from "react-router"
import Logo from "../assets/logo.svg"
export default function IndexLayout() {
    return (

        <>
            {/* nav */}
            <nav className="flex container justify-between items-center mx-auto py-4">
                <div className="flex items-center">
                    <img src={Logo} alt="logo" className="h-8" />
                    <h1 className="text-2xl font-semibold ml-2">Food Order</h1>
                </div>
                <div>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Login</button>
                </div>
            </nav>
            <Outlet />
            {/* footer */}
            <footer className="py-8">
                <div className="container mx-auto px-4">
                    <div className="footer-inner flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold">Food Order</h1>
                        </div>
                        <div>
                            <ul className="footer-menu flex space-x-4">
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}