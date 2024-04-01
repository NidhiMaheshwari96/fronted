import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
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
    const result = await fetch("http://192.168.8.69:8000/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resultData = await result.json();
    if (resultData) {
      navigate("/login");
      // localStorage.setItem("user", JSON.stringify(resultData));
    } else {
      alert("error");
    }
  };

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div className="signup">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={data.name}
        onChange={(e) => handleChange(e, "name")}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={data.password}
        onChange={(e) => handleChange(e, "password")}
      />
      <input
        className="inputBox"
        type="email"
        placeholder="Enter email"
        value={data.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <button type="button" className="appButton" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SignUp;
