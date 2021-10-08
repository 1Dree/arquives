import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useDir } from "../../contexts/DirContext";
import { exValue } from "../../lib";
import "./form.css";

export default function Signout() {
  const { resetUserState, errMsg, setErrMsg, loadingStateSwitch, signout } =
    useAuth();
  const { deleteAll } = useDir();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    const email = exValue(emailRef);
    const password = exValue(passwordRef);

    loadingStateSwitch();

    try {
      await deleteAll();
      await signout({ email, password });
      resetUserState();
      history.push("/");
    } catch (err) {
      console.log(err);

      setErrMsg("Error sign out.");
    } finally {
      loadingStateSwitch();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper">
        <h1>Sign out</h1>

        <form className="form" id="signout" onSubmit={handleSubmit}>
          {errMsg && <p className="err-msg">{errMsg}</p>}

          <input type="email" placeholder="email" required ref={emailRef} />

          <div>
            <input
              type="password"
              placeholder="password"
              required
              ref={passwordRef}
              style={{ marginBottom: "10px" }}
            />

            <Link to="forgotten-password">
              Forgot your password? Click here.
            </Link>
          </div>

          <button className="form-btn" id="signout-btn" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
