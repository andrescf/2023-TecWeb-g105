import React from "react";
import { Outlet } from "react-router-dom";
import './commons.css'
import Navbar from "../components/Navbar/Navbar";
import MainPageNav from "../components/Navbar/NavMainPage";
import Footer from "../components/Footer/Footer";

function Layout() {
    const user = false;
    return (
        <>
            {
            user ? <MainPageNav /> : <Navbar />
            }
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout