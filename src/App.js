import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./sections/SignIn";
import About from "./sections/About";
import Home from "./sections/Home";
import SignUP from "./sections/SignUP";
import ProductView from "./sections/ProductView";
import { ProductProvider } from "./sections/useContext"; // Import the context

function App() {
  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUP />} />
            <Route path="/product/:id" element={<ProductView />} />
          </Routes>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
