const express = require('express');
const router = express.Router();
const oneController = require('../controllers/oneController')

router.use('/', oneController.getAllOne)  //// Vrai modèle

router.post('/', oneController.createOne);

router.put('/:id', oneController.modifyOne);

router.delete('/:id', oneController.deleteOne);

router.get('/:id', oneController.getOne); //// Modèles de base

module.exports = router;