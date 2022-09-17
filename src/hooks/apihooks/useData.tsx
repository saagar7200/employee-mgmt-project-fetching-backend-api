import React, { FC } from 'react'
import axios from '../../api/axios';
import useEmployee from '../contexthooks/useEmployee';



const useData = ():Function => {

    let {setEmployee,setIsloading}:any = useEmployee()

    const getEmployee= async () =>{

        try{
            let response:any = await axios.get("/employees");

            setEmployee( response.data)
            setIsloading(false)
            console.log("get employee",response.data)

        }catch(err:any){
            setIsloading(false)
            console.log(err.message)
        }
       
    }
  return getEmployee;
}

export default useData