import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    let result = await fetch("http://192.168.8.69:8000/product", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://192.168.8.69:8000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you Sure?")) {
      let result = await fetch(`http://192.168.8.69:8000/product/${id}`, {
        method: "delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        placeholder="Search"
        className="searchBox"
        onChange={(e) => handleSearch(e)}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Action</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>
              <Link className="update" to={`/update/${item._id}`}>
                Update
              </Link>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          </ul>
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default ProductList;
