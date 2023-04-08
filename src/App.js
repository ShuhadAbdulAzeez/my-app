import React, { useState } from "react";
import axios from "axios";
import Welcome from "./Welcome";
import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";

function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000", {
        username,
        password,
      });
      console.log(response);
      navigate("/welcome");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/welcome"
          element={<Welcome {...props} username={username} />}
        />
        <Route path="/" element={<h1>Welcome The Game</h1>} />
      </Routes>
      {!submitted && (
        <form onSubmit={handleSubmit} action="/welcome">
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
