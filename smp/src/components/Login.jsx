import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';

// function LoginForm(){
//     return (

//     );
// }
export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Here you can handle the form data, for example, sending it to an API

    axios.post('http://localhost:8000/login/', {
        email: email,
        password: password,
      })
    .then(
        response => {
            if (response.data.access) {
              // Access token found, login successful
              console.log('Login successful:', response.data);
              
              // You can store the token in localStorage or state
              localStorage.setItem('access_token', response.data.access);
        
              // Redirect the user or update the UI to indicate login success
              // e.g., navigate to a protected route, or show a success message
              window.location.href = '/home'; // Example of redirecting to the home page
        
            } else {
              // No access token found, handle the error
              response['error'] = "Invalid email or password"
            }
          })
          .catch(error => {
            // Handle other errors (e.g., network errors, server errors)
            console.error('There was an error logging in:', error);
            alert('There was an error logging in. Please try again.');
          });
        
    // Clear the form fields after submission (optional)
    setEmail("");
    setPassword("");
  };
//   console.log(handleSubmit());
  return (
    <>
      <div>
        <form className="form-class">
          <legend>Login Form</legend>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
}
