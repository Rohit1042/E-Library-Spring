import { useEffect, useState } from "react";
import api from "../axios/api";

const MyRecord = () => {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await api.get('/borrow/my-records');
                setRecords(response.data);
            } catch (error) {
                console.error("Error fetching my records:", error);
            }
        };
        fetchRecords();
    }, []);

    //code for returning the book if it is borrowed and not returned
    const handleReturnBook = async (recordId) => {
        try {
            await api.post(`/borrow/return/${recordId}`)
            const response = await api.get(`/borrow/my-records`)
            setRecords(response.data);

        } catch (error) {
            console.error("Error returning books: ", error);
        }
    };


    return (
        <div className=" items-center my-12 sm:my-24 p-4">

            <div className=" bg-zinc-50 items-center overflow-x-auto shadow-md sm:rounded-lg relative ">

                <table className=" table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">

                    <thead className=" bg-gray-400">
                        <tr>
                            <th className=" border border-gray-300 px-4 py-2">#ID</th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Books
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Borrowed On
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Due Date
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Status
                            </th>
                            <th className=" border border-gray-300 px-4 py-2">
                                Action
                            </th>
                        </tr>

                    </thead>



                    <tbody>
                        {records.map(record => (
                            <tr key={record.id} className=" bg-white hover:bg-gray-100">
                                <td className=" border border-gray-300 px-4 py-2">
                                    {record.id}
                                </td>

                                <td className=" border border-gray-300 px-4 py-2">
                                    Title: {record.book.title}<br />
                                    Author: {record.book.author}<br />
                                    Genre: {record.book.genre}<br />
                                    ISBN: {record.book.isbn}
                                </td>
                                <td className=" border border-gray-300 px-4 py-2">
                                    {record.borrowDate}
                                </td>
                                <td className=" border border-gray-300 px-4 py-2">
                                    {record.dueDate}
                                </td>

                                <td className=" border border-gray-300 px-4 py-2">
                                    <span>
                                        {record.status === "RETURNED" ? (
                                            <span className="text-gray-800 bg-green-500 p-1 rounded">Returned</span>
                                        ) : record.status === "OVERDUE" ? (
                                            <span className="text-gray-800 bg-red-500 p-1 rounded">Overdue</span>
                                        ) : (
                                            <span className="text-white bg-gray-500 p-1 rounded">Borrowed</span>
                                        )}
                                    </span>
                                </td>

                                <td className=" border border-gray-300 px-4 py-2">

                                    {record.status === "BORROWED" && (
                                        <button
                                        onClick={() => {handleReturnBook(record.id)}}
                                         className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                            Return Book
                                        </button>
                                    )}


                                </td>


                            </tr>
                        ))}
                    </tbody>


                </table>


            </div>

        </div>
    )
}

export default MyRecord
