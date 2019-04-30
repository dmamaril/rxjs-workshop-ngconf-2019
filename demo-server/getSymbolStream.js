const { of, timer } = require('rxjs');
const { scan } = require('rxjs/operators');
const tickers = require('./tickers');

module.exports = function getSymbolStream(symbol) {
  const ticker = tickers.find(x => x.symbol === symbol);

  if (!ticker) {
    return of({ error: `unknown symbol ${symbol}` });
  }

  if (!ticker.stream) {
    const lastSale = Number(ticker.lastSale) || 100;
    const p = lastSale / 100; // 1%
    ticker.stream = timer(0, 1000).pipe(
      scan((price, n) => Number(
        (price + p * Math.sin(n)).toFixed(2)
      ), lastSale || 100)
    );
  }

  return ticker.stream;
};
