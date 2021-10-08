export default async function onSignout(userData) {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  if (!accessToken || !userId) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/signout`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userData }),
      }
    );
    if (response.status !== 200) throw new Error();
  } catch (err) {
    console.log(err);

    throw new Error();
  }
}
