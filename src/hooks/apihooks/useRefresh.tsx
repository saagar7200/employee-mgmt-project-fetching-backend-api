import React, { FC } from 'react'
import axios from  'axios';
import useAuth from '../contexthooks/useAuth';
import useEmployee from '../contexthooks/useEmployee';



const useRefresh  = ():Function => {

    let {setIsloading}:any = useEmployee()
    let { auth,setAuth}:any = useAuth( )
    // let {refreshToken}:any = auth



    const getRefresh= async () =>{
        console.log('context token ',auth.refreshToken)

     


        try{
            const config:any = {
                headers:{
                    'Content-type':'application/json',
                    "Authorization":`Bearer ${auth.refreshToken}`,
                },
                withCredentials:true
                
            }


            let {data}:any = await axios.post('http://localhost:3001/auth/refresh' , config);


            console.log("get refresh",data)

            let accessToken = data?.tokens?.access_token;
            let refreshToken = data?.tokens?.refresh_token;

            setAuth(( prev:any) => {
                return { ...prev , accessToken,refreshToken}
            })
            setIsloading(false)
            console.log("get updated  refresh", refreshToken)

            return accessToken ;


        }catch(err:any){
            setIsloading(false)
            console.log(err.message)
        }


       
    }
  return getRefresh;
}

export default useRefresh