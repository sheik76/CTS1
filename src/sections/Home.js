// Home.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import shoe from "../assets/shoe.png";

const Home = () => {
  const [userType, setUserType] = useState("");
  const [customers, setCustomers] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: shoe,
      description: "Description for Product 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: shoe,
      description: "Description for Product 2",
    },
  ]);

  useEffect(() => {
    // Make an API request to get user information after login
    // Assuming the API endpoint returns user details including userType
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://172.18.55.193:3002/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(token)
        console.log(response.data.user.userType);
        setUserType(response.data.user.userType);
          
        // If the user is an admin, fetch customer details
        if (response.data.user.userType === "admin") {
          const customersResponse = await axios.get(
            "http://172.18.55.193:3002/customers",{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ); // Update the endpoint as needed
          setCustomers(customersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="home">
      <div className="banner">
        {/* Add your banner content here */}
        <h1>Welcome to Dinokart</h1>
        <h3>Logged in As : {userType}</h3>
      </div>

      {userType === "admin" ? (
        <div className="customer-list">
          <h2>Customer List</h2>
          
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
               <div> firstname : {customer.firstName}</div> 
               <div>lastName : {customer.lastName}</div> 
               <div>mail-id : {customer.email}</div>
               <div>phone-no : {customer.phone}</div>
               <div>user : {customer.userType}</div> 
               <div>ip: 172.18.55.193</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="product-list">
          <h2>Featured Products</h2>
          <div
            className="product-grid"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
