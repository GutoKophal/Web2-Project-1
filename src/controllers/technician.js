const User = require("../models/user")

class TechnicianController {
  async layout(req, res) {
    const userId = req.session.userId;

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    })

    
    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    return res.render('technician', { isAdmin, isTeam })
  }

  async register(req, res) {
    const { username, email, password } = req.body;

      const hasUser = await User.findOne({ where: { email } })

      if(hasUser) return res.status(400).json({ error: 'Já existe um técnico com este e-mail.' });

       await User.create({
        username,
        password,
        email,
        technician: true
      });

      return res.status(201).json({})
  }
}

module.exports = TechnicianController