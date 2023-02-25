// Global variables

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









//Need to round down, can't round up if money, right?

// In this simple example, the principal and contributions are compounded monthly. I belive this is typical, although some calculators give the option to compound annually, continuously, etc. I don't think it's necessary to change it to anything other than monthly.
// Would n be a constant of 12?

function calc(P, r, n, t, PMT) {
  function calcPrincipal() {
    return P * (1 + r / n) ** (t * n);
  }

  // This will be based off a selection of two options. For right now, I'm just using the monthly contribution at the end of a month;
  function calcBeginCont() {
    return PMT * (((1 + r / n) ** (t * n) - 1) / (r / n)) * (1 + r / n);
  }

  // PMT × {[(1 + r/n)^(nt) - 1] / (r/n)}
  function calcEndCont() {
    return PMT * (((1 + r / n) ** (t * n) - 1) / (r / n));
  }

  return calcPrincipal() + calcEndCont();
}
