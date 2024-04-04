
import { Link, useLocation } from "react-router-dom"
import logo from "../logo.jpeg"
import IconBxsUser from "./IconBxsUser"

export default function Navbar({btnText}) {
    
   const location =  useLocation()
   let navigate = "/signup"

   if(location.pathname === "/signup"){
    navigate = "/login"
  
   }

  return (
    <nav className=" bg-teal-50  p-2 shadow-md flex justify-between">
        <Link to={"/"} className="flex gap-1">
      <img className=" w-12 h-12  rounded-full" src={logo} alt="logo-image" />
    <p className="self-center text-xl font-bold text-cyan-700">PAYMENT APP</p>
        </Link>
      <Link onClick={()=>{
       if( location.pathname !== "/dashboard") return
       console.log("object")
     
      }} className=' bg-blue-400 px-3 text-slate-100  rounded-r-full  rounded-l-full flex gap-2   ' to={navigate}>
       <p className="h-1/2   text-md font-medium self-center">
        {btnText}
        </p>
        <i className=" self-center">

      <IconBxsUser />
        </i>
      </Link>
    </nav>
  )
}

// 