import MainLayout from './Layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/AdminPages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import MyRecord from './pages/MyRecord';
import AdminLayout from './Layout/AdminLayout';
import ManageUsers from './pages/AdminPages/ManageUsers';
import ManageBooks from './pages/AdminPages/ManageBooks';
import ManageRecords from './pages/AdminPages/ManageRecords';
import AddBooks from './components/admin/AddBooks';
import EditBooks from './components/admin/EditBooks';

const App = () => {
  return (
    <div className=' min-h-screen'>

      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/allbooks' element={<AllBooks />} />
          <Route path='/books/:id' element={<BookDetails />} />
          <Route path='/myrecords' element={<MyRecord />} />

          <Route path='*' element={<h1>404 - Not Found</h1>} />

        </Route>


        <Route element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><AdminLayout /></PrivateRoute>}>

          <Route path="/admin/dashboard" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><Dashboard /></PrivateRoute>} />

          <Route path="/admin/users" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><ManageUsers /></PrivateRoute>} />

          <Route path="/admin/books" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><ManageBooks /></PrivateRoute>} />

          <Route path="/admin/records" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><ManageRecords/></PrivateRoute>} />

          <Route path="/admin/add-book" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><AddBooks /></PrivateRoute>} />

          <Route path="/admin/edit-book/:id" element={<PrivateRoute requiredRole={"ROLE_ADMIN"}><EditBooks /></PrivateRoute>} />


        </Route>

      </Routes>

    </div>
  )
}



export default App
