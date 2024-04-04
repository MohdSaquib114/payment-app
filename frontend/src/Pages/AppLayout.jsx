import main_img from '../main.jpeg'
import Navbar from '../ui/Navbar'

export default function AppLayout() {
  return (
    <div className='lg:w-screen h-screen bg-slate-100    ' >
          <Navbar btnText={"Sign Up"} />
          <div className='p-2 bg-slate-200'>
            <p className='text-xs  lg:text-sm font-medium text-center'>Experience seamless payments with our intuitive app, making transactions secure, convenient, and rewarding.</p>
          </div>
          <div className=" grid lg:grid-cols-2 gap-10 place-items-center  p-10 ">

                <div className='flex flex-col gap-4'>
               <h1 className='text-3xl font-extrabold text-center text-blue-400 '>
                PAYMENT APP
                </h1>
                <h2 className=' font-medium text-md text-center text-slate-800'>Welcome to Paytment app, your one-stop destination for seamless digital payments and more! With our user-friendly platform, you can easily recharge your mobile, pay bills, book flights, trains, and buses, shop online, and much more – all in one place.</h2>
                </div>
               
                <div className="">
                  <img src={main_img} alt="landing-img" className=" lg:w-80 lg:h-96 w-80 rounded-md " />
                </div>
          </div>
    </div>
  )
}
