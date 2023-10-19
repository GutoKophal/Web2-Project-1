const User = require('../models/user')

class UserController {
  async register(req, res) {
    const { username, password, email } = req.body;

      const hasUser = await User.findOne({where: { email } })

      if(hasUser) return res.status(400).json({ error: 'E-mail já existe.' });

       await User.create({
        username,
        password,
        email
      });

      return res.status(201).json({})
  }

  async login(req, res) {
    const { email, password } = req.body;

    
    const hasEmail = await User.findOne({ where: { email } })

    if(!hasEmail) return res.status(400).json({ error: 'Não existe nenhum conta vincula a este E-mail' }); 

    const user = await User.findOne({ where: { email, password } });

    if(!user) return res.status(400).json({ error: 'E-mail ou senha incorreto' });

    req.session.userId = user.id;

    return res.status(200).json({ valid: true });
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
          console.error(err);
      } else {
          res.redirect('/');
        }
    });
  }
}

module.exports = UserController;