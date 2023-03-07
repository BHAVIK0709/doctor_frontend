import axios from 'axios'
import React, { Children, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { setAllUsers } from '../Redux/features/userSlice'

const HomePage = () => {
const dispatch = useDispatch()
    const getUserData = async( ) =>{
        try {
           await axios.get("http://localhost:4010/getUsers", {
            headers:{
              Authorization:"Bearer" + localStorage.getItem("jwt"),
            }
          }).then((resp)=>{
            console.log(resp.data)
          dispatch(setAllUsers(resp.data))
          })
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
     getUserData()
    }, [])
    
  return (
    <Layout Children={Children}>
        <h1>HomePage</h1>
    </Layout>
  )
}

export default HomePage