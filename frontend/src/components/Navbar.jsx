import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../axios/api';


const Navbar = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);


    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.exp * 1000 < Date.now()) {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        setRole(null);
                        return;
                    }
                    const roles = payload.roles || payload.role || [];
                    const userRole = Array.isArray(roles) ? roles[0] : roles;
                    setRole(userRole);
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error("Error parsing token:", e);
                    setIsLoggedIn(false);
                    setRole(null);
                }
            } else {
                setIsLoggedIn(false);
                setRole(null);
            }
        };

        checkAuth(); // ✅ run on mount
        window.addEventListener("authChange", checkAuth); // ✅ listen for login/logout

        return () => {
            window.removeEventListener("authChange", checkAuth); // ✅ cleanup
        };
    }, []);


    // logout functionality
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("authChange"));
        alert("User logged out successfully !")
        navigate("/login");

    }

    // code for searching books 
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await api.get("/books/search", {
                params: { term: searchTerm }
            });
            setResults(response.data);
        } catch (error) {
            console.error("Error searching books:", error);
            setResults([]);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch();
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    //end of searching code / navbar search




    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white  transition-all w-full sticky top-0">

            <a href="/" className="flex items-center gap-2">

                <span className="font-bold text-xl text-indigo-600">E-Library</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

                <a href="/allbooks">All Books</a>
                <a href="/myrecords">My Records</a>
                <a href="/contact">Contact</a>
                <a href="/about">About</a>

                {/* search bar */}
                <div className="hidden lg:flex flex-col relative items-start text-sm gap-2 w-[300px]">
                    <div className=" flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" name="search" id="search" placeholder="Search products" />

                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>
                    {results.length > 0 && (
                        <div className="absolute top-full mt-2 bg-white shadow-lg rounded w-[300px] z-50 max-h-[300px] overflow-y-auto">
                            <ul>
                                {results.map(book => (
                                    <li
                                        key={book.id}
                                        onClick={() => {
                                            setSearchTerm('');
                                            setResults([]);
                                            navigate(`/books/${book.id}`);
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <strong>{book.title}</strong> by {book.author}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                <div className="flex items-center gap-2">

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                            Login
                        </Link>
                    )}


                </div>


            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <a href="/allbooks">All Books</a>
                <a href="/myrecords">My Records</a>
                <a href="/" className="block">Home</a>
                <a href="#" className="block">About</a>
                <a href="#" className="block">Contact</a>

                {isLoggedIn ? (
                    <button onClick={handleLogout} className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                        Login
                    </Link>
                )}


            </div>

        </nav>
    )
}

export default Navbar
