const Sauce = require('../models/saucesModel');

exports.getSauces = (req,res, next) => {
  console.log("affichage de toutes les sauces")
    Sauce.find()
    .then((sauce) => { 
      res.status(200).json(sauce)
     })
    .catch((error) => { 
      res.status(400).json({error})
     });
};

exports.getSauce = (req, res, next) => {
  console.log("affichage de la sauce")
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log("route pour créer la sauce")
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
  console.log("modification de la sauce")
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
    sauce.userId 
    if(sauce.userId===req.auth.userId) {
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
    }else {
      res.status(403).json({message: 'Unauthorized request'})
    }
    })    
};

exports.deleteSauce = (req, res, next) => {
  console.log("suppression de la sauce")
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
    sauce.userId 
    if(sauce.userId===req.auth.userId) {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    }else {
      res.status(403).json({message: 'Unauthorized request'})
    }
  })    
}; 