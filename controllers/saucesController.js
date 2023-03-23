const Sauce = require('../models/saucesModel');

exports.getSauces = (req,res, next) => {
    Sauce.find()
    .then((sauce) => { req.status(200).json(sauce) })
    .catch((error) => { res.status(400).json({error}) });
};

exports.getSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    delete sauceObject._id;
    delete sauceObject._userId;

    console.log(sauceObject)
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth._userId,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
      .then(() => { res.status(201).json({ message: 'Objet enregistré !'}) })
      .catch((error) => { res.status(400).json({ error }) });
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}; 