const express = require('express');
const router = express.Router();
const {getUsers, getUserBanks} = require('../controllers/admin.controller')

router.get('/users', getUsers);
router.get('/users/:id',getUserBanks);


module.exports = router;