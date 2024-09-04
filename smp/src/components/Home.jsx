import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { API_BASE_URL } from "../constants/constant";
export default function Home() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Function to fetch posts

    const token = localStorage.getItem("access_token");

    console.log(token, "token");
    let response =  axios.get(`${API_BASE_URL}post/`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response = response;
    console.log(response);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}post/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response = response.data;
        setUserData(response.data);
        console.log(userData, "userData");
        console.log(response.data); // Process the response data as needed
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []);
  return (
    <>
      <div className="outer-home">home page content
      {userData}
      {/* <h1>Protected Content</h1> */}

      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre> // Render data as JSON
      ) : (
        <p>No data available</p> // Message for no data
      )}
      </div>
    </>
  );
}
