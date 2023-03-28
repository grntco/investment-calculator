// QUOTES
const quotesArr = [
  {
    text: "All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.",
    author: "Naval Ravikant",
    source: "https://twitter.com/naval/status/1002103908947263488"
  },
  {
    text: "The long game isn't particularly notable. It doesn't attract a lot of attention. In fact, from the outside, the long game looks boring. The tiny advantages that accrue aren't noticed until success becomes too obvious to ignore.",
    author: "Farnam Street",
    source: "https://fs.blog/long-game/"
  },
  {
    text: "The first step is the hardest. You have to be willing to suffer today in order to not suffer tomorrow. This is why so few people play the long game.",
    author: "Farnam Street",
    source: "https://fs.blog/long-game/"
  },
  {
    text: "The longer you play the short game, the harder things get. The longer you play the long game, the better the rewards. This happens because as the accumulation of tiny advantages makes the future easier, but the accumulation of tiny disadvantages makes the future harder.",
    author: "Farnam Street",
    source: "https://twitter.com/farnamstreet/status/1630931340878139392"
  },
  {
    text: "Slug it out one inch at a time, day by day. At the end of the day—if you live long enough—most people get what they deserve.",
    author: "Charlie Munger"
  },
  {
    text: "Professionals stick to the schedule; amateurs let life get in the way.",
    author: "James Clear",
    source: "https://jamesclear.com/atomic-habits"
  },
  {
    text: "Success is the product of daily habits—not once-in-a-lifetime transformations.",
    author: "James Clear",
    source: "https://jamesclear.com/atomic-habits"
  },
  {
    text: "The individual investor should act consistently as an investor and not as a speculator.",
    author: "Benjamin Graham"
  },
  {
    text: "Don't look for the needle in the haystack. Just buy the haystack!",
    author: "John Bogle",
    source: "https://www.amazon.com/Little-Book-Common-Sense-Investing/dp/0470102101"
  },
  {
    text: "Owning the stock market over the long term is a winner's game, but attempting to beat the market is a loser's game.",
    author: "John Bogle",
    source: "https://www.amazon.com/Little-Book-Common-Sense-Investing/dp/0470102101"
  },
  {
    text: "Simplicity beats complexity",
    author: "John Bogle",
    source: "https://www.amazon.com/Little-Book-Common-Sense-Investing/dp/0470102101"
  },
  {
    text: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.",
    author: "Albert Einstein"
  },
  {
    text: "Patience is a superpower.",
    author: "Oliver Burkeman",
    source: "https://www.amazon.com/Four-Thousand-Weeks-Management-Mortals/dp/0374159122"
  }
];

// Load a new quote upon page load

const quote = document.getElementById("quote");
const citation = document.getElementById("citation");

function getRandomQuote(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function loadQuote() {
  let quoteObj = getRandomQuote(quotesArr);
  quote.textContent = `"${quoteObj.text}"`;
  if (quoteObj.hasOwnProperty("source")) {
    citation.innerHTML = `– <a href="${quoteObj.source}" target="_blank">${quoteObj.author}</a>`;
  } else {
    citation.textContent = `– ${quoteObj.author}`;
  }
}
loadQuote();

// Highlight input field symbols

const inputSymbols = document.querySelectorAll('.input-symbol');

function highlightSymbol() {
  let elem = document.activeElement;
  inputSymbols.forEach(symbol => {
    symbol.classList.remove('focused');
  });
  if (elem.classList.contains('num-input')) {
    elem.previousElementSibling.classList.add('focused');
  };
};

document.addEventListener('click', highlightSymbol);
document.addEventListener('keyup', highlightSymbol);

// CALCULATOR
const pInput = document.getElementById('p');
const rInput = document.getElementById('r');
const mcInput = document.getElementById('mc');
const tInput = document.getElementById('t');
const endBalance = document.getElementById("end-balance");
const totalContribs = document.getElementById("total-contribs");
const totalInterest = document.getElementById("total-interest");
const calcBtn = document.getElementById("calc-btn");

function checkValues() {

  function checkDollar(amount) {
      return amount < 0 || amount > 1000000 ? false : true;
  }
  
  function checkRate(rate) {
    return rate < 0.01 || rate > 100 ? false : true;
  }
  
  function checkYears(years) {
    return years < 0.08 || years > 100 ? false : true;
  }

  if (checkDollar(pInput.value) && checkRate(rInput.value) && checkDollar(mcInput.value) && checkYears(tInput.value)) {
    return true;
  } else {
    if (!checkDollar(pInput.value)) {
      document.getElementById('p-error').classList.add('display-error')
    } else {
      document.getElementById('p-error').classList.remove('display-error')
    }
    if (!checkRate(rInput.value)) {
      document.getElementById('r-error').classList.add('display-error')
    } else {
      document.getElementById('r-error').classList.remove('display-error')
    }
    if (!checkDollar(mcInput.value)) {
      document.getElementById('mc-error').classList.add('display-error')
    } else {
      document.getElementById('mc-error').classList.remove('display-error')
    }
    if (!checkYears(tInput.value)) {
      document.getElementById('t-error').classList.add('display-error')
    } else {
      document.getElementById('t-error').classList.remove('display-error')
    }
    return false;
  };
};

function calc() {
  
  let p = pInput.value;
  let r = rInput.value / 100; //Converts to decimal
  // let n = document.getElementById("n").value;
  let n = 12;
  let mc = mcInput.value;
  let t = tInput.value;
  
  function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calcTotalMC() {
    let result = mc * t * 12;
    totalContribs.textContent = `$${addCommas(result.toFixed(2))}`;
    return result;
  };

  function calcTotalInterest() {
    let result = (calcEndBalance() - calcTotalMC() - p).toFixed(2);
    totalInterest.textContent = `$${addCommas(result)}`
    return result;
  };
  
  function calcPrincInterest() {
    return p * (1 + r / n) ** (t * n);
  }
  
  function calcMCInterest() {
    return 12 / n * mc * (((1 + r / n) ** (n * t)) - 1) / (r / n);
  }
  
  function calcEndBalance() {
    let result = (calcPrincInterest() + calcMCInterest()).toFixed(2);
    endBalance.innerHTML = `<strong>$${addCommas(result)}</strong>`;
    return result;
  };

  if (checkValues()) {
    calcEndBalance();
    calcTotalMC();
    calcTotalInterest();
  };
};

calcBtn.addEventListener("click", calc);
document.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    calc();
  }
});