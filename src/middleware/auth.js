function auth(req, res, next) {
  if(!req.session.id) {
    return res.redirect('/')
  }

  next();
}

module.exports = auth;