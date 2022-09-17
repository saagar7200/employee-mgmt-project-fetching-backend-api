// import { display } from '@mui/system'
import { config } from 'process'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Token } from 'typescript';
import axios from '../../api/axios';
import useRefresh from '../../hooks/apihooks/useRefresh';
import useAuth from '../../hooks/contexthooks/useAuth';
import useEmployee from '../../hooks/contexthooks/useEmployee';


type Props = {}

const CreateEmployee = (props: Props) => {

  const navigate = useNavigate();
  // let refresh:Function= useRefresh();
  let {auth}:any= useAuth();
  let {isLoading,setIsloading}:any = useEmployee();

  console.log('create access token',auth.accessToken)

  const [employeeData,setEmployeeData]= useState<any>({})


  const handleChange =(e:any) =>{
    // e.preventDefault();

    let {name,value} = e.target;

    setEmployeeData({ ...employeeData , [name]:value });

  }



  const handleSubmit = async (e:any) =>{
    e.preventDefault();

    if(!isLoading){
      setIsloading(true)
    }


    try{ 
      let config = {
        headers:{ Authorization:`Bearer ${auth?.accessToken}`},
      }


      let {response}:any =   await axios.post('/employees',employeeData,config)

      // console.log('create employee response ',response)
      // console.log('create employee access token ',auth.accessToken)

      
        setEmployeeData({})
        navigate('/employess' ,{replace:true})
        if(isLoading){
          setIsloading(false);
        }

    




    }catch(err:any){

      console.log(err.message)

    }

    console.log('request employee data------>', employeeData)

  }



  return (
    <div style={{width:'100%' ,display:'flex',alignItems:'center',flexDirection:'column',borderRadius:'10px'}}>



      <div className='btn-wrapper' style={{width:'100%',boxSizing:'border-box',borderRadius:'10px'}}>

          <h2 className='heading'> Employee Manager </h2>

          <div className='btn-container'>

            <div className='home-btn' style={{display:'flex',justifyContent:'flex-end',alignItems:'center',width:'85%'}}>
              <button className='btn' onClick={ async () =>  navigate('/') }>home</button>
            </div>
            
          </div>
          


      </div>

      <div style={{width:'100%',height:'35px',}}></div>




      <div  style={{display:'flex',alignItems:'center', flexDirection:'column',backgroundColor:'#bbdefb',width:'100%',height:'80vh',borderRadius:'10px'}}>

        <div style={{backgroundColor:'whiteSmoke',marginTop:100, minWidth:'35%',height:'auto',borderRadius:'10px' }}>

          <form  onSubmit={handleSubmit}>

        <div style={{display:'flex', justifyContent:'center',margin:30, marginTop:50  }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',minWidth:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} 
            htmlFor='firdtName'>
             First Name : 
            </label>
          <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}}
              name='firstName' 
              id='firstName' 
              type={'text'} 
              required  
              placeholder='First Name' 
              onChange={handleChange}
              ></input>

        </div>

        <div style={{display:'flex', justifyContent:'center' ,margin:30 }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='lastName'> Last Name  </label>
          <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}}
            name='lastName' 
            id='lastName' 
            type={'text'} 
            required  
            placeholder='Last Name' 
            onChange={handleChange}
            
            ></input>

        </div>

        <div style={{display:'flex', justifyContent:'center',margin:30 }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='title'> Title  </label>
          <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}}
            name='title' 
            id='title' 
            type={'text'} 
            required  
            placeholder='Title' 
            onChange={handleChange}
            
            ></input>

        </div>

        <div style={{display:'flex', justifyContent:'center',margin:30 }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} 
            htmlFor='salary'> Salary  </label>
          <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}} 
            name='salary' 
            id='salary' 
            type={'text'} 
            required  
            placeholder='Salary' 
            onChange={handleChange}
            
            ></input>

        </div>

        <div style={{display:'flex', justifyContent:'center',margin:30 }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='description'> Description </label>
          <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}}
            name='description' 
            id='description' 
            type={'text'} 
            required  
            placeholder='Description' 
            onChange={handleChange}
            
            ></input>

        </div>
        <div style={{display:'flex', justifyContent:'center',margin:30,marginBottom:40 }}>
          <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='location'> Location </label>
          <input style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px'}}
            name='location' 
            id='location' 
            type={'text'} 
            required  
            placeholder='Location' 
            onChange={handleChange}
            
            ></input>

        </div>

        <div style={{display:'flex',justifyContent:'flex-end',backgroundColor:'white',marginBottom:30,width:'85%'}}>
          <button   style={{backgroundColor:'#FFB27B',border:'none',height:'45px',width:'100px',cursor:'pointer',borderRadius:'7px',fontFamily:'Roboto',fontSize:24}} type='submit' > create </button>
        </div>
        </form>

        </div>

      </div>
    </div>
  )
}

export default CreateEmployee

function refresh() {
  throw new Error('Function not implemented.')
}
