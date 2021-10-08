const onLogin = userStateSetter => async userData => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) throw new Error(data);

    userStateSetter(data);
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export default onLogin;
