import { useEffect, useState } from "react";
import api from "../../axios/api";


const ManageRecords = () => {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get("/borrow/admin/all");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  //code for returning the book if it is borrowed and not returned
  const handleReturnBook = async (recordId) => {
    try {
      await api.post(`/borrow/return/${recordId}`)
      const response = await api.get(`/borrow/admin/all`)
      setRecords(response.data);
      console.log(response.data);

    } catch (error) {
      console.error("Error returning book:", error);
    }
  };



  return (
    <div className=" items-center p-4">

      <div className=" max-h-[600px] bg-zinc-50 items-center overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg relative ">

        <table className=" table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">

          <thead className=" bg-gray-400">
            <tr>
              <th className=" border border-gray-300 px-4 py-2">#ID</th>
              <th className=" border border-gray-300 px-4 py-2">
                Book Details
              </th>
              <th className=" border border-gray-300 px-4 py-2">
                User Details
              </th>
              <th className=" border border-gray-300 px-4 py-2">
                Borrowed On
              </th>

              <th className=" border border-gray-300 px-4 py-2">
                Due Date
              </th>
              <th className=" border border-gray-300 px-4 py-2">
                Return Date
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
            {records.map((allrecords) => (
              allrecords.book && allrecords.user ? (
                <tr key={allrecords.id} className=" bg-white hover:bg-gray-100">
                  <td className=" border border-gray-300 px-4 py-2">
                    {allrecords.id}
                  </td>

                  <td className=" border border-gray-300 px-4 py-2">
                    ID: {allrecords.book.id} <br />
                    Title: {allrecords.book.title} <br />
                    Author: {allrecords.book.author} <br />
                    Genre: {allrecords.book.genre} <br />
                    ISBN: {allrecords.book.isbn} <br />
                  </td>
                  <td className=" border border-gray-300 px-4 py-2">
                    ID: {allrecords.user.id} <br />
                    Name: {allrecords.user.username} <br />
                    Email: {allrecords.user.email} <br />

                  </td>
                  <td className=" border border-gray-300 px-4 py-2">
                    {allrecords.borrowDate}
                  </td>

                  <td className=" border border-gray-300 px-4 py-2">
                    {allrecords.dueDate}
                  </td>
                  <td className=" border border-gray-300 px-4 py-2">
                    {allrecords.returnDate ? allrecords.returnDate : "N/A"}
                  </td>

                  <td className=" border border-gray-300 px-4 py-2">
                    <span>
                      {allrecords.status === "RETURNED" ? (
                        <span className="text-gray-800 bg-green-500 p-1 rounded">Returned</span>
                      ) : allrecords.status === "OVERDUE" ? (
                        <span className="text-gray-800 bg-red-500 p-1 rounded">Overdue</span>
                      ) : (
                        <span className="text-white bg-gray-500 p-1 rounded">Borrowed</span>
                      )}
                    </span>
                  </td>

                  <td className=" border border-gray-300 px-4 py-2">

                    {allrecords.status === "BORROWED" && (
                      <button
                        onClick={() => { handleReturnBook(allrecords.id) }}
                        className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                        Return Book
                      </button>
                    )}


                  </td>

                </tr>

              ) : null))}


          </tbody>


        </table>


      </div>

    </div>

  )
}

export default ManageRecords
