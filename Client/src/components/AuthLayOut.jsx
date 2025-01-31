import { Outlet,Navigate } from "react-router"
import Navbar from "./navbar"

export default function AuthLayOut() {

    const isAuthenticated = localStorage.access_token
    if (isAuthenticated) {

        return<>
        <Navbar/>
         <Outlet />
         </>
    }
    return < Navigate to={'/login'} />

}