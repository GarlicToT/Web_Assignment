const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const routes = require('./router.js');
const config = require('./config.js');
const hostname = config.hostname;
const port = config.port;

// use express middleware and set static directory
app.use(express.static('src'));

// use router middleware
app.use('/', routes);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/html/home_page.html');
});



// use socket.io 
io.on('connection', (socket) => {
   
});

// listen to the port
http.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
    console.log(`If you're running locally, server running at http://${hostname}:${port}/`);
    console.log(`If you're running on codio, server running at https://peaceyoga-normaldarwin-${port}.codio-box.uk/`)
});