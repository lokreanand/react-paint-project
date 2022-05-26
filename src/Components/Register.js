import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap';
// import MapComponent from './Map';

const Register = () => {
    const [validated, setValidated] = useState(false);
    // const [lng,setLng]=useState(-70.9)
    // const [lat,setLat]=useState(42.5)
    const navigate=useNavigate()

    const [user, setUser]= useState({
    email:"",  
    password:"",
    name:""
  })
  const onChange = (e) =>{
      setUser({ ...user, [e.target.name]: e.target.value });
  }
  
    async function onSubmit(event) {
      event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation(); 
        }
        else{
          if(user.email.length)
          await axios.post("http://localhost:5000/register",user).then((res)=>{
          if(res.data.flag===true){
            alert("Registered Successfully")
            navigate("/Login")
          }
          else if(res.data.flag===false){
            alert("User already exists") 
          }
          else{
            alert(res.data) 
          }
        }).catch((e)=>{
          alert(e.message)
        })
          }
          setValidated(true)
        }
        
    
    
    
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
        
    <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom02">
        
        <Form.Label column sm={2}>Name</Form.Label>
        <Col>
        <Form.Control column sm={10} type="text" name="name" onChange={(e) => onChange(e)} placeholder="Name" required />
        
        <Form.Control.Feedback type="invalid">
          Please provide a name.
        </Form.Control.Feedback>
        
        </Col>
      </Form.Group>

        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom03">
        
          <Form.Label column sm={2}>Email</Form.Label>
          <Col>
          <Form.Control column sm={10} type="email" name="email" onChange={(e) => onChange(e)} placeholder="Email" required />
          
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom04">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col>
          <Form.Control column sm={10} type="password" name="password" onChange={(e) => onChange(e)} placeholder="Password" required />
          
          
          <Form.Control.Feedback column sm={10} type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Col className="mb-3" md='11'>
      <Button type="submit">Register</Button>
      </Col>
        </Form>
    
    </div>
  )
}

export default Register