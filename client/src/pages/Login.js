import {Form, Input, message} from 'antd'
import {Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Spinner from '../components/Spinner';
import axios from 'axios';

const Login = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
    const submitHandler = async (values) => {
        try {
          setLoading(true)
          const {data} = await axios.post('/users/login', values)
          console.log(data); 
          setLoading(false)
          message.success('Login successfull')

          if (data.success && data.user) {
            localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
            message.success('Login successful');
            navigate('/');
          } else {
            message.error('User data not found');
          }
          navigate('/')
        } catch (error) {
          setLoading(false)
          const errorMessage = error.response?.data?.message || 'An error occurred';
          message.error(errorMessage);
        }
    };
  return (
    <>
        <div className='register-page'>
          {loading && <Spinner/>}
            <Form layout='vertical' onFinish={submitHandler}>
              <h3>Login Form</h3>
              <Form.Item label="Email" name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password'/>
              </Form.Item>
              <div className='d-flex justify-content-between'>
                <Link to="/register" >Not a user? Click here to register!</Link>
                <button className='btn btn-primary'>Login</button>
              </div>
            </Form>
        </div>
    </>
  )
}

export default Login