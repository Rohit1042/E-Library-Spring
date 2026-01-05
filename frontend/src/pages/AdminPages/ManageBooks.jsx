import { useEffect, useState } from 'react'
import api from '../../axios/api';
import { Link } from 'react-router-dom';

const ManageBooks = () => {

    // const for fetching and displaying list of books with edit and delete options

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                //fetch books from backend api
                const response = await api.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // for searching books and filtering the books according to the keyword entered in the search bar
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await api.get('/books/search', {
                params: {
                    term: searchTerm
                }
            });
            setResults(response.data);

        } catch (error) {
            console.error("Error searching books:", error);
            setResults([]);
        }
    }
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


    // for deleting particular book
    const handleDelete = async (id) => {
        try {

            await api.delete(`/admin/books/${id}`);
            alert("Book deleted successfully !");
            const response = await api.get('/books');
            setBooks(response.data);

        } catch (error) {
            console.error("Error occures while deleting the books", error);
        }

    }


    return (
        <div className=" items-center">

            <div className=' flex justify-between items-center p-4'>

                <div className=" flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" name="search" id="search" placeholder="Search Books..." />

                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>

                <Link to="/admin/add-book" className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                    Add Book
                </Link>
            </div>

            <div className=" max-h-[500px] bg-zinc-50 items-center overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg relative ">

                <table className=" table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">

                    <thead className=" bg-gray-400">
                        <tr>
                            <th className=" border border-gray-300 px-4 py-2">#Book_ID</th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Book
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Genre
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Total Copies
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Available Copies
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Action
                            </th>
                        </tr>

                    </thead>

                    <tbody>
                        {(searchTerm.trim() ? results : books).map(book => (
                            <tr key={book.id} className=" bg-white hover:bg-gray-100">
                                <td className=" border border-gray-300 px-4 py-2">
                                    {book.id}
                                </td>

                                <td className=" border border-gray-300 px-4 py-2">
                                    Title: {book.title}<br />
                                    Author: {book.author}<br />
                                    ISBN: {book.isbn}
                                </td>
                                <td className=" border border-gray-300 px-4 py-2">
                                    {book.genre}
                                </td>
                                <td className=" border border-gray-300 px-4 py-2">
                                    {book.totalCopies}
                                </td>
                                <td className=" border border-gray-300 px-4 py-2">
                                    {book.availableCopies}
                                </td>


                                <td className=" border border-gray-300 px-4 py-2">
                                    <div className=' flex gap-2'>
                                        <Link to={`/admin/edit-book/${book.id}`} className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                            Delete
                                        </button>
                                    </div>

                                </td>


                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default ManageBooks
