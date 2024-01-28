import React, { useState } from 'react';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');

    const loginData = { email, password };

    try {
      const response = await axios.post('/api/user/login', loginData);

      if (response.status === 200) {
        const responseData = response.data;
        const userRole = responseData.role;

        if (userRole === 'admin') {
          console.log('Admin logged in successfully', responseData);
          navigate('/tasks');
        } else if (userRole === 'user') {
          console.log('User logged in successfully', responseData);
          navigate('/todos')
        }else {
          console.error('Invalid role', userRole);
          setError('Invalid role. Please contact support.');
        }
      } else {
        const errorData = response.data;
        console.error('Login error:', errorData);
        setError('Login failed. Please check your credentials');
      }
    } catch (error) {
      console.error('Request error:', error);
      setError('An error occured during login. Please try again.');
    }
  }

  return (
    <div className="container">
      <div className='login'>
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <label htmlFor="email">Email:</label>
          <input 
            type="text"
            required
            placeholder='Please Enter the Email'
            value={email}
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)} 
            autoComplete='off'
          />
          <br /><br />

          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            required
            placeholder='Please Enter the Password'
            value={password}
            name='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          
          {error && <p className="error">{error}</p>}
          
          <button>Sign In</button>
        </form>
        <p>Don't have an account?<Link to='/signup' style={{textDecoration: 'none', color: '#07161B', fontWeight: 'bold'}}> Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login
