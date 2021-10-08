import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { exValue } from "../../lib";
import "./form.css";

export default function Login() {
  const { errMsg, setErrMsg, resetErrMsg, loadingStateSwitch, login } =
    useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = async e => {
    resetErrMsg();
    e.preventDefault();

    const email = exValue(emailRef);
    const password = exValue(passwordRef);

    loadingStateSwitch();

    try {
      await login({ email, password });
      history.push("/dashboard");
      loadingStateSwitch();
    } catch (err) {
      loadingStateSwitch();

      setErrMsg("Error login in");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper">
        <h1>Login</h1>

        <form className="form" id="login" onSubmit={handleSubmit}>
          {errMsg && <p className="err-msg">{errMsg}</p>}

          <input
            type="email"
            placeholder="email"
            required
            ref={emailRef}
            onChange={resetErrMsg}
          />
          <div>
            <input
              type="password"
              placeholder="password"
              required
              ref={passwordRef}
              onChange={resetErrMsg}
              style={{ marginBottom: "10px" }}
            />

            <Link to="/forgotten-password">Forgot your password?</Link>
          </div>

          <button className="form-btn" id="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
