import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap';
import AppContext from "./AppContext";
// import { baseURL } from '../authAPI';


const Login = () => {
    const [validated, setValidated] = useState(false);
    const navigate=useNavigate()
    const context=useContext(AppContext)
    const [user, setUser]= useState({
    email:"",  
    password:""
  })
  const baseURL=process.env.REACT_APP_BASE_URL
  const onChange = (e) =>{
      setUser({ ...user, [e.target.name]: e.target.value });
  }
  
    async function onSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation(); 
        }
        else{
            await axios.post(`${baseURL}/login`,user).then((res)=>{
            if(res.data.flag===true){
              alert("Logged in Successfully")
              context.setName(res.data.user.name)
              context.setEmail(res.data.user.email)
              navigate("/")
            }
            else if(res.data.flag===false){
              alert("Wrong password") 
            }
            if(res.data.flag==="False"){
              alert("Email not registered") 
            }
          // navigate("/")
          // alert("Login successfully")
          // console.log(res.data.user)
        }).catch((e)=>{
          console.log(baseURL)
          
          alert(e.message)
        })

          }
          setValidated(true)
        }
        
    
    const register = () =>{
      navigate("/")
    }
    
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
        
        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom03">
        
          <Form.Label column sm={2}>Email</Form.Label>
          <Col>
          <Form.Control column sm={10} type="email" name="email" onChange={(e) => onChange(e)} placeholder="Email" required/>
          
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom04">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col>
          <Form.Control column sm={10} type="password" name="password" onChange={(e) => onChange(e)} placeholder="Password" required/>
          
          
          <Form.Control.Feedback column sm={10} type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Col className="mb-3" md='11'>
      <Button type="submit">Login</Button>
      </Col>
        </Form>
        <Col className="mb-3" md='11'>
      <Button onClick={register}>Register</Button>
      </Col>
    
    </div>
  )
}

export default Login