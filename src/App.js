import './App.css';
import Login from './Components/Login';
import Register from './Components/Register'
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Artboard from './Components/Artboard';
import AppContext from './Components/AppContext'
function App() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const user={
    email:email,
    name:name,
    setName,
    setEmail
  }

  return (
    <>      <AppContext.Provider value={user}>    
              <Routes>
                <Route exact path="/"
                element={
                  name && email ? <Artboard/>:<Login/>
                    }/>
                  <Route exact path="/Login" 
                      element={<Login />} />
                  <Route exact path="/Register" 
                      element={<Register />} />
                  <Route exact path="/Artboard" 
                      element={<Artboard />} />
                  
              </Routes>
              </AppContext.Provider>
    </>
  )
}

export default App;
