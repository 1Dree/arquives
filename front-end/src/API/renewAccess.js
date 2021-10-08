const renewAccess = userStateSetter => async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/renew-access`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
      }
    );
    const data = await response.json();

    if (response.status !== 200) throw new Error(data);

    const bearer = { accessToken: data.accessToken };

    userStateSetter(bearer);

    return bearer;
  } catch (err) {
    throw err;
  }
};

export default renewAccess;
