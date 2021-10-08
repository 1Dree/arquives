const addFolder =
  (pushItem, userStateSetter, dirName, ownerId) => async (folderName, path) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/file/create-folder`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
            refreshToken,
          },
          body: JSON.stringify({
            folderName,
            path,
            dirName,
            ownerId,
          }),
        }
      );
      const data = await response.json();

      if (response.status !== 200) throw new Error(data);

      pushItem("folders", data.folderDoc);
      userStateSetter({ accessToken: data.accessToken });
    } catch (err) {
      console.log(err);

      throw err;
    }
  };

export default addFolder;
