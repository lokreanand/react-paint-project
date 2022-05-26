import './App.css';
import Login from './Components/Login';
import Register from './Components/Register'
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
function App() {
  const [user,setLoginUser] = useState({

  })
  return (
    <>          <Routes>
                <Route exact path="/" 
                      element={<Register />} />
                  <Route exact path="/Login" 
                      element={<Login setLoginUser={setLoginUser}/>} />
                  <Route exact path="/Register" 
                      element={<Register />} />
                  
              </Routes>
    </>
  )
}

export default App;
