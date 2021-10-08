import { useRef } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";
import { exValue } from "../../../lib";
import "../form.css";
import "./newPass.css";

export default function NewPassword() {
  const {
    errMsg,
    setErrMsg,
    resetErrMsg,
    loadingStateSwitch,
    defineNewPassword,
  } = useAuth();
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const reNewPasswordRef = useRef();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    const email = exValue(emailRef);
    const newPassword = exValue(newPasswordRef);
    const reNewPassword = exValue(reNewPasswordRef);

    if (newPassword !== reNewPassword) {
      setErrMsg("The passwords doesn't match.");
      return;
    }

    loadingStateSwitch();

    try {
      await defineNewPassword(email, newPassword);
      history.push("/login");
    } catch (err) {
      console.log(err);

      setErrMsg("Error defining new password.");
    } finally {
      loadingStateSwitch();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper new-pass">
        <h1>New Password</h1>

        <form className="form" id="new-pass" onSubmit={handleSubmit}>
          <section>
            <p className="instruction">
              Inform your email so you can define its new password.
            </p>

            <input
              type="email"
              placeholder="email"
              required
              ref={emailRef}
              onChange={resetErrMsg}
            />
          </section>

          <section>
            <p className="instruction">Define your new password.</p>

            {errMsg && <p className="err-msg">{errMsg}</p>}

            <input
              type="password"
              placeholder="password"
              required
              ref={newPasswordRef}
              onChange={resetErrMsg}
            />
            <input
              type="password"
              placeholder=" retype your password"
              required
              ref={reNewPasswordRef}
              onChange={resetErrMsg}
            />

            <button className="form-btn" id="update-profile-btn" type="submit">
              Confirm
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
