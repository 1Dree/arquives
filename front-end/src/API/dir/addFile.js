const addFile =
  (pushItem, userStateSetter, dirName, ownerId) => async formData => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/file/upload?dirName=${dirName}&ownerId=${ownerId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshToken,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status !== 200) throw new Error(data);

      pushItem("files", data.file);
      userStateSetter({ accessToken: data.accessToken });
    } catch (err) {
      console.log(err);

      throw err;
    }
  };

export default addFile;
