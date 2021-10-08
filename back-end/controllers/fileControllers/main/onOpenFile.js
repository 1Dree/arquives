module.exports = function onOpenfile(req, res, next) {
  const { auth, refresh } = req.query;

  req.headers.authorization = `Bearer ${auth}`;
  req.headers.refreshtoken = refresh;

  next();
};
