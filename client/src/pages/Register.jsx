/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
// css link
import '../styles/auth.css';
import { registerRoute } from '../utils/APIRoutes';

// Function
function Register() {
  const navigate = useNavigate();
  // State
  const [values, setValues] = useState({
    username: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chaxapp-xchat')) navigate('/');
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, mobileNumber } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        mobileNumber,
        password,
      });
      if (data.status === false) handleToast('chax-wr-data', data.msg,'error');
      if (data.status === true) {
        localStorage.setItem('chaxapp-xchat', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };
  // HandleValidation
  function handleValidation() {
    const { password, username, mobileNumber, confirmPassword } = values;
    // Username
    if (username.length < 3)
      return handleToast(
        'chax-un-lt',
        'username should contain minimum 3 characters',
        'warning'
      );
    if (username.length > 19)
      return handleToast(
        'chax-un-gt',
        'username should contain maximum 19 characters',
        'warning'
      );
    // Mobile Number
    if (mobileNumber.length !== 10)
      return handleToast(
        'chax-mn-ne',
        'mobile number must have 10 digits',
        'warning'
      );
    if (/[a-zA-Z]/g.test(mobileNumber))
      return handleToast(
        'chax-mn-pt',
        'mobile number should be digits',
        'warning'
      );
    // Password
    if (password.length < 8)
      return handleToast(
        'chax-pas-lt',
        'password should contain minimum 8 characters',
        'warning'
      );
    if (password.length > 12)
      return handleToast(
        'chax-pas-gt',
        'password should contain maximum 12 characters',
        'warning'
      );
    // Confirm Password
    if (password !== confirmPassword)
      return handleToast(
        'chax-pas-dm',
        "password and confirmPassword doesn't match",
        'warning'
      );
    return true;
  }

  function handleToast(id, txt, toastType) {
    !toast.isActive(id) &&
      toast(txt, {
        toastId: id,
        type: toastType,
        position: 'top-right',
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    return false;
  }

  // Handle Change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Return
  return (
    <div id="register_component">
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Logo and title */}
        <div className="logo">
          <img src={Logo} alt="Brand Logo" />
          <h2>chaxapp</h2>
        </div>
        {/* Heading */}
        <div className="heading">
          <h3>Join us</h3>
        </div>
        {/* User div */}
        <div className="input_div">
          <input
            type="text"
            name="username"
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          <label>username</label>
        </div>
        {/* Mobile number div */}
        <div className="input_div">
          <input
            type="text"
            name="mobileNumber"
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          <label>Mobile number</label>
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
        {/* Confirm Password div */}
        <div className="input_div">
          <input
            type="password"
            name="confirmPassword"
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          <label>Confirm Password</label>
        </div>
        {/* Register buttom */}
        <button type="submit">Create account</button>
        {/* hrd */}
        <div className="or">
          <span></span>
          <p>or</p>
          <span></span>
        </div>
        {/* login */}
        <div className="login_div">
          <p>Already have an account ?</p>
          <Link className=".link" to="/login">
            sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
