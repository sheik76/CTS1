import React, { useState } from "react";
import LoginImg from "../assets/loginimg.gif";
import "../styles/SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (firstName, lastName, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("http://172.18.55.193:3002/login", {
        firstName,
        lastName,
        password,
      });

      if (response.status === 200) {
        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);
         console.log(response.data.token)
        // Redirect to the Home screen or perform other actions
        navigation("/Home");
      } else {
        console.error("User not found or incorrect password");
        setError("User not found or incorrect password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const getUserInfo = async () => {
  //   try {
  //     // Retrieve token from localStorage
  //     const token = localStorage.getItem("token");
         
  //     if (token) {
  //       const response = await axios.get(
  //         "http://172.18.55.193:3002/userinfo",
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );

  //       console.log(response.data.user);
  //     } else {
  //       console.log("Token not found");
  //       // Handle the case where the token is not found (user not logged in)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user information:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    handleLogin(formData.firstName, formData.lastName, formData.password);
  };

  return (
    <div className="home">
      <div
        className="headerSide"
        style={{ backgroundImage: `url(${LoginImg})` }}
      ></div>
      <div className="footerSide">
        <h1>Login</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div className="signinbox">
            <div className="input2">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                placeholder="Enter first name..."
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="input2">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                placeholder="Enter last name..."
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="input2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                placeholder="Enter password..."
                type="password"
                onChange={handleChange}
                required
              />
              <button className="lgbtn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
