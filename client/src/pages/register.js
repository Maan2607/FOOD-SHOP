import { Form,Input,Button } from 'antd';
import React,{useEffect} from 'react'
import { message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
  const Register = () => {
  const dispatch=useDispatch() 
  const navigate = useNavigate()
  const handleSubmit = async(value) =>{
    if(!value.name){
      alert('Please enter name')
      return  ;
    }
   else if(!value.userId){
      alert('Please enter user ID')
      return  ;
    }
    else if(!value.emaill){
      alert('Please enter E MAIL ID')
      return  ;
    }
   else if(!value.password || !value.cpassword){
      alert('Please enter Password')
      return  ;
    }
    else if(value.password !=value.cpassword){
      alert('Password do not match')
      return  ;
    }
    try {
         dispatch({
        type: 'SHOW_LOADING'
         })
       const res =  await axios.post('/api/users/register', value) ;
        message.success("registered successfully")
        navigate('/login') 
        dispatch({type: 'HIDE_LOADING'}) ;
       
       } catch (error) {
        dispatch({type: 'HIDE_LOADING'}) ;
         message.error("User already exist")
         console.log(error)
       }  
    }

    useEffect(()=>{
      if(localStorage.getItem("auth")){
      localStorage.getItem('auth')
      navigate('/')
      }
    },[navigate])
  
  return (
    <>
    <div className='register'  >
        <div className='register-form'>

        
        <h1>POS APP</h1>
        <h3>Register Page</h3>
        <Form
         layout='vertical' 
         onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input/>
           </Form.Item>
           <Form.Item name="userId" label="User ID">
              <Input/>
           </Form.Item>
           <Form.Item name="emaill" label="E Mail">
              <Input/>
           </Form.Item>
           <Form.Item name="password" label="Password">
                <Input type='password'/>
             </Form.Item>
             <Form.Item name="cpassword" label=" Confirm Password">
                <Input type='password'/>
             </Form.Item>
            <div className='d-flex justify-content-between'>
             <p>
                Already Registered please
                <Link to='/login'>Login Here !  </Link>
             </p>
              <Button type="primary" htmlType='submit' >Register</Button>
        
            </div>
            </Form>
    </div>
    </div>
    </>
  )
};

export default Register