const openFile = async (filename, accessToken) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return;

  window.open(
    `${process.env.REACT_APP_SERVER_URL}/file/open/${filename}/?auth=${accessToken}&refresh=${refreshToken}`
  );
};

export default openFile;
