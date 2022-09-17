import {createContext,FC,ReactNode,useState} from 'react';

let AuthContext = createContext({})




type Props = {
    children:ReactNode
}

export const AuthProvider:FC<Props> = ({children}) => {

    const [auth ,setAuth] = useState<any>({})
    const [isLoading,setIsloading]=useState<boolean>(true)

    console.log("auth provider",auth)
    console.log("auth provider",auth.refreshToken )


  return (
      <AuthContext.Provider value={{ auth ,setAuth,isLoading,setIsloading}}>

        {
            children
        }

    </AuthContext.Provider>
  )
}

export default AuthContext