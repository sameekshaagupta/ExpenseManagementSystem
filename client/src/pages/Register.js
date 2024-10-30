import React from 'react'
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'
const Register = () => {

  const submitHandler = (values) =>{
    console.log(values);
  }
  return (
    <>
        <div className='register-page'>
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