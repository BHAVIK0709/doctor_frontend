import axios from 'axios'
import React, { Children, useEffect } from 'react'
import Layout from '../components/Layout'

const HomePage = () => {

    const getUserData = async( ) =>{
        try {
          const res = await axios.get("http://localhost:4010/getUserData", {},{
            headers:{
              Authorization:"Bearer" + localStorage.getItem("jwt"),
            }
          }).then((resp)=>{
            console.log(resp)
          })
            
        } catch (error) {
            // console.log(error)
            
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