import { Link, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./expAccessScreen.css";

const ExpAccessScreen = () => {
  const { expiredAccess, setExpiredAccess } = useAuth();

  return expiredAccess ? (
    <div id="exp-access-screen">
      <div id="exp-access-screen-content">
        <h1>Access expired</h1>
        <p onClick={() => setExpiredAccess(false)}>
          Your access has ben expired.
          <Link to="/login">Log in again to renew it.</Link>
        </p>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default ExpAccessScreen;
