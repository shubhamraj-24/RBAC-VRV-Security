import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Layout/Header.tsx";
import { useContext} from "react";
import { UserInfoContext } from "../Contexts/UserInfoContext.tsx";
const PrivateRoutes = () => {
  const token = Cookies.get("token");
  const { userInfoState} = useContext(UserInfoContext);

// const [tokenAccess , setTokenAccess] = useState(false)

 console.log("userInfoState?.UserInfo",userInfoState?.UserInfo?.tokenExpiry ," Date.now()/1000" , Date.now()/1000)

  if(token && userInfoState?.UserInfo?.tokenExpiry > Date.now()/1000){
    return <>
     <Header /> <Outlet />
    </>
  }

  return <Navigate to="/login" />

};

export default PrivateRoutes;
