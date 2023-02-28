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

// DOM Elements

const quote = document.getElementById("quote");
const citation = document.getElementById("citation");

// Functions

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

// CALCULATOR

const endBalance = document.getElementById("end-balance");
const totalContribs = document.getElementById("total-contribs");
const totalInterest = document.getElementById("total-interest");
const calcBtn = document.getElementById("calc-btn");
calcBtn.addEventListener("click", calc);

function calc() {
  // Variables
  let p = document.getElementById("p").value;
  let r = document.getElementById("r").value / 100; //Converts to decimal
  let n = document.getElementById("n").value;
  let t = document.getElementById("t").value;
  let mc = document.getElementById("mc").value;
  
  // Functions
  function calcTotalMC() {
    let result = mc * t * 12;
    totalContribs.textContent = `$${result}`;
    return result;
  };

  function calcTotalInterest() {
    let result = calcEndBalance() - calcTotalMC() - p;
    totalInterest.textContent = `$${result}`
    return result;
  };
  
  function calcPrincInterest() {
    return p * (1 + r / n) ** (t * n);
  }
  
  function calcMCInterest() {
    // return mc * ((1 + r / n) ** ((n * t + 1) / 12) - 1) * 12 / (r / n)
    return 12 / n * mc * (((1 + r / n) ** (n * t)) - 1) / (r / n);
  }
  
  function calcEndBalance() {
    // endBalance.innerHTML = `<strong>${calcPrincInterest()} + ${calcMCInterest()}</strong>`;
    if (mc > 0) {
      endBalance.innerHTML = `<strong>$${calcPrincInterest() + calcMCInterest()}</strong>`;
    } else {
      endBalance.innerHTML = `<strong>$${calcPrincInterest()}</strong>`;
    }
    return calcPrincInterest() + calcMCInterest();
  };

  calcEndBalance();
  calcTotalMC();
  calcTotalInterest();
};








//Need to round down, can't round up if money, right?


// In this simple example, the principal and contributions are compounded monthly. I belive this is typical, although some calculators give the option to compound annually, continuously, etc. I don't think it's necessary to change it to anything other than monthly.

// function calc(P, r, n, t, PMT) {
//   function calcPrincipal() {
//     return P * (1 + r / n) ** (t * n);
//   }

//   // This will be based off a selection of two options. For right now, I'm just using the monthly contribution at the end of a month;
//   function calcBeginCont() {
//     return PMT * (((1 + r / n) ** (t * n) - 1) / (r / n)) * (1 + r / n);
//   }

//   //C * [((1 + r/n)^(n*t+1) - (1 + r/n))/ (r/n)]

//   // PMT × {[(1 + r/n)^(nt) - 1] / (r/n)}
//   function calcEndCont() {
//     return PMT * (((1 + r / n) ** (t * n) - 1) / (r / n));
//   }

//   return calcPrincipal() + calcEndCont();
// }
