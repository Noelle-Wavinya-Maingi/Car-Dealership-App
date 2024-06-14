import { useState } from "react";
import loginImage from "../assets/Login.png";
import signupImage from "../assets/Signup.png";
import { Link } from "react-router-dom";

const Login = () => {
  // State to toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      {/* Conditionally apply classes for sliding effect based on isLogin state */}
      <div
        className={`form-container ${isLogin ? "slide-login" : "slide-signup"}`}
      >
        <div className="form-content">
          {/* Render login form if isLogin is true */}
          {isLogin ? (
            <>
              <div className="image-container">
                {/* //Display login image  */}
                <img src={loginImage} alt="Login" className="auth-image" />
              </div>
              <div className="form-fields">
                <h2>Log in</h2>
                <form>
                  <input
                    type="email"
                    placeholder="eg. johndoe@gmail.com"
                    required
                  />
                  <input type="password" placeholder="Password" required />
                  <button className="btn" type="submit">
                    Login
                  </button>
                </form>
                <p>
                  Don&Apos;t have an account?{" "}
                  <Link onClick={toggleForm}>Sign Up</Link>
                </p>
              </div>
            </>
          ) : (
            // Render signup form if isLogin is false
            <>
              <div className="form-fields">
                <h2>Sign Up</h2>
                <form>
                  <input type="text" placeholder="eg. John Doe" required />
                  <input
                    type="email"
                    placeholder="eg. johndoe@gmail.com"
                    required
                  />
                  <input type="password" placeholder="Password" required />
                  <button className="btn" type="submit">
                    Sign Up
                  </button>
                </form>
                <p>
                  Already have an account?{" "}
                  <Link onClick={toggleForm}>Login</Link>
                </p>
              </div>
              <div className="image-container">
                {/* Display signup image */}
                <img src={signupImage} alt="Sign Up" className="auth-image" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
