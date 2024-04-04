import axios from "axios";
import { atom, selector } from "recoil";

export const modelAtom = atom({
    key:"modelAtom",
    default:false
})
export const balanceAtom = atom({
    key:"balanceAtom",
    default:0
})
export const getTokenState = atom({
    key:"getToken",
    default:{
        token:null
    }
})

export const getCurrentUserState = selector({
    key:"getCurrentUser",
    get:async()=>{
     
        const response = await axios.get(`http://localhost:3000/api/v1/user/`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          return response.user
    }
})

export const transferUserAtom = atom({
    key:"transferUserAtom",
    default:null
})

export const transferAmountAtom = atom({
    key:"transferAmountAtom",
    default:null
})