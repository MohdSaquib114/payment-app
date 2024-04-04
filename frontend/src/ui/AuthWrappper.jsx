
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import signupImg from '../signup.jpeg'

export default function AuthWrappper({heading,guide,referenceInfo,reference,children,path}) {
  
  return (
    <main className="w-screen h-screen bg-slate-100 ">
      <Navbar btnText={heading} />
      <div className=' lg:flex lg:justify-around  p-5'>
        <div className="flex flex-col gap-4 bg-slate-50   p-10 rounded-lg shadow-xl text-center ">
            <h1 className="font-bold text-2xl ">{heading}</h1>
            <h3 className=" text-lg text-slate-600">{guide}</h3>
            {children}
            <h4 className="text-sm">{referenceInfo}
            <Link className="underline" to={path}>{reference}</Link>
            </h4>
        </div>
        <img className=' w-80 rounded-md shadow-md lg:block hidden' src={signupImg} alt="img" />
   </div>
</main>
  )
}
