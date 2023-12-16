import React from "react";
import { useProductContext } from "../sections/useContext"; // Import the context

const ProductView = () => {
  const { selectedProduct } = useProductContext(); // Get the selected product from the context

  // Check if selected product is available
  if (!selectedProduct || !selectedProduct.name || !selectedProduct.price || !selectedProduct.image) {
    return <div>Product details not available</div>;
  }

  const { name, price, image, description } = selectedProduct;

  return (
    <div className="product-view" style={styles.container}>
      <img src={image} alt={name} style={styles.image} />
      <h2 style={styles.title}>{name}</h2>
      <p style={styles.price}>${price}</p>
      <p style={styles.description}>{description}</p>
      <button style={styles.buyButton} onClick={() => alert("Buy Now clicked!")}>
        Buy Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  image: {
    height: "300px",
    width: "300px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  price: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ProductView;
