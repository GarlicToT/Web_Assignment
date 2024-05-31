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

class UserScores {
    constructor() {
        this.scoresMap = new Map();
        this.sortedUsers = [];
    }

    // 添加或更新用户得分
    addOrUpdateUser(username, score) {
        if (this.scoresMap.has(username)) {
            const existingScore = this.scoresMap.get(username);
            if (score > existingScore) {
                this.scoresMap.set(username, score);
                this.updateSortedUsers(username, score);
            }
        } else {
            this.scoresMap.set(username, score);
            this.sortedUsers.push({ username, score });
            this.sortedUsers.sort((a, b) => b.score - a.score);
        }
    }
    updateSortedUsers(username, score) {
        for (let i = 0; i < this.sortedUsers.length; i++) {
            if (this.sortedUsers[i].username === username) {
                this.sortedUsers[i].score = score;
                break;
            }
        }
        this.sortedUsers.sort((a, b) => b.score - a.score);
    }

    getUserScore(username) {
        return this.scoresMap.get(username) || null;
    }

    removeUserFromSortedList(username) {
        this.sortedUsers = this.sortedUsers.filter(user => user.username !== username);
    }

    getSortedUsers() {
        return this.sortedUsers;
    }
}

// use socket.io 
io.on('connection', (socket) => {
    const userScores = new UserScores();

    socket.on('new user', (username) => {
        userScores.addOrUpdateUser(username, -1);
        io.emit('new user', username);
    });
    socket.on('update rank', (newScore, username) => {
        console.log(newScore, username);
        userScores.addOrUpdateUser(username, newScore);
        const sortedUsers = userScores.getSortedUsers();
        io.emit('update rank', sortedUsers);
    });

});

// listen to the port
http.listen(port, () => {
    console.log(`listening on port: ${port}`);
    console.log(`If you're running locally, server running at http://${hostname}:${port}/`);
    console.log(`If you're running on codio, server running at https://peaceyoga-normaldarwin-${port}.codio-box.uk/`)
});