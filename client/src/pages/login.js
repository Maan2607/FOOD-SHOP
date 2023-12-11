import React,{useEffect} from 'react'
import { Form,Input,Button,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch= useDispatch() 
  const navigate = useNavigate()
  const handleSubmit = async(value) =>{
    try {
      dispatch({
       type: 'SHOW_LOADING'
      })
      const res = await axios.post('/api/users/login', value) ;
      localStorage.setItem('auth',JSON.stringify(res.data)) ;
     navigate('/') 
     message.success("user login successfully")
      dispatch({type: 'HIDE_LOADING'}) ;
    
    } catch (error) {
      dispatch({type: 'HIDE_LOADING'}) ;
      message.error("User don't exist")
      console.log(error) 
    }
 } ;
//  currently login user
 useEffect(()=>{
  if(localStorage.getItem('auth')){
   localStorage.getItem('auth')
   navigate('/')
  }
 },[navigate]) ;
  return (
    <>
    <div className='register'  >
        <div className='register-form'>    
        <h1>POS APP</h1>
        <h3>Login Page</h3>
        <Form
         layout='vertical' 
         onFinish={handleSubmit}>
           <Form.Item name="userId" label="User ID">
              <Input/>
           </Form.Item>
           <Form.Item name="password" label="Password">
                <Input type='password'/>
             </Form.Item>
            <div className='d-flex justify-content-between'>
             <p>
                Alredy not a user
                <Link to='/register'>Register Here !  </Link>
             </p>
              <Button type="primary" htmlType='submit' >Login</Button>
        
            </div>
            </Form>
    </div>
    </div>
    </>

  )
}

export default Login