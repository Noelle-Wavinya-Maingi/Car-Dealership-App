import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    localStorage.removeItem("currentUser");
    setUser([]);
    navigate("/login");
  }, [navigate, setUser]);

  return (
    <div>
      <p>Logging out....</p>
    </div>
  );
};

export default Logout;
