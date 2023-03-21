const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT

app.set('port', process.env.PORT || 3000  )
const server = http.createServer(app);

server.listen( PORT || 3000 );

console.log("le serveur écoute sur le port "+PORT)