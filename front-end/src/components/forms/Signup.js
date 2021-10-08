import { useRef } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./form.css";

import { exValue } from "../../lib";

export default function Signup() {
  const {
    userState,
    errMsg,
    setErrMsg,
    resetErrMsg,
    loadingStateSwitch,
    signup,
  } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const history = useHistory();

  const handleSubmit = async e => {
    setErrMsg("");
    e.preventDefault();

    const email = exValue(emailRef);
    const password = exValue(passwordRef);
    const rePassword = exValue(rePasswordRef);

    if (password !== rePassword) {
      setErrMsg("Passwords doesn't match");

      return;
    }

    loadingStateSwitch();

    try {
      await signup({ email, password });
      history.push("/dashboard");
      loadingStateSwitch();
    } catch (err) {
      console.log(err);
      loadingStateSwitch();

      setErrMsg("Error sign up");
    }
  };

  return (
    <div className="auth-wrapper">
      {userState && <Redirect to="/dashboard" />}
      <div className="form-wrapper">
        <h1>Sign up</h1>

        <form className="form" id="signup" onSubmit={handleSubmit}>
          {errMsg && <p className="err-msg">{errMsg}</p>}

          <input
            type="email"
            placeholder="email"
            required
            ref={emailRef}
            onChange={resetErrMsg}
          />
          <input
            type="password"
            placeholder="password"
            required
            ref={passwordRef}
            onChange={resetErrMsg}
          />
          <input
            type="password"
            placeholder=" retype your password"
            required
            ref={rePasswordRef}
            onChange={resetErrMsg}
          />

          <div>
            <button
              className="form-btn"
              id="signup-btn"
              type="submit"
              style={{ marginBottom: "10px" }}
            >
              Sign up
            </button>

            <Link to="/login">Already have an account? Click here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
