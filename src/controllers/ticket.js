const Category = require("../models/category");
const Ticket = require("../models/ticket");
const User = require("../models/user");

class TicketController {
  async register(req, res) {
    const { title, description, detail, category, userId } = req.body;

    const ticket = await Ticket.create({
      title, description, detail, category, userId
    })

    return res.status(201).json(ticket)
  }

  async layoutRegister(req, res) {

    const userId = req.session.userId;

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    })

    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    const category = await Category.findAll();

    const categories = category.map((category) => ({
      id: category.id,
      title: category.title
    }))

    return res.render('create-ticket', { categories, isTeam, isAdmin, userId })
  }

  async layoutMyTickets(req, res) {
    const userId = req.session.userId;

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    })

    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    const ticket = await Ticket.findAll({
      where: {
        userId
      }
    });

    const tickets = ticket.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      observation: ticket.observation,
      detail: ticket.detail,
      category: ticket.category,
      status: ticket.status,
      open: ticket.open,
    }));

    return res.render('my-tickets', { isTeam, isAdmin, tickets })
  }

  async layoutTickets(req, res) {

    const userId = req.session.userId;

    const { admin, technician } = await User.findOne({
      where: {
        id: userId
      }
    });

    const ticket = await Ticket.findAll();

    const isTeam = technician ? true : (admin ? true : false)
    const isAdmin = admin ? true : false

    const tickets = ticket.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      detail: ticket.detail,
      category: ticket.category,
      status: ticket.status,
      open: ticket.open,
      isTeam,
      isAdmin,
      isOpen: ticket.open && isTeam
    }));

    const technical= await User.findAll({
      where: {
        technician: 1
      }
    });

    const technicals = technical.map((technical) => ({
      id: technical.id,
      username: technical.username
    }));

    const allTickets = { tickets, technicals }
    return res.render('tickets', { allTickets, isTeam: technician ? true : (admin ? true : false) })
  }

  async partner(req, res) {
    const { ticketId, technicalId } = req.body;

    const hasPartner = await Ticket.findOne({
      where: {
        id: ticketId, technicalId
      }
    });

    if(hasPartner) return res.status(400).json({ error: 'Este Técnico de suporte já está associado ao ticket' })

    await Ticket.update({ technicalId }, {
        where: {
          id: ticketId
        }
    })

    return res.status(204).json({})
  }

  async disassociate(req, res) {
    const { ticketId, technicalId } = req.body;

    const hasPartner = await Ticket.findOne({
      where: {
        id: ticketId, technicalId
      }
    });

    if(!hasPartner) return res.status(400).json({ error: 'Este Técnico de suporte não está associado ao ticket' })

     await Ticket.update({ technicalId: null }, {
        where: {
          id: ticketId
        }
    })

    return res.status(204).json({})
  }

async conclude(req, res) {
    const { ticketId, observation } = req.body;


    if(!observation) {
        await Ticket.update({ open: false, status: 'Fechado' }, {
          where: {
            id: ticketId,
          }
        })

        return res.status(204).json({})
    }

    await Ticket.update({ observation, open: false, status: 'Fechado' }, {
        where: {
          id: ticketId
        }
    })

    return res.status(204).json({})
  }

  async reOpen(req, res) {
    const { ticketId } = req.body;

    await Ticket.update({ open: true, status: 'Aberto' }, {
      where: {
        id: ticketId,
      }
    })

    return res.status(204).json({})
  }
}


module.exports = TicketController;