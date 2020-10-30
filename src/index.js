const express = require ('express');
const app = express();
const  socketio = require ('socket.io');
const http = require('http');
const path = require("path");
const puerto = 4040;

//configura el server
const server = http.createServer(app);

const io = socketio.listen(server);

app.set('port', process.env.puerto || puerto)

require('./sockets')(io);


//static file
app.use(express.static(path.join(__dirname,"public")));


//arranca servidor

server.listen(puerto, ()=>{
    console.log("Escuchando Crack en", app.get('port'))
});