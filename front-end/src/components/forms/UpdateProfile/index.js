import { useRef } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";
import { exValue } from "../../../lib";
import "./updateProfile.css";
import "../form.css";

export default function UpdateProfile() {
  const { errMsg, setErrMsg, resetErrMsg, loadingStateSwitch, updateProfile } =
    useAuth();

  const authEmailRef = useRef();
  const authPasswordRef = useRef();
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const reNewPasswordRef = useRef();
  const history = useHistory();

  const handleSubmit = async e => {
    resetErrMsg();
    e.preventDefault();

    const authEmail = exValue(authEmailRef);
    const authPassword = exValue(authPasswordRef);
    const newEmail = exValue(newEmailRef);
    const newPassword = exValue(newPasswordRef);
    const reNewPassword = exValue(reNewPasswordRef);

    if (newPassword !== reNewPassword) {
      setErrMsg("Passwords doesn't match");

      return;
    }

    const authFieldsMap = { email: authEmail, password: authPassword };
    const updationFieldsMap = { email: newEmail, password: newPassword };

    const upEntries = Object.entries(updationFieldsMap);

    const verification = upEntries.reduce(
      (acc, [key, value]) => {
        if (value === authFieldsMap[key]) {
          acc.msg = `The ${key} entered is identical to the current one.`;
        }

        return acc;
      },
      { msg: "" }
    );

    if (verification.msg) {
      setErrMsg(verification.msg);
      return;
    }

    loadingStateSwitch();

    try {
      await updateProfile(authFieldsMap, updationFieldsMap);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);

      setErrMsg("Error updating profile");
    } finally {
      loadingStateSwitch();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-wrapper update">
        <h1>Update Proflie</h1>

        <form className="form" id="update-profile" onSubmit={handleSubmit}>
          <section>
            <p className="instruction">
              Inform your current email and password.
            </p>

            <input
              type="email"
              placeholder="email"
              required
              ref={authEmailRef}
              onChange={resetErrMsg}
            />
            <input
              type="password"
              placeholder="password"
              required
              ref={authPasswordRef}
              onChange={resetErrMsg}
            />
          </section>

          <section>
            <p className="instruction">Update your data.</p>
            {errMsg && <p className="err-msg">{errMsg}</p>}

            <input
              type="email"
              placeholder="email"
              ref={newEmailRef}
              onChange={resetErrMsg}
            />
            <input
              type="password"
              placeholder="password"
              ref={newPasswordRef}
              onChange={resetErrMsg}
            />
            <input
              type="password"
              placeholder=" retype your password"
              ref={reNewPasswordRef}
              onChange={resetErrMsg}
            />
            <p className="instruction">
              If you don't want to update one of these fields, just leave it
              blank.
            </p>
            <button className="form-btn" id="update-profile-btn" type="submit">
              Save
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
