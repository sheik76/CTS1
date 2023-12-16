import React from "react";
import BgImage from "../assets/bgimage.png";
import "../styles/About.css";
function About() {
    return (
        <div className="about">
        <div className="abtTop" style={{ backgroundImage: `url(${BgImage})` }}
        ></div>
        <div className="abtBottom">
        <h1>ABOUT US</h1>
        <p>
        Our Firm gives talented and creative people all 
        over the world the professional resources to design 
        custom products and fashion accessories.We take care
        of all production and logistics from Dutch,the most 
        exclusive and prestigious shoe and craftmanship district in the world.
        </p>
        </div>
        </div>
    );
}

export default About;