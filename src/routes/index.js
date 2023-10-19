const { Router } = require('express');
const HomeController = require('../controllers/home');
const UserController = require('../controllers/user');
const PainelController = require('../controllers/painel');
const auth = require('../middleware/auth');
const CategoryController = require('../controllers/category');
const TicketController = require('../controllers/ticket');
const TechnicianController = require('../controllers/technician');

const homeController = new HomeController();
const userController = new UserController();
const painelController = new PainelController();
const categoryController = new CategoryController();
const ticketController = new TicketController();
const technicianController = new TechnicianController();


const router = Router()

router.get('/', homeController.home)

// Usuario
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/sair', userController.logout)

router.get('/painel', auth,  painelController.home);


// Categoria 
router.post('/categoria/register', auth, categoryController.register);
router.get('/categoria/findAll', auth, categoryController.findAll);
router.get('/categoria/cadastrar', auth, categoryController.layoutCategory);

// Ticket 
router.post('/ticket/register', auth, ticketController.register);
router.get('/ticket/cadastrar',auth, ticketController.layoutRegister);
router.get('/ticket/meus-ticket',auth, ticketController.layoutMyTickets);
router.get('/ticket/tickets',auth, ticketController.layoutTickets);
router.post('/ticket/partner',auth, ticketController.partner);
router.post('/ticket/disassociate',auth, ticketController.disassociate);
router.post('/ticket/conclude',auth, ticketController.conclude);
router.post('/ticket/reopen',auth, ticketController.reOpen);

// Admin 
router.get('/tecnico/cadastrar', auth, technicianController.layout)
router.post('/technician/register', auth, technicianController.register)

module.exports = router;