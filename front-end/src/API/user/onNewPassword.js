const onSignup = async (userEmail, newPassword) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/new-password`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, newPassword }),
      }
    );
    if (response.status !== 200) throw new Error();
  } catch (err) {
    throw new Error();
  }
};

export default onSignup;
