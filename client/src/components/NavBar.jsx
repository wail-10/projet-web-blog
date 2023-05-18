import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const links = ['Home', 'Sign in', 'Sign up']
    return (
        <nav className="bg-gray-900 fixed top-0 left-0 right-0 shadow-lg z-10">
            <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
                <a href="#" className="text-white text-lg font-bold">The Blog Haven</a>
                <div className="flex items-center mt-4 md:mt-0">
                    {/* <Link to={'/'} className="text-gray-300 hover:text-white mr-4">Home</Link>
                    <Link to={'/categories'} className="text-gray-300 hover:text-white mr-4">Categories</Link> */}
                    {links.map((link,index) => (
                        <a href="#" className="text-gray-300 hover:text-white mr-4" key={index}>{link}</a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;