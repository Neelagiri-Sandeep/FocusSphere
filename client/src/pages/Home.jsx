import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>FocusSphere</h1>
        <p>Your Student Productivity Platform</p>

        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="home-btn">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;