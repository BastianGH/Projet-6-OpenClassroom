const express = require('express');
const router = express.Router();
const saucesController = require('../controllers/saucesController')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.use('/', auth, saucesController.getSauces) 
router.get('/:id', auth, saucesController.getSauce);
router.post('/', auth, multer, saucesController.createSauce);
router.put('/:id', auth, multer, saucesController.modifySauce);
router.delete('/:id', auth, saucesController.deleteSauce);

module.exports = router;