import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (e, name) => {
    setData((pre) => ({
      ...pre,
      [name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    const result = await fetch("http://192.168.8.69:8000/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resultData = await result.json();
    if (resultData.auth) {
      localStorage.setItem("user", JSON.stringify(resultData.user));
      localStorage.setItem("token", JSON.stringify(resultData.auth));
      navigate("/");
    } else {
      alert("data is incorrect");
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="signup">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        placeholder="Enter email"
        value={data.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={data.password}
        onChange={(e) => handleChange(e, "password")}
      />

      <button type="button" className="appButton" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
