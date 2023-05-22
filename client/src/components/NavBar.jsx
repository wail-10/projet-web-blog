import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const navigate = useNavigate()
    const {currentUser, logout} = useContext(AuthContext)

    const links = currentUser ?
    [
        { page: "Home", link: "/" },
        { page: "Add Article", link: "/add-article" },
        { page: "Logout", onClick: () => {
            logout()
            return navigate('/login')
        }},
    ]
    :
    [
        { page: "Home", link: "/" },
        { page: "Login", link: "/login" },
        { page: "Register", link: "/register" },
    ]

    return (
        <nav className="bg-gray-900 fixed top-0 left-0 right-0 shadow-lg z-10">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
            <Link to={"/"} className="text-gray-300 hover:text-white mr-4">
            The Blog Haven
            </Link>
            <div className="flex items-center mt-4 md:mt-0">
                {/* {links.map((link, index) =>(
                    <Link
                        to={link.link}
                        key={index}
                        className="text-gray-300 hover:text-white mr-4"
                    >
                        {link.page}
                    </Link>
                ) )} */}
            {links.map((link, index) =>
                link.link ? (
                <Link
                    to={link.link}
                    key={index}
                    className="text-gray-300 hover:text-white mr-4"
                >
                    {link.page}
                </Link>
                ) : (
                <button
                    key={index}
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-white mr-4"
                >
                    {link.page}
                </button>
                )
            )}
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
