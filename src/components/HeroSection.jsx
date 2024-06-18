import { Link } from "react-router-dom";
import carImage from "../assets/car1.png";
import "../assets/css/hero.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1>ABC CAR DEALERSHIP</h1>
          <p>Your trusted partner for car maintenance and management.</p>
          <Link className="btn" to="/signup">
            Sign Up
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <div className="hero-right">
          <img src={carImage} alt="Car" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
