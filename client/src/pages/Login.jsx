/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
// css link
import '../styles/auth.css';
import { loginRoute } from '../utils/APIRoutes';

// Function
function Login() {
  const navigate = useNavigate();
  // State
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chaxapp-xchat')) navigate('/');
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        !toast.isActive('chax-wr-cr') &&
          toast.error('Incorrect Credentials !', {
            toastId: 'chax-wr-cr',
            position: 'top-right',
            autoClose: 7000,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          });
      }
      if (data.status === true) {
        delete data.users.password;
        localStorage.setItem('chaxapp-xchat', JSON.stringify(data.users));
        navigate('/');
      }
    }
  };
  // HandleValidation
  function handleValidation() {
    const { password, username } = values;
    // Username
    if (username === '') {
      !toast.isActive('chax-wr-un') &&
        toast.warning('Username is required !', {
          toastId: 'chax-wr-un',
          position: 'top-right',
          autoClose: 7000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      return false;
    }
    // Password
    if (password === '') {
      !toast.isActive('chax-wr-pas') &&
        toast.warning('Password is required !', {
          toastId: 'chax-wr-pas',
          position: 'top-right',
          autoClose: 7000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      return false;
    }
    return true;
  }
  // Handle Change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Return
  return (
    <>
      <ToastContainer />
      <div id="register_component">
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Logo and title */}
          <div className="logo">
            <img src={Logo} alt="Brand Logo" />
            <h2>chaxapp</h2>
          </div>
          {/* Heading */}
          <div className="heading">
            <h3>Connect us</h3>
          </div>
          {/* User div */}
          <div className="input_div">
            <input
              type="text"
              name="username"
              placeholder=" "
              onChange={(e) => handleChange(e)}
            />
            <label>username / Mobile number</label>
          </div>
          {/* Password div */}
          <div className="input_div">
            <input
              type="password"
              name="password"
              placeholder=" "
              onChange={(e) => handleChange(e)}
            />
            <label>Password</label>
          </div>
          {/* Login buttom */}
          <button type="submit">Login</button>
          {/* hrd */}
          <div className="or">
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          {/* login */}
          <div className="login_div">
            <p>Don't have an account ?</p>
            <Link className=".link" to="/register">
              sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
