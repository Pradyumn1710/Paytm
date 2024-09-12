import './App.css'
import { Dashboard } from './Pages/Dashboard'
import { SendMoney } from './Pages/SendMoney'
// import { SendMoney} from './Pages/SendMoney'
import Signin from './Pages/signin'
import Signup from './Pages/signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        {/* <Route path="/SendMoney" element={<SendMoney />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  </div>

 
}

export default App
