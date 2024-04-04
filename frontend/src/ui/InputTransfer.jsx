import toast from "react-hot-toast";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { modelAtom, transferUserAtom } from "../Atoms/model";
import { useState } from "react";
import axios from "axios";

export function InputTransfer(){
    const [amount,setAmount] = useState("");
     
    const {userId}  = useRecoilValue(transferUserAtom)
    const setModel = useSetRecoilState(modelAtom);
    const toaster = (message)=>toast(message)

    function transferInit(){
        try{
            async()=>{
                if(amount === null || userId === null){
                   return
                 }
                 const token = localStorage.getItem("token")
                 const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                   amount:amount,
                   to:userId
                 }
                 ,
                 {
                   headers:{
                     "content-type":"application/json",
                     Authorization:`Bearer ${token}`
           
                   }
                 }
                 )
                 
                 setModel(false)
                 toaster(response.data.message)
               }
        }catch(e){
            toaster(e.message)
        }
    }
  
    return <>
     <input className="rounded-md focus:outline-none border-2 p-2"
      onChange={(e)=>{setAmount(e.target.value)
      }}
      type="text" />
      <button onClick={transferInit} className="bg-green-500 rounded-md p-2 text-slate-50">Initiate Transfer</button>
  
    </>
  }