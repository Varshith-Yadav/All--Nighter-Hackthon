// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Update user info
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-balance').textContent = `₹${currentUser.balance.toFixed(2)}`;

    // Load portfolio
    loadPortfolio();
    
    // Fetch real-time stock data
    fetchStockData();
});

// Fetch real-time stock data from Alpha Vantage API
async function fetchStockData() {
    const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your API key
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']; // Example stocks
    
    for (const symbol of symbols) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
            const data = await response.json();
            
            if (data['Global Quote']) {
                updateStockCard(symbol, data['Global Quote']);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }
}

function updateStockCard(symbol, data) {
    const price = parseFloat(data['05. price']);
    const change = parseFloat(data['09. change']);
    const changePercent = parseFloat(data['10. change percent']);
    
    const stockCard = document.createElement('div');
    stockCard.className = 'stock-card';
    stockCard.innerHTML = `
        <h3>${symbol}</h3>
        <p class="price">$${price.toFixed(2)}</p>
        <p class="change ${change >= 0 ? 'positive' : 'negative'}">
            ${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent}%)
        </p>
        <button onclick="buyStock('${symbol}', ${price})">Buy</button>
    `;
    
    document.getElementById('portfolio-items').appendChild(stockCard);
}

function buyStock(symbol, price) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const quantity = prompt(`How many shares of ${symbol} would you like to buy? (Current price: $${price})`);
    
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }

    const totalCost = price * quantity;
    if (totalCost > currentUser.balance) {
        alert('Insufficient funds');
        return;
    }

    // Update user's portfolio and balance
    currentUser.balance -= totalCost;
    currentUser.portfolio.push({
        symbol,
        quantity: parseInt(quantity),
        purchasePrice: price,
        currentPrice: price
    });

    // Update local storage
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update UI
    document.getElementById('user-balance').textContent = `₹${currentUser.balance.toFixed(2)}`;
    loadPortfolio();
}

function loadPortfolio() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const portfolioContainer = document.getElementById('portfolio-items');
    portfolioContainer.innerHTML = '';

    currentUser.portfolio.forEach(item => {
        const stockCard = document.createElement('div');
        stockCard.className = 'stock-card';
        const profit = (item.currentPrice - item.purchasePrice) * item.quantity;
        
        stockCard.innerHTML = `
            <h3>${item.symbol}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Purchase Price: $${item.purchasePrice.toFixed(2)}</p>
            <p>Current Price: $${item.currentPrice.toFixed(2)}</p>
            <p class="profit ${profit >= 0 ? 'positive' : 'negative'}">
                Profit/Loss: $${profit.toFixed(2)}
            </p>
        `;
        
        portfolioContainer.appendChild(stockCard);
    });
}

function startLearning(module) {
    // Redirect to learning module
    window.location.href = `learn.html?module=${module}`;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
} 