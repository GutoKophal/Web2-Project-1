const Category = require("../models/category");
const User = require("../models/user");

class CategoryController {
  async register(req, res) {
    const { category } = req.body;

    const hasCategory = await Category.findOne({
      where: {
        title: category
      }
    })

    if(hasCategory) return res.status(400).json({ error: 'Não é possível cadastrar uma categoria existente' })

    await Category.create({
      title: category
    })

    return res.status(201).json({ message: 'Categoria cadastrada' })
  }

  async findAll(req, res) {
    const result = await Category.findAll();

    return res.status(200).json(result)
  } 

  async layoutCategory(req, res) {
    const userId = req.session.userId;

    if(!userId) return res.redirect('/');

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    })


    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    return res.render('category', { isTeam, isAdmin })
  }
}


module.exports = CategoryController;