export default async function retrieveItems(
  itemsStateSetter,
  userStateSetter,
  ownerId,
  dirName
) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken && !refreshToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/file/retrieve`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
        body: JSON.stringify({ ownerId, dirName }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data);
    }

    const { files, folders } = data;

    itemsStateSetter({ files, folders });
    userStateSetter({ accessToken });
  } catch (err) {
    console.log(err);
  }
}
