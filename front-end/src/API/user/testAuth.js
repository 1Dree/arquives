export default async function testAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  console.log(accessToken);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/auth-test`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 403) {
      return false;
    } else if (response.status === 200) {
      return true;
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    throw err;
  }
}
