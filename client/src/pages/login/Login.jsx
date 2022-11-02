import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../components/context/Context";
import "./login.css";

export default function Login() {
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            required
            ref={userRef}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            required
            ref={passwordRef}
          />
          <button className="loginButton">Login</button>
        </form>
        <button
          className="loginRegisterButton"
          type="submit"
          disabled={isFetching}
        >
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong
          </span>
        )}
      </div>
    </>
  );
}
