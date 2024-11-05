import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../styles/HeaderStyles.css";
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
    const navigate = useNavigate()
    const [loginUser,setLoginUser]=useState('')
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user)
    }

  },[])
  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login')
    message.success("Logout successfull")
  }
    return (
        <>
            <nav className="headd navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse head" id="navbarTogglerDemo01">
                        <Link className="navbar-brand text-white" to="/">Expense Management</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0  d-flex flex-end">
                            <li className='nav-item pt-3 pr-1' >
                                <UserOutlined/>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link pt-2 pr-3">
                                    {loginUser && loginUser.name}   
                                </p>                         
                            </li>
                            <li className="nav-item">
                                <button className="nav-link active buttonn" onClick={logoutHandler} aria-current="page">
                                Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header