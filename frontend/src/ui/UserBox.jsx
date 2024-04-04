import {useSetRecoilState} from "recoil"
import { modelAtom, transferUserAtom } from "../Atoms/model"

export function UsersBox({username,userId}){
    const setModal = useSetRecoilState(modelAtom)
    const setTransferUser = useSetRecoilState(transferUserAtom)
   
       return <div className="flex  justify-between lg:p-2">
   
           <div className="flex gap-2 ">
          
   
             <IconUser  width='45px' height='45px' />
          
           <h5 className="lg:text-lg text-base ">{username}</h5>
           </div>
           <button onClick={()=>{
             setTransferUser({
               userId:userId
             })
             setModal(true) 
             }} className=" bg-slate-800 rounded-md text-slate-100  px-1 font-extralight lg:font-medium text-xs lg:text-sm lg:py-3 lg:px-2">Send Money</button>
        
       </div>
   }
   