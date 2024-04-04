import { InputTransfer } from "./InputTransfer";

export function TransferComponent(){


    return <div className="w-full h-full absolute backdrop-blur-sm flex items-center justify-center ">
  <div  className="bg-slate-50  p-10 shadow-lg flex flex-col gap-6 ">
    <h1 className="text-4xl font-bold">Send Money</h1>
    
      <h2 className="text-xl "><span className=" bg-green-500 rounded-full px-5 py-3 ">A</span> Freind Name</h2>
      <p>Amount</p>
     
    <InputTransfer />
  </div>
  
    </div>
  }