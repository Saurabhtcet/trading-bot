function calculateProfitLoss(transactions) {
    let balance = 0;
    let profit = 0;
  
    for (let i = 0; i < transactions.length; i++) {
      const { type, price } = transactions[i];
  
      if (type === 'BUY') {
        balance -= price;
      } else if (type === 'SELL') {
        balance += price;
      }
    }
  
    profit = balance; // Since starting balance is 0, profit equals the final balance.
    return profit.toFixed(2);
  }
  
  module.exports = calculateProfitLoss;
  