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
