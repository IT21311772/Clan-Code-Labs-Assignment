import React, { useState} from 'react';
import '../Styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  // Use of useState
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const validField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'username':
        errors.username = value.length < 5 ? 'Username is too short' : '';
        break;
      case 'email':
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        errors.email = !emailPattern.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        errors.password = value.length < 6 ? 'Password too short' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  }

  const isFormValid = () => {
    return !Object.values(formErrors).some((error) => error.length > 0);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('/api/user/signup', formData);

        if (response.status === 200) {
          const responseData = response.data;
          console.log('User signed up successfully', responseData);
          navigate('/');
        } else {
          const errorData = response.data;
          console.log('Signup error', errorData);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
    }
  }

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validField(name, value);
  };

  return (
    <div className="container">
      <div className='signup'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="username">Username:</label>
          <input 
            type="text"
            required
            placeholder='Please Enter the Username'
            value={formData.username}
            name='username'
            id='username'
            onChange={handleChnage}
            autoComplete='off'
          />
          <div className="error">{formErrors.username}</div>
          <br /><br />

          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            required
            placeholder='Please Enter the Email'
            value={formData.email}
            name='email'
            id='email'
            onChange={handleChnage}
            autoComplete='off'
          />
          <div className="error">{formErrors.email}</div>
          <br /><br />

          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            required
            placeholder='Please Enter the Password'
            value={formData.password}
            name='password'
            id='password'
            onChange={handleChnage}
          />
          <div className="error">{formErrors.password}</div>
          <br /><br />
          
          <button>Sign Up</button>
        </form>
        <p>Already have an account?<Link to='/' style={{textDecoration: 'none', color: '#07161B', fontWeight: 'bold'}}> Sign In</Link></p>
      </div>
    </div>
  )
}

export default Signup
