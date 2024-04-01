import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    userId: "",
    company: "",
  });
  let { id } = useParams();
  const navigate = useNavigate();
  const handleChange = (e, name) => {
    setData((pre) => ({
      ...pre,
      [name]: e.target.value,
    }));
  };
  const getProducts = async () => {
    let result = await fetch(`http://192.168.8.69:8000/product/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setData(result[0]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async () => {
    let result = await fetch(`http://192.168.8.69:8000/product/${id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = result.json();
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="signup">
      <h1>Update Product</h1>
      <input
        value={data.name}
        className="inputBox"
        type="text"
        placeholder="Enter name"
        onChange={(e) => handleChange(e, "name")}
      />
      <input
        value={data.price}
        className="inputBox"
        type="text"
        placeholder="Enter price"
        onChange={(e) => handleChange(e, "price")}
      />
      <input
        value={data.category}
        className="inputBox"
        type="text"
        placeholder="Enter category"
        onChange={(e) => handleChange(e, "category")}
      />
      <input
        value={data.company}
        className="inputBox"
        type="text"
        placeholder="Enter company"
        onChange={(e) => handleChange(e, "company")}
      />
      <button type="button" className="appButton" onClick={handleSubmit}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
