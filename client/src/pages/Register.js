import React, { useEffect } from 'react'
import axios from 'axios'
import {Form, Input, message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HashLoader } from 'react-spinners'
const Register = () => {
  const [loading,setLoading] =useState(false)
  const navigate = useNavigate()
  const submitHandler = async (values) =>{
    try {
      setLoading(true)
      await axios.post('/users/register', values)
      message.success('Registration Successfull')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      message.error("Something went wrong")
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])
  return (
    <>
        <div className='register-page'>
          {loading && <HashLoader/>}
            <Form layout='vertical' onFinish={submitHandler}>
              <h3>Registration Form</h3>
              <Form.Item label="Name" name="name">
                <Input/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password'/>
              </Form.Item>
              <div className='d-flex justify-content-between'>
                <Link to="/login" >Already Registered? Click here to login</Link>
                <button className='btn btn-primary'>Register</button>
              </div>
            </Form>
        </div>
    </>
  )
}

export default Register