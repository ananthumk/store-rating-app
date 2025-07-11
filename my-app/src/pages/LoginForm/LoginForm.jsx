import React, { useContext, useState } from 'react'
import { FaHouseChimney, FaLock, FaLocationDot  } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoIosMail,IoMdPerson  } from "react-icons/io";
import { AppContext } from "../../context/storeContext"
import axios from 'axios'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [signUp, setSignUp] = useState(false)
  const [loginDetails, setLogin] = useState({
    email: '', password: '', address: '', name: '', role: ''
  })
  const [errMsg, setErrMsg] = useState('')
  const {url} = useContext(AppContext)
  const navigate = useNavigate()
  
  const loginForm = async (e) => {
  e.preventDefault();
  const urlValue = signUp ? 'auth/register' : 'auth/login';

  try {
    const response = await axios.post(url + urlValue, loginDetails);
    
    if (response.status === 200) {
      setLogin({ email: '', password: '', address: '', name: '', role: '' });
      localStorage.setItem('token', response.data.token)
      navigate('/');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrMsg(error.response.data.message || 'Login failed.');
    } else {
      setErrMsg('Something went wrong. Please try again.');
    }
  }
};

  
  const handleLogin = (e) => {
    const { name, value} = e.target 
    setLogin(prevState => ({
        ...prevState,
        [name]: value
  }))
  }
  console.log(errMsg)
  return (
    <div className='loginform-container'>
        <div className='login-details-container'>
            <div className='heading'>
              <h1>StoreConnect</h1>
              <p>Connect with local stores, discover amazing places and share your experience</p>
              </div>
              <div className='each-card'>
                     <div className='card-image b-card'>
                         <FaHouseChimney className='icon' />
                     </div>
                     <div className='card-details' >
                        <h3>Discover Stores</h3>
                        <p>Find local businesses near you</p>
                     </div>
              </div>
              <div className='each-card'>
                     <div className='card-image r-card'>
                         <FaRegStar className='icon'/>
                     </div>
                     <div className='card-details'>
                        <h3>Rate & Review</h3>
                        <p>Share your experiences</p>
                     </div>
              </div>
              <div className='each-card'>
                     <div className='card-image g-card'>
                         <MdOutlinePeopleAlt className='icon'/>
                     </div>
                     <div className='card-details'>
                        <h3>Build Community</h3>
                        <p>Connect with other users</p>
                     </div>
              </div>
        </div>
        <div className='login-container'>
            <h2>Welcome</h2>
            <p>Sign in to your account or create a new one</p>
            <div className='sign-up-in-container'>
                <div onClick={() => setSignUp(false)} className={`login-switch ${signUp  ? '' : 'active'}`}>
                    Sign In
                </div>
                <div onClick={() => setSignUp(true)} className={`login-switch ${signUp ? 'active': ''} `}>Sign Up</div>
            </div>
            <form onSubmit={loginForm} className='form-container'>
                
                {signUp && <label htmlFor="">Full Name</label>}
                {signUp && <div className='input-container'>
                      <IoMdPerson className='input-icon' />
                      <input type='text' value={loginDetails.name} name='name' onChange={handleLogin} placeholder='Enter your full name' />
                </div>}
                
                <label htmlFor="">Email</label>
                <div className='input-container'>
                      <IoIosMail className='input-icon' />
                      <input type='email' value={loginDetails.email} name='email' onChange={handleLogin} placeholder='Enter your email' />
                </div>
                <label htmlFor="">Password</label>
                
                <div className='input-container'>
                     <FaLock className='input-icon' />
                     <input type="password" value={loginDetails.password} name="password" onChange={handleLogin} placeholder='Enter Your Password' />
                </div>
                {signUp && <label htmlFor="">Address</label>}
                {signUp && <div className='input-container'>
                      <FaLocationDot className='input-icon' />
                      <input type='text' name="address" value={loginDetails.address} onChange={handleLogin} placeholder='Enter your address' />
                </div>}
                {signUp && <label htmlFor="">Account Type</label>}
                {signUp && <select name="role" onChange={handleLogin} id="">
                    <option value="normal_user">Customer</option>
                    <option value="store_owner">Store Owner</option>
                </select>}
                {!signUp ? 
                <button type="submit" className='signin-btn'>Sign In</button>:
                <button type='submit' className='create-btn'>Create Account</button>
                 }
            </form>
            {errMsg && <p style={{color: 'red'}}>{errMsg}</p>}
        </div>
    </div>
  )
}

export default LoginForm