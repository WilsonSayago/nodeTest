const express = require('express');
const { check } = require('express-validator');
const userController = require('../client/controllers/userController');

const router = express.Router();

router.get('/:id', userController.getById);
router.post('/', [
    check('email').isEmail().withMessage('must be valid email.'),
    check('password').isLength({ min: 8 }).withMessage('must be at least 5 chars long.'),
    check('name').trim().notEmpty().withMessage('must be not null.')
], userController.save);
router.get('/', userController.getAll);

module.exports = router;