const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                .then(() => res.status(201).json("Utilisateur crée"))
                .catch(err => res.status(400).json({ err }))
            })
            .catch(err => res.status(500).json({ err }))
        }else {
            res.status(500).json("Cette addresse mail existe déja")
        }
    })
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user===null){
            res.status(401).json( {message: 'Le mot de passe et/ou l\'identifiant ne sont pas correct(s)'} )
        }else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    res.status(401).json( {message: 'Le mot de passe et/ou l\'identifiant ne sont pas correct(s)'})
                }else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(err => {
                res.status(500).json( {err} );
            })
        }
    })
    .catch(err => { 
        res.status(500).json( {err} );
    })
}
