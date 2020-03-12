const userService = require('../../business/services/userService');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res, next) => {
    const users = await userService.getAll();
    res.status(200).json({ message: 'Users fetched.', users: users });
};

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.status(200).json({ message: 'User by Id.', user: user });
};

exports.save = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 12);
    const name = req.body.name;
    await userService.save(email, password, name);
    res.status(201).json({ message: 'User Created.' });
}