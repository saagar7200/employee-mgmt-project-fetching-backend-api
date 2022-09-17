import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

import './home.css'

type Props = {}

const Home = (props: Props) => {

  const navigate = useNavigate();
  const {auth}:any=useAuth();


 


 

  return (
    <div className="home-main-container ">

      <div className='home-container'>

        <div className='btn-wrapper'>
          <h2 className='heading'> Employee Manager </h2>

          {!auth.user ? (
            <div className='btn-container'>

            <div className='home-btn'>
              <button className='btn' onClick={  () =>  navigate('/signin')}>sign in</button>
            </div>
            <div className='home-btn'>
              <button className='btn' onClick={() =>  navigate('/signup')}> sign up</button>
            </div>
            {/* <div  className='home-btn'>
              <button className='btn' onClick={() =>  navigate('/add_employee')}> Home</button>

            </div> */}
            
          </div>
          ):(
            <div className='btn-container'>


            <div  className='home-btn' style={{ display:'flex',justifyContent:'flex-end',width:'85%' }}>
              <button style={{}} className='btn' onClick={() =>  navigate('/add_employee')}> Add New</button>

            </div>

            <div  className='home-btn'>
              {/* <button className='btn' onClick={() =>  navigate('/')}> Home</button> */}

            </div>
          </div>

          )}


        </div>


        <div style={{width:'100%',height:'20%'}}></div>




        <div className='home-user-wrapper' style={{maxHeight:'80vh',display:'flex', flexDirection:'row', alignItems:'flex-start',justifyContent:'space-evenly',}} >

          <div className='user-container' style={{ height:'5%',width:'15%',display:'flex',alignItems:'center'}}>
            <Link style={{height:'40px',width:'1000px',padding:5,display:'flex',justifyContent:'center',alignItems:'center',boxSizing:'border-box',fontSize:27}} 
              className='employee-link' 
              to='/employess'  
              > view employes... 
            </Link>

          </div>
          <div className='user-container' style={{ height:'5%',width:'15%',display:'flex',alignItems:'center'} }>

            <Link style={{height:'40px',width:'1000px',padding:5,display:'flex',justifyContent:'center',alignItems:'center',boxSizing:'border-box',fontSize:27}}
              className='employee-link' 
              to='/add_employee' 
              > add new employee 
            </Link>

          </div>

        

        </div>


        


      </div>


    </div>
  )
}

export default Home