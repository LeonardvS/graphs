const key = 'MV0T3SN2913V7QZA';
const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=`;

export function getBTC() {
  return fetchRequest(`${url}BTC&market=USD&apikey=${key}`);
}

export function getEth() {
  return fetchRequest(`${url}ETH&market=USD&apikey=${key}`);
}

export function getBCH() {
  return fetchRequest(`${url}BCH&market=USD&apikey=${key}`);
}

function fetchRequest(url) {
  return fetch(url)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}