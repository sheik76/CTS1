import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../sections/useContext"; // Import the context

const ProductCard = ({ product }) => {
  const { id, name, price, image, description } = product;
  const { setProduct } = useProductContext(); // Get the setProduct function from the context
  const navigate = useNavigate();

  const handleClick = () => {
    // Set the selected product in the context
    setProduct(product);
    // Navigate to the product view
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" style={styles.card} onClick={handleClick}>
      <img src={image} style={styles.image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      <div>{description}</div>
      <button style={styles.button}>Add to Cart</button>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "6px",
    padding: "16px",
    marginLeft: "10px",
    boxShadow: "none",
    transition: "box-shadow 0.3s ease-in-out",
    cursor: "pointer",
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ProductCard;
