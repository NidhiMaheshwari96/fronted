import React from "react";
import logo from "../images/pic.jpg";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signup");
  };
  return (
    <div>
      <img className="logo" alt="logo" src={logo} />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/"> Product</Link>
          </li>
          <li>
            <Link to="/add"> Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
