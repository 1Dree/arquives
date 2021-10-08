const deleteAll = (resetItems, userStateSetter, ownerId) => async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/file/delete-all`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
        body: JSON.stringify({ ownerId }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) throw new Error(data);

    resetItems();
    userStateSetter({ accessToken: data.accessToken });
  } catch (err) {
    throw err;
  }
};

export default deleteAll;
