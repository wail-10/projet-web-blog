import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // React.useEffect(() => {
    //     // Make an HTTP request to check session status
    //     axios.get('/auth/check-session')
    //     .then(response => setIsLoggedIn(true))
    //     .catch(error => {
    //         console.error('Error checking session:', error);
    //     });
    // }, []);

    
    // const links = isLoggedIn ? 
    // [
    //     {page: 'Home', link: '/'},
    //     {page: 'Logout', link: '/logout'}
    // ]
    // : 
    // [
    //     {page: 'Home', link: '/'},
    //     {page: 'Login', link: '/login'},
    //     {page: 'Register', link: '/register'},
    // ]
    const links = [
        {page: 'Home', link: '/'},
        {page: 'Login', link: '/login'},
        {page: 'Register', link: '/register'},
    ]

    return (
        <nav className="bg-gray-900 fixed top-0 left-0 right-0 shadow-lg z-10">
            <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
                <Link to={'/'} className="text-gray-300 hover:text-white mr-4">The Blog Haven</Link>
                <div className="flex items-center mt-4 md:mt-0">
                        {links.map((link,index) => (
                            <Link to={link.link} key={index} className="text-gray-300 hover:text-white mr-4">{link.page}</Link>
                        ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;