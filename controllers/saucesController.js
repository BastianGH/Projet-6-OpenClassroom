const Sauce = require('../models/saucesModel');

exports.getSauces = (req,res, next) => {
  console.log("bonjour")
    Sauce.find()
    .then((sauce) => { 
      res.status(200).json(sauce)
      console.log(sauce)
     })
    .catch((error) => { 
      res.status(400).json({error})
      console.log(error) 
     });
};

exports.getSauce = (req, res, next) => {
    Sauce.findOne({ id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log("route sauce")
    console.log(sauceObject)
    delete sauceObject.id;
    delete sauceObject.userId;

    console.log(sauceObject)
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
      .then(() => { res.status(201).json({ message: 'Objet enregistré !'}) })
      .catch((error) => { res.status(400).json({ error }) });
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}; 