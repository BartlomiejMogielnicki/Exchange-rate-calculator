const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateInfo = document.getElementById('rate-info');


// Calculate and update UI
const calculate = () => {
    const currencyOneVal = currencyOne.value;
    const currencyTwoVal = currencyTwo.value;

    // Fetch exchange rate API and process data
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOneVal}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currencyTwoVal]
            rateInfo.innerHTML = `1 ${currencyOneVal} = ${rate.toFixed(5)} ${currencyTwoVal}`
            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });
}

// Swap currency
const swapCurrency = () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);