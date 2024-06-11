import {BrowserRouter, Route,Routes } from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import Dashboard from "./Pages/Dashboard"
import AppLayout from "./Pages/AppLayout"
import {RecoilRoot} from 'recoil';

 

function App() {

  return (
      <RecoilRoot>
    <BrowserRouter>

     <Routes>

       <Route path="/" element={<AppLayout />} />
       <Route  path="/signup" element={<SignupPage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>

    
      
    </BrowserRouter>
      </RecoilRoot>
  )
}

export default App
