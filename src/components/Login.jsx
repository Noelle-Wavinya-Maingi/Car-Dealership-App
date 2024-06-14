import { useState } from "react";
import axios from "axios";
import loginImage from "../assets/Login.png";
import signupImage from "../assets/Signup.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // State to toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch user data based on email and password
      const res = await axios.get(
        `https://json-server-vkfa.onrender.com/users?email=${email}&password=${password}`
      );

      // Extract the first user from response data
      const user = res.data[0];

      // If user exists, log them in and redirect based on role
      if (user) {
        alert("Login successful!");
        switch (user.role) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "manager":
              navigate("/manager-dashboard");
              break;
            case "employee":
              navigate("/employee-dashboard");
              break;
            default:
              alert("Unknown role. Please contact support.");
              break;
          }
      } else {
        alert("Invalid credentials. Please try again!");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Handle signup form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Fetch the last user ID to generate a new ID for the new user
      const lastUserRes = await axios.get(
        "https://json-server-vkfa.onrender.com/users?_sort=id&_order=desc&_limit=1"
      );

      const lastUserId =
        lastUserRes.data.length > 0 ? lastUserRes.data[0].id + 1 : 1;

      // Create a new user object with default role as "employee"
      const newUser = {
        id: lastUserId,
        name: name,
        email: email,
        password: password,
        role: "employee", // Default role for new users
      };

      // Post the new user data to the server
      const res = await axios.post(
        `https://json-server-vkfa.onrender.com/users`,
        newUser
      );

      // Show success message and reset form state
      alert("Signup successful. Please login to continue.");
      setIsLogin(true);

      console.log("New user: ", res.data);
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("An error occurred. Please try again later.");
    }
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
                {/* Display login image */}
                <img src={loginImage} alt="Login" className="auth-image" />
              </div>
              <div className="form-fields">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="eg. johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btn" type="submit">
                    Login
                  </button>
                </form>
                <p>
                  Don&apos;t have an account?{" "}
                  <Link onClick={toggleForm}>Sign Up</Link>
                </p>
              </div>
            </>
          ) : (
            // Render signup form if isLogin is false
            <>
              <div className="form-fields">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                  <input
                    type="text"
                    placeholder="eg. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="eg. johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
