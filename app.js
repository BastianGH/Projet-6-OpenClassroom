const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster.3zqn6vj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

/* méthode http : app.get app.post etc */
app.use((req,res,next) => {
    res.status(201);
    next();
})

app.use((req,res, next) => {
    res.json( {message: 'votre requete a été reçu'} );
})

module.exports = app;