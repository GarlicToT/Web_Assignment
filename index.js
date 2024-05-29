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

// let rank = {};
// let user = {};
// // 字典按照value实现排序，返回排序后的字典
function sortDict(dict) {
    let items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    return items;
}
// // 组合rank{id:score}和user{id:username}字典，得到username:score的字典
// function combineDict(rank, user) {
//     let items = Object.keys(rank).map(function(key) {
//         return [user[key], rank[key]];
//     });
//     return items;
// }
let rank = {};
// use socket.io 
io.on('connection', (socket) => {
    socket.on('new user', (username) => {
        // rank[(socket.id).toString()] = -1;
        // user[(socket.id).toString()] = username;
        rank[username] = -1;
        io.emit('new user', username);
    });
    socket.on('update rank', (newScore, username) => {
        // rank[(socket.id).toString()] = newScore > rank[(socket.id).toString()] ? newScore : rank[(socket.id).toString()];
        rank[username] = newScore > rank[username] ? newScore : rank[username];
        io.emit('update rank', sortDict(rank));
    });
    socket.on('get rank', () => {
        io.emit('update rank', sortDict(rank));
    });
    
});

// listen to the port
http.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
    console.log(`If you're running locally, server running at http://${hostname}:${port}/`);
    console.log(`If you're running on codio, server running at https://peaceyoga-normaldarwin-${port}.codio-box.uk/`)
});