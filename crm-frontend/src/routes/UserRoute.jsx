import React, { Children, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const UserRoute = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <div className="animate-spin rounded-full h-32 border-b-2 border-blue-500"></div>
            </div>

        )
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children
}

export default UserRoute