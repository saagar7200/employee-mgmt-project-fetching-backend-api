import {createContext,FC,ReactNode,useState} from 'react';

let EmployeeContext = createContext({})




type Props = {
    children:ReactNode
}

export const EmployeeProvider:FC<Props> = ({children}) => {

    const [employee ,setEmployee] = useState<any>({})
    const [isLoading,setIsloading]=useState<boolean>(true)

  return (
      <EmployeeContext.Provider value={{ employee ,setEmployee,isLoading,setIsloading}}>

        {
            children
        }

    </EmployeeContext.Provider>
  )
}

export default EmployeeContext