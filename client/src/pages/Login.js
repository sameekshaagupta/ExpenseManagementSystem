import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import "../styles/LoginPage.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/v1/users/login', values);
      setLoading(false);

      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
        message.success('Login successfull');
        navigate('/');
      } else {
        message.error('User data not found');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <HashLoader />
        </div>
      )}
      <div className='register-page' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className='login-form'>
          <Form className='hehe' layout='vertical' onFinish={submitHandler}>
            <h3 className='text-center'>Login Form</h3>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
              <Input type='email' />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
              <Input type='password' />
            </Form.Item>
            <div className='mb-3' style={{ display: 'flex', justifyContent: 'center' }}>
              <button className='btn btn-primary' type="submit">Login</button>
            </div>
            <Link to="/register">Not a user? Click here to register!</Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
