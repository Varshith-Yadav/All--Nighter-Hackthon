let company = document.getElementById('company-name');
let industry = document.getElementById('industry');
let des = document.getElementById('description');
let marketcap = document.getElementById('market-cap');
let PEratio = document.getElementById('pe-ratio');
let dividend = document.getElementById('dividend-yield');
let head = document.getElementById('header');
let Stockinfo = document.getElementById('company-details');
let searchbtn = document.getElementById('search-btn');
let container = document.getElementById('container');  // Add this line
let stockChart = null;
const apiKey = 'OL7H5DPBUPACZBD0';

async function search() {
    head.style.display = 'none';
    Stockinfo.style.display = 'block';
    container.style.display = 'none';  // Add this line
    
    const query = document.getElementById('usersearch').value.trim();
    if (!query) {
        return alert('Please enter a valid stock symbol.');
    }

    const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${apiKey}`;
    const timeSeriesUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${apiKey}`;

    try {
        const overviewResponse = await fetch(overviewUrl);
        const overviewData = await overviewResponse.json();
        
        if (overviewData.Note) {
            return alert('API call limit reached. Please try again later.');
        }

        company.textContent = overviewData.Name || 'N/A';
        industry.textContent = overviewData.Industry || 'N/A';
        des.textContent = overviewData.Description || 'N/A';
        marketcap.textContent = overviewData.MarketCapitalization || 'N/A';
        PEratio.textContent = overviewData.PERatio || 'N/A';
        dividend.textContent = overviewData.DividendYield || 'N/A';

        const timeSeriesResponse = await fetch(timeSeriesUrl);
        const timeSeriesData = await timeSeriesResponse.json();

        const dailyData = timeSeriesData['Time Series (Daily)'];
        if (!dailyData) {
            return alert('Failed to fetch time series data.');
        }

        const dates = Object.keys(dailyData).slice(0, 30).reverse();
        const prices = dates.map(date => parseFloat(dailyData[date]['4. close']));

        if (stockChart) {
            stockChart.destroy();
        }

        const ctx = document.getElementById('stock-chart').getContext('2d');
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `${query} Stock Price`,
                    data: prices,
                    borderColor: 'rgb(242, 0, 0)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch stock data. Please try again later.');
    }
}

searchbtn.addEventListener('click', search);






function showDetails(concept) {
    const details = {
        pe: {
            title: "P/E Ratio",
            description: `The Price-to-Earnings (P/E) ratio measures a company's current share price relative to its per-share earnings.
        - Importance: Helps determine if a stock is overvalued or undervalued compared to peers.
        - Example: A low P/E may indicate an undervalued stock, but it could also signal weak future growth.`,
        },
        dividend: {
            title: "Dividend Yield",
            description: `Dividend yield shows how much a company pays out in dividends each year relative to its stock price.
        - Importance: Great for income-focused investors.
        - Example: A higher yield often indicates a reliable income source but may also signal risk.`,
        },
        equity: {
            title: "Equity",
            description: `Equity represents ownership in a company.
        - Importance: It’s the foundation of investing, offering the potential for capital appreciation.
        - Example: Buying equity means owning a piece of the business.`,
        },
        marketCap: {
            title: "Market Cap",
            description: `Market capitalization measures a company's total value.
        - Importance: Helps classify companies into small-cap, mid-cap, or large-cap, indicating risk and growth potential.
        - Example: Large-cap stocks are generally stable, while small-cap stocks offer higher growth potential.`,
        },
        risk: {
            title: "Risk Tolerance",
            description: `Risk tolerance defines your ability and willingness to endure market fluctuations.
        - Importance: Determines the type of investments suitable for you.
        - Example: High-risk tolerance investors may prefer stocks, while low-risk investors lean toward bonds.`,
        },
        compounding: {
            title: "Compounding",
            description: `Compounding is the process of earning returns on both your original investment and the returns reinvested.
        - Importance: It significantly amplifies wealth over time.
        - Example: Investing $1,000 at 8% annual return grows to $2,158 in 10 years due to compounding.`,
        },
        patience: {
            title: "Patience",
            description: `Patience is key in investing, as markets often fluctuate in the short term but trend upwards over time.
        - Importance: Ensures emotional control and long-term wealth building.
        - Example: Holding investments during downturns can lead to substantial gains later.`,
        },
    };

    const selectedConcept = details[concept];
    const detailsDiv = document.getElementById("details");
    detailsDiv.innerHTML = `
      <h2>${selectedConcept.title}</h2>
      <p>${selectedConcept.description}</p>
    `;
}