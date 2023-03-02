import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PublicRoute({children}) {
    if(localStorage.getItem("jwt")){
        return <Navigate to="/" />
     }else{
        return children
     }
}
