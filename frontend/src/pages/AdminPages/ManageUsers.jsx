import { useEffect, useState } from "react";
import api from "../../axios/api";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  // fetching all the users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);


  //function to handle the status of the user (enable/disable)
  const handleEditUser = async (userId, isEnabled) => {
    try {

      const endpoint = isEnabled ? `/admin/users/disable/${userId}` : `/admin/users/enable/${userId}`;
      await api.put(endpoint);
      alert("User status Updated successfully");
      const response = await api.get("/admin/users");
      setUsers(response.data);

    } catch (error) {
      console.error("Error updating user status:", error);
    }
  }





  return (
    <div className=" items-center my-12 sm:my-24 p-4">

      <div className=" max-h-[600px] overflow-y-auto bg-zinc-50 items-center overflow-x-auto shadow-md sm:rounded-lg relative ">

        <table className=" table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">

          <thead className=" bg-gray-400">
            <tr>
              <th className=" border border-gray-300 px-4 py-2">#User_ID</th>
              <th className=" border border-gray-300 px-4 py-2">
                UserName
              </th>
              <th className=" border border-gray-300 px-4 py-2">
                Email
              </th>
              <th className=" border border-gray-300 px-4 py-2">
                Role
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
            {users.map(user => (
              <tr key={user.id} className=" bg-white hover:bg-gray-100">
                <td className=" border border-gray-300 px-4 py-2">
                  {user.id}
                </td>

                <td className=" border border-gray-300 px-4 py-2">
                  {user.username}
                </td>

                <td className=" border border-gray-300 px-4 py-2">
                  {user.email}
                </td>

                <td className=" border border-gray-300 px-4 py-2">
                  {user.roles}
                </td>

                <td className=" border border-gray-300 px-4 py-2">
                  {user.enabled === true ? (
                    <span className="text-black bg-green-500 p-1 rounded">Enabled</span>
                  ) : (
                    <span className="text-white bg-red-500 p-1 rounded">Disabled</span>
                  )}
                </td>

                <td className=" border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => { handleEditUser(user.id, user.enabled) }}
                    className=" bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                    Change Status
                  </button>
                </td>


              </tr>
            ))}
          </tbody>


        </table>


      </div>

    </div>
  )
}

export default ManageUsers

