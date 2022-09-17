import React, { useState,useEffect, FC } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./LoginSignUp.css"

import {Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import axios from '../../api/axios';



interface userI {
    name?:string,
    email?:string,
    password?:string,
    cpassword?:string
}



type Props = {
}

const Auth :FC<Props>= () => {

    let {setAuth ,auth, isLoading,setIsloading}:any= useAuth()
    
    const location:any = useLocation();
    const navigate = useNavigate();
    // const {auth} :any = useAuth()

    let from:any = location?.state?.from ||  '/';

 const [error,setError]=useState<any>(null)
 const [formdata, setFormData] = useState<userI>({
    email:"",
    password:"",
    });





useEffect(( ) => {
    

} , [error])

const handleChange=(e:React.ChangeEvent<HTMLElement>)=>{  
    const {name,value}:any=e.target; 
    setFormData({...formdata,[name]:value})
    console.log("signup data",formdata)
}





const handleSubmit = async (e:any):Promise<any>=>{

    const {name,email,password,cpassword} = formdata

    let newData:userI ={}

    if(!isLoading){
        setIsloading(true)
    }
   

    try{

        if(!email || !password || !cpassword){

            return setError("fill the form properly.");
        }

        if(password !== cpassword){
            return setError("password and confirm password doesn't match.")
        }
        newData.email=email;
        newData.password=password;

        console.log('signup form data', newData)

    
        
      let data:any =   await axios.post('http://localhost:3001/auth/signup',newData)
        console.log('signup data', data)
        if(!data){
                        setError("Access denied")
                    }
                  
                    console.log('signed in data----->', data)
                    console.log('sign in new data------>', newData)
            
                    let accessToken = data?.tokens?.access_token;
                    let refreshToken = data?.tokens?.refresh_token;
            
                    setAuth({ user:email,accessToken,refreshToken,isAuthenticated:true, });

                    if(data){
                    setIsloading(false);
                    }
            
                    setFormData({
                        email:"",
                    password:"",
                    cpassword:"",
                    })
                    setError(" ")
                    navigate(from,{replace:true});
            


   
    }catch(err:any){
            if(err.code ==="ERR_NETWORK"){
                setError("Server connection failed.")
            }if(err.response.data.statusCode === 403){
                setError(err.response.data.message)
        
            }else{
                setError(err.response.data.message)
        
            }
                console.log(err)
        
            }
}



  return (
    <div className='LoginSignUpContainer' style={{ display:"flex" ,flexDirection:"column",justifyContent:"flex-start"}}>


    { !auth.user && (<div  className='home-btn'>
        <button style={{}} className='btn' onClick={() =>  navigate('/add_employee')}> Add New</button>

    </div>
    ) }

       

        <div className='LoginSignUpBox'>
        { <h2>Sign Up</h2>}
        <form className='loginForm'  onSubmit={handleSubmit}>


            <div>
                <MailOutlineIcon />
            
                <input name='email' type='text' placeholder='email' value={formdata?.email ? formdata.email :"" } onChange={(e)=>{handleChange(e)}}/>

            </div>
            <div>
                <LockOpenIcon/>
                <input name='password' type='password' value={formdata?.password !=="" ? formdata.password:`` } placeholder='password'onChange={(e)=>{handleChange(e)}}/>

            </div> 
            <div>
                <LockOpenIcon/>
                <input name='cpassword' type='password' value={formdata?.password !=="" ? formdata.cpassword:`` } placeholder='confirm password'onChange={(e)=>{handleChange(e)}}/>

            </div> 
           
           
           {error &&  <p style={{color:'red'}}>{error}</p>}

           <p> already have account ? <Link to='/signin'> <span> login</span></Link></p>

        </form>


        <button className='loginBtn' type='submit' onClick={ handleSubmit}>Sign Up</button>


        </div>




    </div>
  )
}

export default Auth