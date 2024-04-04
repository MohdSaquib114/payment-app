
import { useForm } from "react-hook-form"
import AuthWrappper  from "../ui/AuthWrappper";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  return <AuthWrappper heading={"Sign In"}
  guide={"Enter your credentials to access your account"}
  referenceInfo={"Don't have an account?"}
  reference={" Sign Up"} 
  path={"/signup"}
   >
    <Form />
    <Toaster />
  </AuthWrappper>
  
}


function Form(){
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [signinData,setSigninData] =  useState(null)
    const navigate = useNavigate()
    const toaster = (message ) => toast(message)
    useEffect(()=>{
    async function signinPost(){
      if(signinData === null){
        return
      }
      try{
        const {data}= await axios.post("http://localhost:3000/api/v1/user/signin",{
          ...signinData
        },{headers:
          {"content-type":"application/json"}})
        if(data.error){
          toaster(data.error)
          return
        }
        const token = localStorage.getItem("token")
       
        if(token){
          localStorage.removeItem("token")
          localStorage.setItem("token",data.token)
          navigate("/dashboard")
          
        }else{
          localStorage.setItem("token",data.token)
          navigate("/dashboard")
        }
      }catch(e){

      toaster(e?.response?.data.message || e.message)
      }
    }
    signinPost()  
    
    },[signinData,navigate]) 

    const onSubmitHandler = (data)=>{
      const {email:username, password} = data
      setSigninData({username,password})
     }
      return  <form className="flex flex-col gap-3 items-start font-semibold text-lg" onSubmit={handleSubmit(onSubmitHandler)}>
   
    <label className="text-sm"  htmlFor="email">Email</label>
    <input className="p-1 text-sm self-stretch rounded-md border  border-slate-700 focus:outline-none" type="text" id="email"
     placeholder="johndoe@example.com" {...register("email",{required:"This field is required"})} aria-invalid={errors.email?"true":"false"}/>
    {errors.email && <p className="text-xs text-red-500">This Field is required</p>}

    <label className="text-sm"  htmlFor="password">Password</label>
    <input className="p-1 self-stretch rounded-md border text-sm border-slate-700 focus:outline-none" type="password" id="password"  aria-invalid={errors.password?"true":"false"}
    {...register("password",{required:"This field is required"})} />
      {errors.password && <p className="text-xs text-red-500">This Field is required</p>}
    
    <input type="submit" value="Sign In" className="bg-slate-900 rounded-lg p-2 text-slate-50 self-stretch" / >
    
      </form>
    }
   