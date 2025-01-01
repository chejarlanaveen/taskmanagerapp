import React, { useState, useEffect } from "react";
import axios from "axios";

function Response() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the message from the Express server
    axios.get("https://taskmanagerapp-frontend-app.vercel.app/response")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching the message:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Express App</h1>
      <p>{message}</p>
    </div>
  );
}

export default Response;
