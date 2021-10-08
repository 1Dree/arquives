import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./dashboard.css";

export default function Dashboard() {
  const { userState, resetUserState } = useAuth();
  const history = useHistory();

  const logout = () => {
    resetUserState();
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history.push("/");
  };

  return (
    <div id="dashboard-wrapper">
      <div className="container">
        <div id="dashboard">
          <h3>{userState.userData.email}</h3>

          <div id="dashboard-actions">
            <button className="dashboard-btn" onClick={logout}>
              Log out
            </button>

            <Link to="/update-profile">
              <button className="dashboard-btn">Update profile</button>
            </Link>

            <Link to="/signout">
              <button className="dashboard-btn">Sign out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
