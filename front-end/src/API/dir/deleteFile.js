const deleteFile = (removeItem, userStateSetter) => async fileId => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) return;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/file/delete-file`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
        body: JSON.stringify({ fileId }),
      }
    );
    const data = await response.json();

    if (response.status !== 200) throw new Error(data);

    removeItem("files", fileId);
    userStateSetter({ accessToken: data.accessToken });
  } catch (err) {
    throw err;
  }
};

export default deleteFile;
