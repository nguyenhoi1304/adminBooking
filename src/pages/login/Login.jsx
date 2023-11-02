import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("https://booking-backend-s33n.onrender.com/api/auth/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.isAdmin) {
          localStorage.setItem("USER__ARRAY", username);
          navigate("/home");
        } else {
          alert("Vui lòng kiểm tra lại thông tin đăng nhập!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Login
        </button>
        <Link to="/register" style={{ textAlign: "center", opacity: "0.7" }}>
          <span>Create Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
