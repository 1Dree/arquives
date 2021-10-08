export default async function retrieveUser(userStateSetter) {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  if (!userId || !accessToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/retrieve/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data);
    }

    userStateSetter(data);
  } catch (err) {
    console.log(err);

    throw err;
  }
}
