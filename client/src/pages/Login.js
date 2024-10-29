
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'

import React from 'react'

const Login = () => {
    const submitHandler = (values) => {
        console.log(values);
    }
  return (
    <>
        <div className='register-page'>
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