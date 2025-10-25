// Mythic personality quiz questions
const questions = [
    {
        question: "How do you respond to chaos?",
        answers: [
            { text: "I rise and transform", type: "phoenix" },
            { text: "I retreat and reflect", type: "moth" },
            { text: "I guide others through", type: "stag" },
            { text: "I dissolve and re-emerge", type: "serpent" }
        ]
    },
    {
        question: "What do you guard most fiercely?",
        answers: [
            { text: "My truth", type: "phoenix" },
            { text: "My dreams", type: "moth" },
            { text: "My people", type: "stag" },
            { text: "My silence", type: "serpent" }
        ]
    },
    {
        question: "Where do you feel most alive?",
        answers: [
            { text: "In firelight and thunder", type: "phoenix" },
            { text: "Beneath moonlight waves", type: "moth" },
            { text: "In ancient forest", type: "stag" },
            { text: "Among stars and shadows", type: "serpent" }
        ]
    },
    {
        question: "What do others sense in you?",
        answers: [
            { text: "Power", type: "phoenix" },
            { text: "Mystery", type: "serpent" },
            { text: "Wisdom", type: "stag" },
            { text: "Grace", type: "moth" }
        ]
    }
];

// Mythic creature descriptions
const creatures = {
    phoenix: {
        name: "Phoenix",
        description: "You are a being of transformation and rebirth. Like the mythical Phoenix, you rise from the ashes stronger than before. Your power lies in your ability to transform challenges into growth and inspire others through your resilience."
    },
    moth: {
        name: "Moth",
        description: "You are drawn to the mysteries of life and the beauty of the unknown. Like the Moth, you navigate by inner light and intuition. Your strength lies in your ability to find beauty in darkness and guide others to hidden truths."
    },
    stag: {
        name: "Stag",
        description: "You are a natural leader and protector. Like the noble Stag, you stand tall and guide others through difficult terrain. Your strength lies in your wisdom, your connection to ancient knowledge, and your fierce protection of those you care about."
    },
    serpent: {
        name: "Serpent",
        description: "You embody the ancient wisdom of cycles and renewal. Like the Serpent, you understand the power of shedding old skins and emerging renewed. Your strength lies in your ability to adapt, transform, and move through life with grace and purpose."
    }
};

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');

let currentQuestionIndex;
let answers = [];
let typeScores = { phoenix: 0, moth: 0, stag: 0, serpent: 0 };

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    answers = [];
    typeScores = { phoenix: 0, moth: 0, stag: 0, serpent: 0 };
    scoreContainer.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.type = answer.type;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedType = selectedButton.dataset.type;
    
    // Record the answer
    answers.push(selectedType);
    typeScores[selectedType]++;
    
    // Highlight the selected answer
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button === selectedButton) {
            button.classList.add('correct');
        }
    });
    
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        setTimeout(() => {
            showResult();
        }, 1000);
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    // Find the creature type with the highest score
    let maxScore = 0;
    let resultType = 'phoenix';
    
    for (const [type, score] of Object.entries(typeScores)) {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    }
    
    const creature = creatures[resultType];
    
    questionElement.innerHTML = `
        <h2>Your Mythic Spirit: ${creature.name}</h2>
        <p>${creature.description}</p>
    `;
    
    startButton.innerText = 'Take Quiz Again';
    startButton.classList.remove('hide');
}