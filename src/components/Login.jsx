/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../assets/Login.png";
import signupImage from "../assets/Signup.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      // Redirect based on user role if storedUser exists
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "manager") {
        navigate("/manager-dashboard");
      } else if (user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        return;
      }
    }
  }, [navigate]);

  const toggleForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://json-server-vkfa.onrender.com/users?email=${email}&password=${password}`
      );
      const user = res.data[0];

      if (user) {
        // Store user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
        setUser(user);
        alert("Login successful!");

        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (user.role === "manager") {
          navigate("/manager-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        alert("Invalid credentials. Please try again!");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const lastUserRes = await axios.get(
        "https://json-server-vkfa.onrender.com/users?_sort=id&_order=desc&_limit=1"
      );
      const lastUserId =
        lastUserRes.data.length > 0 ? lastUserRes.data[0].id + 1 : 1;

      const newUser = {
        id: lastUserId,
        name: name,
        email: email,
        password: password,
        role: "employee",
      };

      const res = await axios.post(
        `https://json-server-vkfa.onrender.com/users`,
        newUser
      );

      alert("Signup successful. Please login to continue.");
      toggleForm();
      console.log("New user: ", res.data);
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div
        className={`form-container ${isLogin ? "slide-login" : "slide-signup"}`}
      >
        <div className="form-content">
          {isLogin ? (
            <>
              <div className="image-container">
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
