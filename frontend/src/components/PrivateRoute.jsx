// private route for role based access

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" replace />
    if (!requiredRole) return children

    try{

        const payload = JSON.parse(atob(token.split('.')[1]))
        const roles = payload.roles || payload.role || []
        const userRole = Array.isArray(roles) ? roles[0] : roles
        if(userRole !== requiredRole) return <Navigate to="/" replace />
        return children

    }catch(e){
        return <Navigate to="/login" replace />
    }
}
export default PrivateRoute



