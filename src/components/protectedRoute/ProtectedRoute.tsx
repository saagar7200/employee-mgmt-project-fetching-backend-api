import React, { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/contexthooks/useAuth';


interface Props {
    
}

const ProtectedRoute:FC<Props> = () => {

    const location = useLocation();
    const {auth}:any= useAuth()

    console.log("protected route access  token-------->",auth.accessToken)
     
    return (
        
        auth?.user
            ? <Outlet/>
            :<Navigate to='/signin' state={{from:location}} replace/>
    )
}

export default ProtectedRoute
