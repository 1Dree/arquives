import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import API from "../API";
import Loading from "../components/Loading";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [userState, setUserState] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [prevIntervalId, setPrevIntervalId] = useState(null);
  const [expiredAccess, setExpiredAccess] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const userStateSetter = newState =>
    userState
      ? setUserState(prevState => ({ ...prevState, ...newState }))
      : setUserState(newState);

  const onUserStateChange = () => {
    if (!userState) return;

    localStorage.setItem("userId", userState.userData._id);

    if (userState.accessToken) {
      localStorage.setItem("accessToken", userState.accessToken);
    }

    if (userState.refreshToken) {
      localStorage.setItem("refreshToken", userState.refreshToken);
    }
  };

  const resetUserState = () => setUserState(null);

  const loadingStateSwitch = () => setLoadingState(prevState => !prevState);

  const resetErrMsg = () => setErrMsg("");

  const authTest = () => {
    if (prevIntervalId) clearInterval(prevIntervalId);
    if (!userState) return;

    const id = setInterval(async () => {
      try {
        const result = await API.user.testAuth();

        if (!result) {
          clearInterval(id);
          clearInterval(prevIntervalId);
          setExpiredAccess(true);
          resetUserState();
          history.push("/expired-access");
        }
      } catch (err) {
        console.log(err);
        // alert(err);
      }
    }, 5000);

    setPrevIntervalId(id);
  };

  const value = {
    userState,
    userStateSetter,
    resetUserState,
    errMsg,
    setErrMsg,
    resetErrMsg,
    loadingState,
    loadingStateSwitch,
    expiredAccess,
    setExpiredAccess,
    signup: API.user.onSignup(userStateSetter),
    login: API.user.onLogin(userStateSetter),
    updateProfile: API.user.onUpdateProfile(userStateSetter),
    defineNewPassword: API.user.onNewPassword,
    signout: API.user.onSignout,
    renewAccess: API.renewAccess(userStateSetter),
  };

  useEffect(() => {
    resetErrMsg();
    API.user.retrieveUser(userStateSetter);
  }, []);

  const test = useCallback(authTest, [userState]);
  const userStateChange = useCallback(onUserStateChange, [userState]);

  useEffect(test, [test]);

  useEffect(userStateChange, [userStateChange]);

  useEffect(resetErrMsg, [location.pathname]);

  return (
    <AuthContext.Provider value={value}>
      {loadingState ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
