// tradingLogic.js

function tradingLogic(stockPrice, bot) {
    const buyThreshold = 0.02; // 2% drop from last price
    const sellThreshold = 0.02; // 2% rise from last buy price

    // Check if we should buy
    if (bot.lastPrice === null || bot.lastPrice > stockPrice * (1 - buyThreshold)) {
        // Buy action
        bot.transactions.push({ type: 'buy', price: stockPrice });
        console.log(`Bought at ${stockPrice}`);
    } 
    // Check if we should sell
    else if (bot.transactions.length > 0 && bot.transactions[bot.transactions.length - 1].type === 'buy') {
        const lastBuyPrice = bot.transactions[bot.transactions.length - 1].price;

        if (stockPrice > lastBuyPrice * (1 + sellThreshold)) {
            // Sell action
            bot.transactions.push({ type: 'sell', price: stockPrice });
            console.log(`Sold at ${stockPrice}`);
        }
    }

    // Update the last price for next comparison
    bot.lastPrice = stockPrice;
}

module.exports = tradingLogic;
