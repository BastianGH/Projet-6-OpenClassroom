const userModel = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new userModel({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json("Utilisateur crée"))
        .catch(err => res.status(400).json({ err }))
    })
    .catch(err => res.status(500).json({ err }))
};

exports.login = (req, res, next) => {

}