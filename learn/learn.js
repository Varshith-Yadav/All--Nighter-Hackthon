const quizzes = [
    {
        question: "What is a stock?",
        options: ["A type of bond", "Ownership in a company", "A loan to the government", "A type of savings account"],
        correctAnswer: 1
    },
    {
        question: "What does P/E ratio stand for?",
        options: ["Price/Earnings", "Profit/Equity", "Price/Equity", "Profit/Earnings"],
        correctAnswer: 0
    },
    {
        question: "What is diversification?",
        options: ["Investing all money in one stock", "Spreading investments across different assets", "Buying only high-risk stocks", "None of the above"],
        correctAnswer: 1
    }
];



const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreEl = document.getElementById('score');
const retryBtn = document.getElementById('retry-btn');

let currentQuizIndex = 0;
let score = 0;

function loadQuiz() {
    const currentQuiz = quizzes[currentQuizIndex];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });
}

function selectOption(index) {
    const currentQuiz = quizzes[currentQuizIndex];
    if (index === currentQuiz.correctAnswer) {
        score++;
    }
    nextBtn.style.display = 'block';
}

function nextQuiz() {
    currentQuizIndex++;
    if (currentQuizIndex < quizzes.length) {
        loadQuiz();
        nextBtn.style.display = 'none';
    } else {
        showResult();
    }
}

function showResult() {
    resultContainer.style.display = 'block';
    scoreEl.textContent = `${score} out of ${quizzes.length}`;
}

function retryQuiz() {
    resultContainer.style.display = 'none';
    currentQuizIndex = 0;
    score = 0;
    loadQuiz();
}

nextBtn.addEventListener('click', nextQuiz);
retryBtn.addEventListener('click', retryQuiz);

loadQuiz();
