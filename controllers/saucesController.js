const Sauce = require('../models/saucesModel');
const fs = require('fs');

exports.getSauces = (req,res, next) => {
    Sauce.find()
    .then((sauce) => { 
      res.status(200).json(sauce)
     })
    .catch((error) => { 
      res.status(400).json({error})
     });
};

exports.getSauce = (req, res, next) => {
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
    if(sauce.userId===req.auth.userId) {
    
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    }else {
      res.status(403).json({message: 'Unauthorized request'})
    }
  })    
}; 

exports.likeSauce = (req, res, next) => {
  
  const like = req.body.like;
  let authorization = true;
  let cancelLike = false;
  let cancelDislike = false;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        if (sauce.usersLiked.includes(req.auth.userId) || sauce.usersDisliked.includes(req.auth.userId)){
          authorization = false;
          if(sauce.usersLiked.includes(req.auth.userId)) {
            cancelLike = true;
          }else {
            cancelDislike = true;
          }
      }
      if(like===1) {
          if(authorization){
            Sauce.updateOne({ _id: req.params.id },
              { 
                ...req.body,
                $addToSet: { usersLiked: req.auth.userId},
                $inc: { likes: 1 },
                _id: req.params.id 
                })
            .then(() => { res.status(201).json({ message: 'La sauce a été aimé !'}) })
            .catch((error) => { res.status(401).json({ error }) });
          }else {
            res.status(402).json({message: "La sauce a déja été like ou dislike"})
          }
      }else if (like===-1){
        if(authorization){
          console.log("l'utilisateur peut aimer la sauce");

          Sauce.updateOne({ _id: req.params.id },
            { 
              ...req.body,
              $addToSet: { usersDisliked: req.auth.userId },
              $inc: { dislikes: 1 },
              _id: req.params.id 
            })
          .then(() => { res.status(201).json({ message: "La sauce n'a pas été aimé !"}) })
          .catch((error) => { res.status(401).json({ error }) });
        }else {
          res.status(402).json({message: "La sauce a déja été like ou dislike"})
        }
      }else {
        if(cancelLike) {
          Sauce.updateOne({ _id: req.params.id },
            { 
              ...req.body,
              $pull: { usersLiked: { $in: [req.auth.userId] } },
              $inc: { likes: -1 },
              _id: req.params.id 
              })
          .then(() => { res.status(201).json({ message: 'Le like pour la sauce a été retiré !'}) })
          .catch((error) => { res.status(401).json({ error }) });
        }else if (cancelDislike){
          Sauce.updateOne({ _id: req.params.id },
            { 
              ...req.body,
              $pull: { usersDisliked: { $in: [req.auth.userId] } },
              $inc: { dislikes: -1 },
              _id: req.params.id 
              })
          .then(() => { res.status(201).json({ message: "La dislike pour la sauce a été retiré !"}) })
          .catch((error) => { res.status(401).json({ error }) });
        }else {
          res.status(403).json({message: "La sauce n'a pas encore été like ou disklike"})
        }
      }
    })
}