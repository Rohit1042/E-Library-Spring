import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {

    const navigate = useNavigate();

        // handle logout function for admin
        const handleLogout = () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("roles")
            alert("user logout successfully");
            navigate("/login")
        }




    return (
        <div className='w-full mx-auto items-center justify-center'>
            <header>
                <div className=' flex justify-between flex-row w-full bg-slate-50 shadow py-4 px-8'>
                    <h1 className=' text-indigo-400 px-4 py-2 cursor-pointer font-extrabold'>Admin Dashboard</h1>
                    <button onClick={handleLogout} className=' bg-indigo-400 px-4 py-2 rounded hover:bg-indigo-500 cursor-pointer'>
                        Logout
                    </button>

                </div>
            </header>
            <aside className=' float-left bg-indigo-50 h-screen w-60 shadow-md px-4 py-6'>
                <div className=''>
                    <Link to="/admin/dashboard" className=' block py-2 px-4 hover:bg-indigo-100'>Dashboard</Link>
                    <Link to="/admin/users" className=' block py-2 px-4 hover:bg-indigo-100'>Manage Users</Link>
                    <Link to="/admin/books" className=' block py-2 px-4 hover:bg-indigo-100'>Manage Books</Link>
                    <Link to="/admin/records" className=' block py-2 px-4 hover:bg-indigo-100'>View Records</Link>
                </div>

            </aside>

            <main className=' ml-60 p-8'>
                <Outlet />
            </main>



        </div>
    )
}

export default AdminLayout
