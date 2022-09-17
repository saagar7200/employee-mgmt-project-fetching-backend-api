import { Box, Button, Paper } from '@mui/material'
// import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React,{FC,} from 'react'
import useEmployee from '../../hooks/contexthooks/useEmployee';
import { useNavigate, useParams } from 'react-router-dom';
import useRefresh from '../../hooks/apihooks/useRefresh';
import axios from '../../api/axios';
import useAuth from '../../hooks/contexthooks/useAuth';
// import Auth from '../auth/SignIn';

type Props = {
  data?:any
}

const EmployeeDetail:FC<Props>  = () => {
  const {id}:any =  useParams()
  const navigate = useNavigate()

  const {auth}:any = useAuth();
   
  const  {employee,isLoading,setIsloading}:any = useEmployee();
  if(employee.length === 0 && !isLoading){
    setIsloading(true)
  }



  
  console.log('hamro new data id',id)
  console.log("employee  from details",employee)

  // console.log("employee id from details",value[0]._id)


  let data:any  = employee.length  > 0 && employee.filter((emp:any) =>  emp._id === id  );

  const getRefresh:Function = useRefresh();

  // const handleEdit = () => {
  //   getRefresh()
  // }

  const handleDelete = async ()=>{

    let config = {
      headers:{
        Authorization:`Bearer ${auth.accessToken}`,
        'Content-type':'application/json'
      }

    
    }

    try{


      const response:any = await axios.delete(`/employees/${id}`,config)

      console.log('delete response',response)


      if(response){
        setIsloading(true)
        navigate('/employess' ,{replace:true})
    
        }
    

    }catch(err:any){
      console.log(err.response.data.message);

    }
   

  }

 

  // console.log('hamro new  details data ',data)
  
  return (
    <>
    {
        data.length > 0 && (<>

          <div className='btn-wrapper' >
          <h2 className='heading' style={{display:'flex',alignItems:'center'}}> Employee Manager </h2>

         { ! auth.user &&  <div className='btn-container'>

            <div className='home-btn'>
              <button className='btn' onClick={ async () =>  navigate('/signin') }>sign in</button>
            </div>
            <div className='home-btn'>
              <button className='btn' onClick={ async () => navigate('/signup')}> sign up</button>
            </div>
          </div>}
          {/* <div  className='home-btn' style={{display:'flex',justifyContent:"flex-end",alignItems:'center',width:"25%"}} >
              <button style={{}} className='btn' onClick={() =>  navigate('/')}>Home</button>

            </div> */}
            <div style={{display:'flex',justifyContent:"space-around",alignItems:'center',width:"25%"}}>
              <div  className='home-btn'>
              <button style={{}} className='btn' onClick={() =>  navigate('/')}>Home</button>

            </div>
              <div  className='home-btn'>
              <button style={{}} className='btn' onClick={() =>  navigate('/add_employee')}> Add New</button>

            </div>
            </div>


        </div>

        <div style={{width:'100%',height:'50%'}}></div>

        <Box sx={{display:'flex', justifyContent:'center', mt:0, marginRight:'20px' ,bgcolor:'#bbdefb' ,height:'90vh' ,width:'100%' }}>
      <Paper elevation={3} sx={{p:4, minWidth:'400px',bgcolor:'#fff4c2',mt:8, maxHeight:'45%',marginTop:"10%" } }>
      
      
        <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%', color: "#696B7E"}}>First Name :</p >  <span style={{ color: "#696B7E"}}>{data[0].firstName}</span> 
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
        <p style={{width:'40%', color: "#696B7E"}}>Last Name :</p> <span style={{ color: "#696B7E"}}>{data[0].lastName}</span>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
      <p style={{width:'40%', color: "#696B7E"}}>Position :</p> <span style={{ color: "#696B7E"}}>{data[0].title}</span>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%', color: "#696B7E"}}>Salary :</p> <span style={{ color: "#696B7E"}}> NRs. {data[0].salary}K</span>
       </Box>
       <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%', color: "#696B7E"}}>Location :</p> <span style={{ color: "#696B7E"}}>{data[0].location}</span>
       </Box>
       <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%', color: "#696B7E"}}>Description :</p> <span style={{ color: "#696B7E"}}>{data[0].description}</span>
       </Box>

       <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
        <Button size='small' variant='contained' color='success' sx={{mr:1,textTransform:'capitalize'}}  onClick={ ()=>{navigate(`/update_employee/${id}`)}} > <EditIcon fontSize='small' /> </Button>
        <Button size='small' variant='contained'  sx={{textTransform:'capitalize', background:'red', ":hover":{bgcolor:'red'}}} onClick={handleDelete}  >  <DeleteIcon fontSize='small' /></Button>
       </Box>

    </Paper>
    </Box>

      </>)
    }

    </>
  )
}

export default EmployeeDetail