const userService = require('../../business/services/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const constants = require('../../util/constants');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await userService.getByEmail(email);
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user[0].password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user[0].email,
                userId: user[0].id.toString()
            },
            constants.getSecretKey(),
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return res.status(err.statusCode).json({ error: err.message });
    }
}