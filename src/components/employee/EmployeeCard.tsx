import { Box, Button, Paper, } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React,{FC,  } from 'react'
import { Link,  useLocation, useNavigate, } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/contexthooks/useAuth';
import useEmployee from '../../hooks/contexthooks/useEmployee';

type Props = {
  data:any
}

const EmployeeCard:FC<Props> = (props) => {
  // let {id}:any= useParams();
  const {data}= props;
  let id:any=data._id;
  const navigate = useNavigate();
  const location = useLocation()
  const {auth}:any= useAuth();

  const {isLoading,setIsloading}:any = useEmployee();
  
  console.log("user id ",id)

  // const [value, setValue]= useState({data} as any)
  // console.log('hamro new data card',data)

  
  const handleDelete = async ()=>{

    if(!isLoading){
      setIsloading(true)
    }

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
        setIsloading(false)
    
        }
        navigate('/employess' ,{replace:true})

    

    }catch(err:any){
      console.log(err.response.data.message);

    }
   

  }
  
  return (
    <Link to={`/employee/${id}`}>
    <Box sx={{display:'flex', justifyContent:'center', mt:4, marginRight:'20px' ,bgcolor:'#bbdefb' }}>
    <Paper elevation={3} sx={{p:4, minWidth:'400px',bgcolor:'#fff4c2'}}>
      
      
        <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%',color: "#696B7E"}}>First Name :</p>  <span style={{color: "#696B7E"}}>{data.firstName}</span> 
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
        <p style={{width:'40%',color: "#696B7E"}}>Last Name :</p> <span style={{color: "#696B7E"}}>{data.lastName}</span>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
      <p style={{width:'40%' ,color: "#696B7E"}}>Title :</p> <span style={{color: "#696B7E"}}>{data.title}</span>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <p style={{width:'40%',color: "#696B7E"}}>Location :</p> <span style={{color: "#696B7E"}}>{data.location}</span>
       </Box>

       <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
        <Button size='small' variant='contained' sx={{mr:1,textTransform:'capitalize'}} onClick={()=>(navigate(`/employee/${id}`))} > <VisibilityIcon fontSize='small' /> </Button>
       <Link to={`/update_employee/${id}`}> <Button size='small' variant='contained' color='success' sx={{mr:1,textTransform:'capitalize'}} > <EditIcon fontSize='small' /> </Button></Link>
      <Button size='small' variant='contained'  sx={{textTransform:'capitalize', background:'red', ":hover":{bgcolor:'red'}}} onClick={handleDelete} >  <DeleteIcon fontSize='small' /></Button>
       </Box>

    </Paper>
    </Box>
    </Link>
  )
}

export default EmployeeCard