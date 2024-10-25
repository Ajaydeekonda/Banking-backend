const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add', authMiddleware, bankController.addBankAccount);
router.get('/', authMiddleware, bankController.getBankAccounts);
router.get('/:id', authMiddleware, bankController.getDetails);
router.put('/edit/:id', authMiddleware, bankController.editBankAccount);
router.delete('/:id', authMiddleware, bankController.deleteBankAccount);

module.exports = router;
