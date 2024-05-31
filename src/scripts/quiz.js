let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let incorrectCount = 0;
let timer;
let username = '';
const socket = io();

function alert(message) {
    console.log('alert:', message);
    // add overlay
    const overlay = $('<div>').addClass('overlay');
    $('body').append(overlay);
    // add message box
    const msg = $('<div>').attr('id', 'msg');
    const msgCont = $('<div>').attr('id', 'msg_cont').text(message);
    const msgClear = $('<div>').attr('id', 'msg_clear').text('OK');
    msg.append(msgCont).append(msgClear);
    $('body').append(msg);
    // remove overlay and message box when click OK button
    msgClear.click(function() {
      overlay.remove();
      msg.remove();
    });
  };
document.getElementById('username').addEventListener('keydown',function(event){
    if(event.key=='Enter'){
        username = document.getElementById('username').value;
        if (username) {
            document.getElementsByClassName('welcome-screen')[0].style.display = 'none';
            document.getElementById('question-screen').style.display = 'block';
            console.log('username:', username)
            socket.emit('new user', username);
            loadQuestions();
        } else {
            alert('Please enter your name');
        }
    }
})
  
document.getElementById('start-quiz-btn').addEventListener('click', function() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementsByClassName('welcome-screen')[0].style.display = 'none';
        document.getElementById('question-screen').style.display = 'block';
        console.log('username:', username)
        socket.emit('new user', username);
        loadQuestions();
    } else {
        alert('Please enter your name');
    }
});


function loadQuestions() {
    fetch('../data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById('question-text').textContent = questionData.question;
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button, index) => {
            if (questionData.answers[index]) {
                button.style.display = 'block';
                button.textContent = questionData.answers[index];
                button.onclick = () => checkAnswer(button.textContent);
            } else {
                button.style.display = 'none';
            }
        });
        resetTimer();
    } else {
        endQuiz();
    }
}
function showResult(message) {
    console.log('alert:', message);
    // add overlay
    const overlay = $('<div>').addClass('overlay');
    $('body').append(overlay);
    // add message box
    const msg = $('<div>').attr('id', 'msg');
    const msgCont = $('<div>').attr('id', 'msg_cont').text(message);
    const msgClear = $('<div>').attr('id', 'msg_clear').text('Next Question');
    msg.append(msgCont).append(msgClear);
    $('body').append(msg);
    // remove overlay and message box when click OK button
    msgClear.click(function() {
        currentQuestionIndex++;
        loadQuestion();
        overlay.remove();
        msg.remove();
    });
  }
function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].correct;
    // const resultText = document.createElement('p');
    // const nextButton = document.createElement('button');
    if (selectedAnswer==""){
        incorrectCount++;
        showResult("Time's up! Your answer is incorrect!");
    }
    else if (selectedAnswer === correctAnswer) {
        score++;
        showResult("Your answer is correct!");
    } else {
        incorrectCount++;
        showResult("Your answer is incorrect!");
    }

}

function loadQuestion() {
    const questionScreen = document.getElementById('question-screen');
    // 清除上一个问题的结果和按钮
    while (questionScreen.lastChild.tagName === 'P' || questionScreen.lastChild.tagName === 'BUTTON') {
        questionScreen.removeChild(questionScreen.lastChild);
    }

    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById('question-text').textContent = questionData.question;
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button, index) => {
            if (questionData.answers[index]) {
                button.style.display = 'block';
                button.textContent = questionData.answers[index];
                button.disabled = false;
                button.onclick = () => checkAnswer(button.textContent);
            } else {
                button.style.display = 'none';
            }
        });
        resetTimer();
    } else {
        endQuiz();
    }
}


function resetTimer() {
    clearInterval(timer);
    let timeLeft = 15;
    document.getElementById('time-left').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft === 0) {
            checkAnswer('');
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('question-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = score;
    // 插入排行榜
    socket.emit('update rank', score, username);
    socket.on('update rank', (sortedUsers) => {
        const rankList = document.getElementById('rank-list');
        rankList.innerHTML = '';
        sortedUsers.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `${user.username}: ${user.score}`;
            rankList.appendChild(userItem);
          });
    });

}

document.getElementById('play-again-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    incorrectCount = 0;
    document.getElementById('result-screen').style.display = 'none';
    document.getElementsByClassName('welcome-screen')[0].style.display = 'flex';
});
