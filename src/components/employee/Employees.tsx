import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import useEmployee from '../../hooks/contexthooks/useEmployee';
import EmployeeCard from './EmployeeCard';



type Props = {}

const Employees = (props: Props) => {

    let { employee}:any= useEmployee();
    

    console.log('Data from props',employee);

    const navigate =useNavigate();
    const location =useLocation()
  const {auth}:any=useAuth();

  useEffect( ( ) => {
    

  },[employee])


  return (
    <div style={{backgroundColor:"#fff"}}>
         <div className='btn-wrapper'>
          <h2 className='heading'> Employee Manager </h2>

          { !auth.isAuthenticated ? (

          <div className='btn-container' style={{width:'30%',paddingRight:10,boxSizing:'border-box'}}>

          <div className='home-btn' >
            <button className='btn' onClick={ async () =>  navigate('/signin',{state:{from:location}}) }>sign in</button>
          </div>
          <div className='home-btn'>
            <button className='btn' onClick={ async () => navigate('/signup')}> sign up</button>
          </div>
          <div  className='home-btn'>
              <button style={{}} className='btn' onClick={() =>  navigate('/')}>Home</button>

            </div>
          
        </div>
            ):(
              <div style={{display:'flex',justifyContent:"space-around",alignItems:'center',width:"25%"}}>
              <div  className='home-btn'>
              <button style={{}} className='btn' onClick={() =>  navigate('/')}>Home</button>

            </div>
              <div  className='home-btn'>
              <button style={{}} className='btn' onClick={() =>  navigate('/add_employee')}> Add New</button>

            </div>
            </div>
            )}





        </div>
        {/* <div style={{backgroundColor:'red',width:'100%',height:'50%'}}></div> */}

        <div style={{display:'flex', justifyContent:'center'}}>


        <div className='user-table-container' style={{display:'flex',flexWrap:'wrap', justifyContent:'center', width:'60%' ,backgroundColor:'#fff', }}>
            {
               employee.length > 0 && employee.map((data:any)=>{
                 return   <EmployeeCard  data={data}  key={data._id}/>


                })
            }

            


        </div>
        </div>
    </div>
  )
}

export default Employees