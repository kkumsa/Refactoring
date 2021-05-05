function statement(invoice, plays) {

  function amountFor(aPerfomance) {
    let result = 0;
    switch (playFor(aPerfomance).type) {
      case "tragedy":
        result = 80000;
        if (aPerfomance.audience > 30) {
          result += 1000 * (aPerfomance.audience - 30);
        }
        break;
      case "comedy":
        result = 60000;
        if (aPerfomance.audience > 20) {
          result += 10000 + 500 * (aPerfomance.audience - 20);
        }
        result += 300 * aPerfomance.audience;
        break;
      default:
        throw new Error('알 수 없는 장르: ${playFor(perf).type}');
      }
      return result;
  }

  function playFor(aPerfomance) {
    return plays[aPerfomance.playID];
  }
  



  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", 
                                        minimumFractionDigits: 2 }).format;
  for (let perf of invoice.performances) {

    let thisAmount = amountFor(perf, playFor(perf));

    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(perf).type) 
      volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` - ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}석)\n`
    totalAmount += thisAmount;

  }

  result += `총액: ${format(totalAmount/100)}\n`;  
  result += `적립포인트: ${volumeCredits}점\n`;  
  return result;
  
  

}

// console.log(plays);
// console.log(invoice);

function load() {
  
  let JSONInvoice = JSON.parse(invoice);
  let JSONPlays = JSON.parse(plays);
  console.log(statement(JSONInvoice, JSONPlays));

}