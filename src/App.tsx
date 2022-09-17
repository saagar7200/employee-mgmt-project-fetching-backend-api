import React, {useEffect, useState}from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import EmployeeDetail from './components/employee/EmployeeDetail';
import CreateEmployee from './components/employee/CreateEmployee';
import Employees from './components/employee/Employees';
import Home from './components/Home';
import useData from './hooks/apihooks/useData';
import useEmployee from './hooks/contexthooks/useEmployee';
import useRefresh from './hooks/apihooks/useRefresh';
import SignIn from './components/auth/SignIn';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import UpdateEmployee from './components/employee/UpdateEmployee';
import SignUp from './components/auth/SignUp';


function App() {
  const  getEmployee:Function = useData ();

  const getRefresh:Function = useRefresh;

  // const handleEdit = () => {
  // }

  // const [Isloading,setIsloading]=useState<boolean>(true)

  let {employee,isLoading,setIsloading}:any = useEmployee();
  console.log('isloading app ' ,isLoading)

  console.log('`loading`')


  useEffect( ( ) => {
    // getRefresh()


    getEmployee();
    setIsloading(false)

 },[isLoading])


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>

        <Route path='/employess' element={<Employees/>}/>


        <Route element={<ProtectedRoute/>}>
            <Route path='/employee/:id' element={<EmployeeDetail/>}/>
            <Route path='/add_employee/' element={<CreateEmployee/>}/>
            <Route path='/update_employee/:id'  element={<UpdateEmployee/>}/>
        </Route>



      
    </Routes>
    </BrowserRouter>
      
   </div>
  );
}

export default App;
