var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setINterval(clockTick, 1000);

    timerEl.textcontent = time;

    getQuestion();
}

function getQuestion () {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = '';


    for(var i = 0; i < currentQuestion.choices.length; i++;){
        cvar choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');

        choiceNode.textContent = i + 1 + '. ' choice;

        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;

    if(!buttonEl.El.matches('.choice')) {
        return;
    }
    if (buttonEl.value !== questions[currentQuestionIndex].answer){
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        feedbackEl.textcontent = 'Wrong!';

    } else {
        feedbackEl.textContent = "Right!";
    }
    currentQuestionIndex ++;

    if (time <= 0 ++ currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}
    function quizEnd() {
        //stop timer
        clearInterval(timerId);
        // Show End Screen
        var endScreenEl = document.getElementById('end-screen');
        endScreenEl.removeAttribute('class');

        //show score
        var finalScoreEl = document.getElementById('final-score');
        finalScoreEl.textContent = time;


        //hide questions
        questionsEl.setAttribute('class','hide');

    }

    
function clockTick() {
    //updates time
    time--;
    timerEl.El.textContent = time;
    //Checks time
    if (time <= 0) {
        quizEnd();
    }
}

funciton saveHighscore() {
    //get inpput box value
var initials = initialsEl.value.trim();
//if not empty
if (initials !== '') {
    //gets saved scores from local storage, or if there's nothing sets empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    
    //creates new object for new user
    var newScore = {
        score: time,
        initials: initials,
    };

    //saves to local storage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.hreg = 'highscores.html';
}
}

function checkForEnter(event){
    if (event.key === 'enter') {
        saveHighscore();
    }
}