const startText =document.getElementById("start-text");
const startButton = document.getElementById("start-btn");
const questionCont = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const scoreboard = document.getElementById("scoreboard");
const restartButton = document.getElementById("restart-btn");
const setButton = document.getElementById("set-name");
const lastName = document.getElementById("name-span");
const lastScore = document.getElementById("score-span");
let score;
let rndmQuestions, questionIndex



startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", resetGame);

setButton.addEventListener("click", function(event){
    event.preventDefault();

    let nameVal = document.querySelector("#name").value;

    localStorage.setItem("name", nameVal);
    localStorage.setItem("scoreval", score);
})

let countdown;

function startTimer(){
    let count = 25;
     countdown = setInterval(function() {
        count--;
        timerEl.textContent = "Seconds Left: " + count;

        if (count === 0){
            stopTimer();
            timerEl.textContent = "TIME OUT";
            scoreBoard();
        }
    }, 1000)
    }

function stopTimer(){
    clearInterval(countdown);
    countdown = null;
}



function startGame(){
    score = 0;
    startTimer();
    startButton.classList.add("hide");
    startText.classList.add("hide");
    rndmQuestions = questionList.sort(() => Math.random() -.5);
    questionIndex = 0;
    questionCont.classList.remove("hide");
    nextQuestion();
}

function nextQuestion(){ 
    resetAnswers();
    showQuestion(rndmQuestions[questionIndex]);
}

function showQuestion(question){
    questionEl.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    })
}

function resetAnswers(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function scoring(){
    score ++;
    scoreEl.textContent = "Score: " + score;
}

function selectAnswer(event){
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct
    if(rndmQuestions.length > questionIndex + 1){
        if (correct){
            questionIndex++;
            scoring();  
            nextQuestion();
        }
    }else{
        if(correct){
            scoring();
            stopTimer();
            startButton.classList.remove("hide");
            startButton.textContent = "Restart";
            timerEl.textContent = "Timer Stopped"
            scoreBoard();
        }
    }
}


function resetGame(){
    startButton.classList.remove("hide");
    startText.classList.remove("hide");
    questionCont.classList.add("hide");
    scoreboard.classList.add("hide");
    score = 0;
    scoreEl.textContent = "Score : ";
}


function scoreBoard(){
    questionCont.classList.add("hide");
    startButton.classList.add("hide");
    scoreboard.classList.remove("hide");
    renderLastRegister();
}

function renderLastRegister(){
    lastName.textContent = localStorage.getItem("name");
    lastScore.textContent = localStorage.getItem("scoreval");
}


const questionList = [
    {
        question : 'What is JS?',
        answers: [
            {text: 'JavaSolutions', correct : false },
            {text: 'JSolution', correct: false},
            {text: 'JavaSoul', correct : false},
            {text: 'JavaScript', correct: true}
        ]
    },
    {
        question : 'What does DOM stand for?',
        answers: [
            {text: 'DOMain', correct : false },
            {text: 'Document Object Model', correct: true},
            {text: 'Document Objectify Modification', correct : false},
            {text: 'Document Organizer Map', correct: false}
        ]
    },
    {
        question : 'What does HTML stand for?',
        answers: [
            {text: 'Hyper Train Moving Locomotive', correct : false },
            {text: 'HyperTable Mapping List', correct: false},
            {text: 'HyperText Markup Language', correct : true},
            {text: 'Hyperglyph TableMapping Language', correct: false}
        ]
    },
    {
        question : 'Are Java and Javascript the same thing?',
        answers: [
            {text: 'Yes', correct : false },
            {text: 'No', correct : true},
        ]
    },
    {
        question : 'What does API stand for',
        answers: [
            {text: 'Application Programming Intelligence', correct : false },
            {text: 'Application Programming Interface', correct : true},
            {text: 'Application Parsing Interface', correct : false },
            {text: 'Application Parsing Indentation', correct : false },
        ]
    }
]