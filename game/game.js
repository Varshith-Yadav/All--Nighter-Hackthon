document.getElementById('start-game').addEventListener('click', () => {
    const terms = [
        "Bear Market", "Bull Market", "IPO", "Dividend", "Market Cap",
        "Stock Split", "P/E Ratio", "Limit Order", "Day Trading", "Volatility",
        "Mutual Fund", "Hedge Fund", "ETF", "Portfolio", "Short Selling",
        "Bond", "Index", "Blue Chip", "Capital Gain", "Liquidity",
        "Risk", "Yield", "Margin Call", "Options", "Derivatives"
    ];

    
    const shuffledTerms = terms.sort(() => Math.random() - 0.5).slice(0, 25);

    const bingoCard = document.getElementById('bingo-card');
    bingoCard.innerHTML = '';
    shuffledTerms.forEach(term => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.textContent = term;
        cell.addEventListener('click', () => {
            cell.classList.toggle('marked');
        });
        bingoCard.appendChild(cell);
    });

    document.getElementById('new-term').style.display = 'block';
});




document.getElementById('new-term').addEventListener('click', () => {
    const terms = [
        "Bear Market", "Bull Market", "IPO", "Dividend", "Market Cap",
        "Stock Split", "P/E Ratio", "Limit Order", "Day Trading", "Volatility",
        "Mutual Fund", "Hedge Fund", "ETF", "Portfolio", "Short Selling",
        "Bond", "Index", "Blue Chip", "Capital Gain", "Liquidity",
        "Risk", "Yield", "Margin Call", "Options", "Derivatives"
    ];

    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    document.getElementById('announcement').textContent = `Announcement: ${randomTerm}`;
});


function checkWinningCondition() {
    const cells = document.querySelectorAll('.bingo-cell');
    const grid = Array.from(cells).map(cell => cell.classList.contains('marked') ? 1 : 0);

    // Convert 1D array to 2D array (5x5)
    const matrix = [];
    while (grid.length) matrix.push(grid.splice(0, 5));

    // Check rows, columns, and diagonals
    const isWinningLine = line => line.every(cell => cell === 1);

    // Check rows and columns
    for (let i = 0; i < 5; i++) {
        if (isWinningLine(matrix[i]) || isWinningLine(matrix.map(row => row[i]))) {
            return true;
        }
    }

    // Check diagonals
    if (isWinningLine(matrix.map((row, i) => row[i])) ||
        isWinningLine(matrix.map((row, i) => row[4 - i]))) {
        return true;
    }

    return false;
}

// Add event listener to check win
document.getElementById('bingo-card').addEventListener('click', () => {
    if (checkWinningCondition()) {
        alert("Bingo! You won!");
    }
});