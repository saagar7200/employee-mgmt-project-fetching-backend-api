import { Typography } from '@mui/material';
import React,{useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios';
import useAuth from '../../hooks/contexthooks/useAuth';
import useEmployee from '../../hooks/contexthooks/useEmployee';


type Props = {}

const UpdateEmployee = (props: Props) => {
  const [employeeData,setEmployeeData]= useState<any >()


  const navigate = useNavigate();
  const location:any = useLocation()
//   let from:any = location?.state?.from || '/'
  const {id}:any= useParams();
  console.log('update employee params id',id)
  let {auth}:any= useAuth();

  const {employee,setEmployee,isLoading ,setIsloading}:any = useEmployee();






    console.log("context emp data update page-->",employee)


    
let updateUser:any = employee.length > 0 &&  employee.filter((emp:any) => emp._id === id )


//   updateUser &&  setEmployeeData(updateUser);



console.log("filtered user ",updateUser);

// console.log("formdata after filter", employeeData)
    





  const handleChange =(e:any) =>{
    e.preventDefault();

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


      let {data}:any =   await axios.patch(`/employees/${id}`,employeeData,config)


      if(data){
        setEmployeeData({
            title: "",
        firstName: "",
        lastName: "",
        salary: 0,
        location: "",
        description: "",
        })


      }
      if(isLoading){
        setIsloading(false)

      }
      navigate( `/employess`);

    //   setEmployee({})
      console.log(employee)






      console.log('update employee response----> ',data)
      console.log('update employee access token --->',auth.accessToken)




    }catch(err:any){

      console.log(err.message)

    }

    console.log('request employee data------>', employeeData)

  }



  return (
    <>
        { updateUser.length > 0 ? (
            <div style={{width:'100%' ,display:'flex',alignItems:'center',flexDirection:'column'}}>



            <div className='btn-wrapper' style={{width:'100%'}}>
      
                <h2 className='heading'> Employee Manager </h2>
      
                <div className='btn-container'>
      
                  <div className='home-btn'>
                    <button className='btn' onClick={ async () =>  navigate('/') }>home</button>
                  </div>
                  {/* <div className='home-btn'>
                    <button className='btn' onClick={ async () => navigate('/signup')}> </button>
                  </div> */}
                </div>
      
      
            </div>

            <div style={{width:'100%',height:'35px'}}></div>
      
      
      
            <div  style={{display:'flex',alignItems:'center' , flexDirection:'column',backgroundColor:'#bbdefb',width:'100%',height:'80vh',borderRadius:10,}}>
      
              <div style={{backgroundColor:'whiteSmoke',marginTop:100, minWidth:'35%',height:'auto',borderRadius:'10px' }}>
      
                <form  onSubmit={handleSubmit}>
      
              <div style={{display:'flex', justifyContent:'center',margin:30, marginTop:50 }}>
                <label style={{display:'flex',backgroundColor:'whiteSmoke',minWidth:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} 
                  htmlFor='firdtName'>
                   First Name : 
                  </label>
                <input  style={{border:'none',outline:'none',height:'45px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E',}}
                    name='firstName' 
                    value={employeeData ? employeeData.firstName : updateUser[0].firstName}
                    id='firstName' 
                    type={'text'} 
                    required  
                    placeholder='First Name' 
                    onChange={handleChange}
                    ></input>
      
              </div>
      
              <div style={{display:'flex', justifyContent:'center' ,margin:30 }}>
                <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='lastName'> Last Name  </label>
                <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E'}}
                  name='lastName' 
                  id='lastName' 
                  value={employeeData ? employeeData.lastName : updateUser[0].lastName}

                  type={'text'} 
                  required  
                  placeholder='Last Name' 
                  onChange={handleChange}
                  
                  ></input>
      
              </div>
      
              <div style={{display:'flex', justifyContent:'center',margin:30 }}>
                <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='title'> Title  </label>
                <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E'}}
                  name='title' 
                  value={employeeData ? employeeData.title : updateUser[0].title}
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
                <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E'}} 
                  name='salary' 
                  id='salary' 
                  value={employeeData ? employeeData.salary : updateUser[0].salary}

                  type={'text'} 
                  required  
                  placeholder='Salary' 
                  onChange={handleChange}
                  
                  ></input>
      
              </div>
      
              <div style={{display:'flex', justifyContent:'center',margin:30 }}>
                <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='description'> Description </label>
                <input  style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E'}}
                  name='description' 
                  id='description' 
                  type={'text'} 
                  value={employeeData ? employeeData.decscription : updateUser[0].description}

                  required  
                  placeholder='Description' 
                  onChange={handleChange}
                  
                  ></input>
      
              </div>
              <div style={{display:'flex', justifyContent:'center',margin:30,marginBottom:40 }}>
                <label style={{display:'flex',backgroundColor:'whiteSmoke',width:'30%',height:'40px',alignItems:'center',fontSize:25,fontFamily:'Roboto',color:'#696B7E'}} htmlFor='location'> Location </label>
                <input style={{border:'none',outline:'none',height:'40px',width:'40%',fontSize:20,boxSizing:'border-box',paddingLeft:10,borderBottom:'2px solid  #696B7E',borderRadius:'5px',color:'#696B7E'}}
                  name='location' 
                  id='location' 
                  type={'text'} 
                  value={employeeData ? employeeData.location : updateUser[0].location}

                  required  
                  placeholder='Location' 
                  onChange={handleChange}
                  
                  ></input>
      
              </div>
      
              <div style={{display:'flex',justifyContent:'flex-end',backgroundColor:'white',marginBottom:30,width:'85%'}}>
                <button  style={{backgroundColor:'#FFB27B',border:'none',height:'45px',width:'100px',cursor:'pointer',borderRadius:'7px',fontFamily:'Roboto',fontSize:24}} type='submit' > update </button>
              </div>
              </form>
      
              </div>
      
            </div>
          </div>
        ):(<div>
            <Typography>User not found</Typography>
            </div>)}  
    </>
  )
}

export default UpdateEmployee


