class HomeController {
  async home(req, res) {
    return res.render('home')
  }
}

module.exports = HomeController;