// Learning module data
const modules = {
    'stocks': {
        title: 'Stock Market Basics',
        theory: [
            {
                title: 'What are Stocks?',
                content: 'Stocks represent ownership in a company. When you buy a stock, you become a shareholder and own a piece of that company.'
            },
            {
                title: 'How Stock Prices Work',
                content: 'Stock prices are determined by supply and demand in the market. They can be influenced by company performance, economic factors, and investor sentiment.'
            },
            {
                title: 'Types of Stocks',
                content: 'Common stocks give voting rights and potential dividends. Preferred stocks typically don\'t have voting rights but have priority in dividend payments.'
            }
        ],
        practice: [
            {
                type: 'simulation',
                title: 'Buy Your First Stock',
                description: 'Use your virtual balance to purchase shares of a company. Watch how the price changes affect your investment.'
            },
            {
                type: 'analysis',
                title: 'Analyze Company Performance',
                description: 'Review a company\'s financial statements and make an investment decision based on the data.'
            }
        ],
        quiz: [
            {
                question: 'What does it mean to own a stock?',
                options: [
                    'You own a piece of the company',
                    'You are lending money to the company',
                    'You are the company\'s customer',
                    'You are the company\'s employee'
                ],
                correct: 0
            },
            {
                question: 'What primarily determines a stock\'s price?',
                options: [
                    'Supply and demand',
                    'Company size',
                    'Number of employees',
                    'CEO\'s salary'
                ],
                correct: 0
            }
        ]
    },
    'mutual-funds': {
        title: 'Mutual Funds',
        theory: [
            {
                title: 'What are Mutual Funds?',
                content: 'Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities.'
            },
            {
                title: 'Types of Mutual Funds',
                content: 'There are various types including equity funds, bond funds, money market funds, and balanced funds.'
            },
            {
                title: 'Benefits of Mutual Funds',
                content: 'Diversification, professional management, and accessibility are key benefits of investing in mutual funds.'
            }
        ],
        practice: [
            {
                type: 'portfolio',
                title: 'Create a Mutual Fund Portfolio',
                description: 'Select different types of mutual funds to create a balanced portfolio based on your risk tolerance.'
            },
            {
                type: 'comparison',
                title: 'Compare Fund Performance',
                description: 'Analyze and compare the performance of different mutual funds over time.'
            }
        ],
        quiz: [
            {
                question: 'What is the main advantage of mutual funds?',
                options: [
                    'Diversification',
                    'Guaranteed returns',
                    'No fees',
                    'Instant liquidity'
                ],
                correct: 0
            },
            {
                question: 'Who manages a mutual fund?',
                options: [
                    'Professional fund managers',
                    'Individual investors',
                    'Government officials',
                    'Bank tellers'
                ],
                correct: 0
            }
        ]
    },
    'crypto': {
        title: 'Cryptocurrency Trading',
        theory: [
            {
                title: 'What is Cryptocurrency?',
                content: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized networks.'
            },
            {
                title: 'Blockchain Technology',
                content: 'Blockchain is the underlying technology that enables cryptocurrencies to function in a secure and transparent manner.'
            },
            {
                title: 'Trading Cryptocurrencies',
                content: 'Cryptocurrency trading involves buying and selling digital assets on exchanges, similar to stock trading but with unique characteristics.'
            }
        ],
        practice: [
            {
                type: 'trading',
                title: 'Execute a Crypto Trade',
                description: 'Practice buying and selling cryptocurrencies in a simulated environment.'
            },
            {
                type: 'analysis',
                title: 'Analyze Crypto Charts',
                description: 'Learn to read and interpret cryptocurrency price charts and indicators.'
            }
        ],
        quiz: [
            {
                question: 'What is blockchain?',
                options: [
                    'A decentralized digital ledger',
                    'A type of cryptocurrency',
                    'A bank account',
                    'A stock exchange'
                ],
                correct: 0
            },
            {
                question: 'What makes cryptocurrency unique?',
                options: [
                    'Decentralization',
                    'Physical form',
                    'Government backing',
                    'Fixed value'
                ],
                correct: 0
            }
        ]
    }
};

// Initialize learning module
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update user info
    document.getElementById('user-name').textContent = currentUser.name;

    // Get module from URL
    const urlParams = new URLSearchParams(window.location.search);
    const moduleName = urlParams.get('module');
    
    if (!moduleName || !modules[moduleName]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const module = modules[moduleName];
    document.getElementById('module-title').textContent = module.title;

    // Load theory content
    const theoryContent = document.getElementById('theory-content');
    module.theory.forEach((item, index) => {
        const theoryCard = document.createElement('div');
        theoryCard.className = 'theory-card';
        theoryCard.innerHTML = `
            <h3>${index + 1}. ${item.title}</h3>
            <p>${item.content}</p>
        `;
        theoryContent.appendChild(theoryCard);
    });

    // Load practice content
    const practiceContent = document.getElementById('practice-content');
    module.practice.forEach((item, index) => {
        const practiceCard = document.createElement('div');
        practiceCard.className = 'practice-card';
        practiceCard.innerHTML = `
            <h3>${index + 1}. ${item.title}</h3>
            <p>${item.description}</p>
            <button onclick="startPractice('${moduleName}', ${index})">Start Practice</button>
        `;
        practiceContent.appendChild(practiceCard);
    });

    // Load quiz content
    const quizContent = document.getElementById('quiz-content');
    module.quiz.forEach((item, index) => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        quizCard.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p>${item.question}</p>
            <div class="options">
                ${item.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizContent.appendChild(quizCard);
    });

    // Add submit button for quiz
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.onclick = () => submitQuiz(moduleName);
    quizContent.appendChild(submitButton);
});

function startPractice(moduleName, practiceIndex) {
    const module = modules[moduleName];
    const practice = module.practice[practiceIndex];
    
    // Implement practice simulation based on type
    switch (practice.type) {
        case 'simulation':
            simulateStockTrading();
            break;
        case 'portfolio':
            simulatePortfolioCreation();
            break;
        case 'trading':
            simulateCryptoTrading();
            break;
        case 'analysis':
            simulateAnalysis();
            break;
    }
}

function simulateStockTrading() {
    // Implement stock trading simulation
    alert('Starting stock trading simulation...');
    // Add interactive trading interface
}

function simulatePortfolioCreation() {
    // Implement portfolio creation simulation
    alert('Starting portfolio creation simulation...');
    // Add interactive portfolio builder
}

function simulateCryptoTrading() {
    // Implement crypto trading simulation
    alert('Starting crypto trading simulation...');
    // Add interactive crypto trading interface
}

function simulateAnalysis() {
    // Implement analysis simulation
    alert('Starting analysis simulation...');
    // Add interactive analysis tools
}

function submitQuiz(moduleName) {
    const module = modules[moduleName];
    let score = 0;
    
    module.quiz.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.correct) {
            score++;
        }
    });

    const percentage = (score / module.quiz.length) * 100;
    alert(`Quiz completed! Your score: ${score}/${module.quiz.length} (${percentage}%)`);

    // Update user's learning progress
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser.learningProgress) {
        currentUser.learningProgress = {};
    }
    currentUser.learningProgress[moduleName] = percentage;

    // Update local storage
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update progress bar
    document.getElementById('learning-progress').style.width = `${percentage}%`;
    document.getElementById('learning-progress').textContent = `${percentage}%`;
} 