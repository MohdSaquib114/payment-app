import axios from "axios"
import { useEffect, useState } from "react"


export function useBalance(){



const [balance,setBalance ] = useState(0)


useEffect(()=>{
    
async function getBalance()
{
const token = localStorage.getItem("token")
const {data} = await axios.get("http://localhost:3000/api/v1/account/balance",{
headers:{
  Authorization:`Bearer ${token}`
}
})
setBalance(data.balance)

}
getBalance()
})

return balance;
}
export function useUserDetail(){



const [user,setUser ] = useState()


useEffect(()=>{

async function getUser()
{
const token = localStorage.getItem("token")
const {data} = await axios.get("http://localhost:3000/api/v1/user/",{
headers:{
  Authorization:`Bearer ${token}`
}
})

setUser(data.user)

}
getUser()
},[])

return user;
}
export  function useToken(){
    const [token,setToken] = useState("");

    useEffect(()=>{
    setToken(localStorage.getItem('token', ))
    },[])
    return token
}