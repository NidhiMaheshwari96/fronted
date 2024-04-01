import React, { useState } from "react";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    userId: "",
    company: "",
  });
  const auth = localStorage.getItem("user");
  const handleChange = (e, name) => {
    setData((pre) => ({
      ...pre,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const result = await fetch("http://192.168.8.69:8000/add-product", {
      method: "post",
      body: JSON.stringify({ ...data, userId: JSON.parse(auth)._id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    const resultData = await result.json();
    if (resultData) {
      setData({
        name: "",
        price: "",
        category: "",
        userId: "",
        company: "",
      });
    }
  };
  return (
    <div className="signup">
      <h1>Add Product</h1>
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
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
