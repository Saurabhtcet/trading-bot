const express = require('express');
const generateMockPrices = require('./data/mockData'); // Mock stock price data generator
const tradingLogic = require('./tradingLogic'); // Import the trading logic

const app = express();
const port = 3000;

// Mock stock prices (Generate 100 prices)
const stockPrices = generateMockPrices();

// Bot state
const bot = {
  lastPrice: stockPrices[0], // Start with the first stock price
  transactions: [],
};

// Function to simulate the trading bot
function runTradingBot() {
  stockPrices.forEach((stockPrice, index) => {
    if (isNaN(stockPrice)) {
      console.error(`Invalid stock price at index ${index}: ${stockPrice}`);
      return; // Skip this iteration if the stock price is NaN
    }

    console.log(`Stock Price at ${index}: ${stockPrice}`);
    tradingLogic(stockPrice, bot); // Run trading logic for each price
  });

  console.log('Market closed.');
  console.log(`Final Profit/Loss: ${calculateProfitLoss().toFixed(2)}`);
}

// Endpoint to display the bot's report
app.get('/report', (req, res) => {
  const profitLoss = calculateProfitLoss();
  res.json({
    transactions: bot.transactions,
    finalProfitLoss: profitLoss.toFixed(2),
  });
});

// Calculate final profit or loss from transactions
function calculateProfitLoss() {
  let profitLoss = 0;
  for (let i = 0; i < bot.transactions.length; i += 2) {
    const buyPrice = bot.transactions[i].price;
    const sellPrice = bot.transactions[i + 1]?.price || buyPrice; // If no sell, assume no profit/loss
    profitLoss += sellPrice - buyPrice;
  }
  return profitLoss;
}

// Start the trading bot and the server
runTradingBot();

app.listen(port, () => {
  console.log(`Trading bot server running on port ${port}`);
});
