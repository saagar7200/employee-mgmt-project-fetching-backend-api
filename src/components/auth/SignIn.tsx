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
    cPassword?:string
}



type Props = {
}

const Auth :FC<Props>= () => {

    let {setAuth , isLoading,setIsloading}:any= useAuth()
    
    const location:any = useLocation();
    const navigate = useNavigate();

    let from:any = location?.state?.from ||  '/';

 const [error,setError]=useState<any>(null)
 const [formdata, setFormData] = useState<userI>({
    email:"",
    password:"",
})




useEffect(( ) => {
    

} , [error])

const handleChange=(e:React.ChangeEvent<HTMLElement>)=>{  
    const {name,value}:any=e.target; 
    setFormData({...formdata,[name]:value})
    console.log("signup data",formdata)
}




const loginHandler = async (e:any) =>{
    e.preventDefault();
    console.log("login")

    const {email,password} = formdata
    if(!email || !password ){

        return setError("both fields are required.");
    }
    let newData:userI = {}
    newData.email=email;
    newData.password=password;

    try{

        console.log('sign in new data', newData)

    
        
        let {data}:any=   await axios.post('/auth/signin',newData)
        if(!data){
            setError("Access denied")
        }
      
        console.log('signed in data----->', data)
        console.log('sign in new data------>', newData)

        let accessToken = data?.tokens?.access_token;
        let refreshToken = data?.tokens?.refresh_token;

        setAuth({ user:email,accessToken,refreshToken,isAuthenticated:true, });
        setIsloading(false);

        setFormData({
            email:"",
        password:"",
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


// const handleSubmit = async (e:any):Promise<any>=>{

//     const {name,email,password,cPassword} = formdata

//     let newData:userI ={}
   

//     try{

//         if(!email || !password || !cPassword){

//             return setError("fill the form properly.");
//         }

//         if(password !== cPassword){
//             return setError("confirm password doesn't match.")
//         }
//         newData.email=email;
//         newData.password=password;

//         console.log('signup form data', newData)

    
        
//       let data:any =   await axios.post('http://localhost:3001/auth/signup',newData)
//         console.log('signup data', data)


   
// }catch(err:any){
//         if(err.code ==="ERR_NETWORK"){
//             setError("Server connection failed.")
//         }
//         if(err.code === 'ERR_BAD_REQUEST'){
            
//             setError("Bad request.Can't found resources.")
//         }else{
//         setError(err.message)

//         }
//         console.log(err)

//     }

// }



  return (
    <div className='LoginSignUpContainer'>
       

        <div className='LoginSignUpBox'>
        { <h2>login</h2>}
        <form className='loginForm'  onSubmit={loginHandler}>


          {/* {signUp &&  <div>
                <AccountCircleIcon/>
                <input name='name' type='text' value={formdata.name} placeholder='name'onChange={(e)=>{handleChange(e)}}/>

            </div>} */}

            <div>
                <MailOutlineIcon />
            
                <input name='email' type='text' placeholder='email' value={formdata?.email ? formdata.email :"" } onChange={(e)=>{handleChange(e)}}/>

            </div>
            <div>
                <LockOpenIcon/>
                <input name='password' type='password' value={formdata?.password !=="" ? formdata.password:`` } placeholder='password'onChange={(e)=>{handleChange(e)}}/>

            </div> 
           
           {error &&  <p style={{color:'red'}}>{error}</p>}

           <p> Need an account? <Link to='/signup'> <span> sign up</span></Link></p>

        </form>


        <button className='loginBtn' type='submit' onClick={ loginHandler}>{'login'}</button>


        </div>



    </div>
  )
}

export default Auth