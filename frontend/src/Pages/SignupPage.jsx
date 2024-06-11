

import { useForm } from "react-hook-form"
import AuthWrappper from "../ui/AuthWrappper"
import toast, { Toaster } from 'react-hot-toast';
import {  useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function SignupPage() {

    return <AuthWrappper
    heading={"Sign Up"}
  guide={"Enter your information to create an accoun"}
  referenceInfo={"Already have an account?"}
  reference={" Login"} 
  path={"/login "}
    >
 
  
        <FormComponent />
        <Toaster />
    </AuthWrappper>
    
  }


function FormComponent(){
  const {register,formState:{errors},handleSubmit} = useForm()
  const [formData,setFormData] = useState(null)
  const navigate = useNavigate()
  const toaster = (message) => toast(message)
useEffect(()=>{

async function postData(){
 if(formData === null){
    return
  }
try{
 
    const {data} =await axios.post("https://payment-app-03ff.onrender.com/api/v1/user/signup",
    {...formData},
    {headers:
      {"content-type":"application/json"}
    }

  )

 
localStorage.setItem("token",data?.token )

navigate("/dashboard")
  }catch(e){
  
    
      toaster("There is a error in server")
    
console.log(e)

  }
 

}


postData()

},[formData,navigate])

const onSucces =(data)=>{
const {firstname,lastname,email:username,password} = data
setFormData({
  firstname,
  lastname,
  username,
  password
})
}
const onError = (error) =>{
  console.log(error)
}

  return  <form className="flex flex-col  gap-1 items-start font-semibold text-lg" onSubmit={handleSubmit(onSucces,onError)}>


<label className="text-sm text-slate-600"  htmlFor="firstname">First Name</label>

<input className="px-1 text-sm self-stretch rounded-md border  border-slate-500 focus:outline-none" 
type="text" id="firstname" placeholder="John"  {...register("firstname",{required:"This field is required"})}  aria-invalid={errors.firstname?"true":"false"} />
{errors.firstname && <p className="text-sm text-red-500">This Field is required</p>}



<label className="text-sm text-slate-600"  htmlFor="lastname">Last Name</label>
<input className="px-1 text-sm self-stretch rounded-md border  border-slate-500 focus:outline-none" type="text" id="lastname" placeholder="Doe"
 {...register("lastname",{required:"This field is required"})} aria-invalid={errors.lastname?"true":"false"}/>
{errors.lastname && <p className="text-sm text-red-500">This Field is required</p>}


<label  className="text-sm text-slate-600" htmlFor="email">Email</label>
<input className="px-1 text-sm self-stretch rounded-md border  border-slate-500 focus:outline-none" type="text" id="email" placeholder="johndoe@example.com" 
{...register("email",{required:"This field is required"})} aria-invalid={errors.email?"true":"false"}/>
{errors.email && <p className="text-sm text-red-500">This Field is required</p>}

<label  className="text-sm text-slate-600" htmlFor="password">Password</label>
<input className="px-1 text-sm self-stretch rounded-md border  border-slate-500 focus:outline-none" type="password" id="password"  
{...register("password",{required:"This field is required"})} aria-invalid={errors.password?"true":"false"}/>
{errors.password && <p className="text-sm text-red-500">This Field is required</p>}

<input type="submit" value="Sign Up" className="bg-slate-900 rounded-lg p-1 text-slate-50 self-stretch" / >

  </form>
}



