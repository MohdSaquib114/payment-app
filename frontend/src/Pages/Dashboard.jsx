import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue,  } from "recoil"
import {  modelAtom,  } from "../Atoms/model"
import  { Toaster } from 'react-hot-toast';
import Navbar from "../ui/Navbar";
import { useBalance, useUserDetail } from "../utility/hooks";
import { nameCorrector } from "../utility/utilities";
import IconEye from "../ui/EyeIcon";
import IconEyeOff from "../ui/EyeIconOff";
import Card from "../ui/Card";


import { TransferComponent } from "../ui/TrasnsferComponent";
import { UsersBox } from "../ui/UserBox";


export default function Dashboard() {
  const [visible,setVisible] = useState(false);
  const model = useRecoilValue(modelAtom);
const balance = useBalance()

const user = useUserDetail()
const fullName  = `${nameCorrector(user?.firstname)} ${nameCorrector(user?.lastname)}`



  return (
    <main className="w-screen h-screen font-bold overflow-x-hidden ">
      <Navbar btnText={user?.username.slice(0,7)} />
      {model && <TransferComponent />}
    
      <div className=" p-8 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-5  ">
                <Card className=" flex flex-col gap-5 border  p-5">
                        <div>
                            <h3 className="lg:text-2xl text-slate-700">Balance </h3>
                            <h4 className=" text-cyan-600 "> ${visible?balance.balance:"****"}.0</h4>
                        </div>
                        <div onClick={()=>setVisible(!visible)}>
                            { visible ? <IconEye /> : <IconEyeOff /> }
                        </div>
               </Card>
                <Card >
                        <h3 className="lg:text-2xl font-bold text-slate-700 place-self-start ">{fullName}</h3>
                        <h4 className="lg:text-2xl text-slate-700 place-self-start break-all "> {user?.username}</h4>
                </Card>
        </div>
       <User />
       <Toaster />

      </div>

    </main>
  )
}


function  User(){
  const [ query,setQuery] = useState("")
  const [users,setUsers]  = useState([])

useEffect(()=>{

  async function getUser()
  {
    const token = localStorage.getItem("token")
    const {data} = await axios.get(`https://payment-app-03ff.onrender.com/api/v1/user/bulk?filter=${query}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setUsers(data?.user)

  }
  getUser()
},[query])
  return <>
   <input type="search"
    placeholder="Search by user name..." 
    className="p-4 focus:outline-none rounded-md border-2 "
    onChange={(e)=>setQuery(e.target.value)}
    />
        <div className="flex flex-col gap-5">

        {
              users.map((user,id)=><UsersBox key={id+user.username} username={user.username} userId={user._id}/>)
        }
        </div>
  
  </>
}


