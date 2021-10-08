const onUpdateProfile = userStateSetter => async (userData, updationData) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/update-profile`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
        body: JSON.stringify({ userData, updationData }),
      }
    );
    const data = await response.json();

    userStateSetter({
      userData: data.userData,
      accessToken: data.accessToken,
    });
  } catch (err) {
    throw err;
  }
};

export default onUpdateProfile;
