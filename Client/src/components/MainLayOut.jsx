import { Outlet } from "react-router";
import Navbar from "./navbar";

export default function MainLayOut() {

    return <>
        <div className="container-grid">
            <Navbar />
            <Outlet />
        </div>
    </>
}