const User = require("../models/user");

class PainelController {
  async home(req, res) {

    const userId = req.session.userId;

    if(!userId) return res.redirect('/');

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    })

    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    return res.render('painel', {
      username: 'user.username',
      isTeam,
      isAdmin
    })
  }
}

module.exports = PainelController;