let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let incorrectCount = 0;
let timer;
let username = '';
const socket = io();
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

function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].correct;
    const resultText = document.createElement('p');
    const nextButton = document.createElement('button');

    if (selectedAnswer === correctAnswer) {
        score++;
        resultText.textContent = "Your answer is correct!";
    } else {
        incorrectCount++;
        resultText.textContent = "Your answer is incorrect!";
    }

    nextButton.textContent = "Next Question";
    nextButton.classList.add('next-btn');
    nextButton.onclick = () => {
        currentQuestionIndex++;
        loadQuestion();
    };

    const questionScreen = document.getElementById('question-screen');
    questionScreen.appendChild(resultText);
    questionScreen.appendChild(nextButton);
    
    // Disable all answer buttons after selecting an answer
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });
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
            clearInterval(timer);
            incorrectCount++;
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('question-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = score;
    // 插入排行榜
    socket.emit('get rank', score);
    socket.on('update rank', (rank) => {
        const rankList = document.getElementById('rank-list');
        rankList.innerHTML = '';
        rank.forEach((item, index) => {
            console.log(item)
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${item[0]} ${item[1]}`;
            rankList.appendChild(li);
        });
    });

}

document.getElementById('play-again-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    incorrectCount = 0;
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
});
