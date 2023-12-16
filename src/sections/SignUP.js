import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import LoginImg from "../assets/loginimg.gif";
import "../styles/SignUP.css";
import axios from "axios";

function SignUP() {
 // Get the history object
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    userType: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://172.18.55.193:3002/signup', formData);

      if (response.status === 201) {
        console.log('User registered successfully');
        // Redirect to login page after successful registration
        navigate("/");
      } else {
        console.error('Failed to register user');
        // Handle error, display message to the user, etc.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   return (
    <div className="signup">
      <div
        className="headerSide"
        style={{ backgroundImage: `url(${LoginImg})` }}
      ></div>
      <div className="footerSide">
        <form id="form" onSubmit={handleSubmit} >
          <div className="signupbox">
          <div className="input1">
          <h1>Register</h1>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            placeholder="Enter first name..."
            type="text"
            onChange={handleChange}
            required
          />
          </div>
          <div className="input1">
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            placeholder="Enter last name..."
            type="text"
            onChange={handleChange}
            required
          />
          </div>
          <div className="input1">
          <label htmlFor="email">Email ID</label>
          <input
            name="email"
            placeholder="Email ID..."
            type="email"
            onChange={handleChange}
            required
          />
          </div>
          <div className="input1">
          <label htmlFor="phone">Phone No</label>
          <input
            name="phone"
            placeholder="Enter phone no..."
            type="phone"
            onChange={handleChange}
            required
          />
          </div>
          <div className="input1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="Enter password..."
            type="password"
            onChange={handleChange}
            required
          />
          </div>
         <div className="input1">
         <select name="userType" onChange={handleChange}>
            <option value="user">--- Select type of user ---</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button type="submit" >Continue </button>
         </div>
         </div>
        </form>
      </div>
    </div>
  );
}

export default SignUP;
