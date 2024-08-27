import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setErrorMessage("");
    // Here you can handle the form data, for example, sending it to an API

    if (!email || !password) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    axios
      .post("http://localhost:8000/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.access) {
          // You can store the token in localStorage or state
          localStorage.setItem("access_token", response.data.access);

          window.location.href = "/home"; // Example of redirecting to the home page
        }
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response:", error.response.data);
          setErrorMessage(
            error.response.data.detail ||
              error.response.data.message ||
              JSON.stringify(error.response.data)
          );
        } else if (error.request) {
          // Request was made but no response was received
          setErrorMessage("The server did not respond."); // Optionally set a response here
        } else {
          // Something else happened while setting up the request
          setErrorMessage("An unexpected error occurred.");
        }
      });

    // Clear the form fields after submission (optional)
    setEmail("");
    setPassword("");
  };

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
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <div className={`error-message ${errorMessage ? "show" : ""}`}>
            {errorMessage}
          </div>
        </form>
      </div>
    </>
  );
}
