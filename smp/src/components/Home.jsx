import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Function to fetch posts

    const token = localStorage.getItem("access_token");

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/post/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response = response.data;
        setUserData(response)
        console.log(userData, "userDataaaaaaaaa");
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
