import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from "../axios/api";
import axios from 'axios';


const AllBooks = () => {

    const navigate = useNavigate();

    // used to fetch all the books from backend
    const [books, setBooks] = useState([])
    useEffect(() => {

        const fetchBooks = async () => {

            try {
                const response = await api.get("/books")
                setBooks(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBooks()

    }, []);
    //end of all books fetching code

    //function to borrow book
    const borrowBook = async (bookId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to borrow a book.");
                navigate("/login");
                return;
            }
            const response = await api.post(`/borrow/book/${bookId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            alert("Book borrowed successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to borrow the book. Please try again.");
        }
    };



    return (
        <div className=" bg-slate-50">
            <div className=" container mx-auto items-center py-12 sm:py-24">
                <h1 className=" text-center text-3xl font-serif">All books</h1>
                <div className=" grid lg:grid-cols-4 sm:grid-cols-1 gap-6 my-12 ">
                    {books.map((book) => (
                        <div key={book.id} className=" bg-white rounded-lg shadow-lg p-6  transition duration-150 ease-in-out ">
                            <Link to={`/books/${book.id}`}>
                                <h2 className=" text-xl font-semibold text-gray-800 hover:text-blue-600">{book.title}</h2>
                            </Link>
                             
                            <p className=" text-sm text-gray-600 mt-2">by {book.author}</p>
                            <p  className=" text-sm text-gray-800 mt-4">{book.description.slice(0,50)}...</p>
                            <p className=" text-sm text-gray-500 mt-2">Genre: {book.genre}</p>
                            <p className=" text-sm text-gray-500 mt-2">Available Copies: {book.availableCopies}</p>
                            <p className=" text-sm text-gray-500 mt-2">Total Copies: {book.totalCopies}</p>

                            <button onClick={() => borrowBook(book.id)} className=' py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-400 hover:bg-indigo-500 rounded cursor-pointer transition duration-150 ease-in-out mt-4 text-white hover:scale-105'>
                                Borrow Book
                            </button>

                        </div>



                    ))}


                </div>



            </div>



        </div>
    )
}


export default AllBooks
