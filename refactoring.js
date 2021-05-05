function statement(invoice, plays) {
  
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += ` - ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`   
  }
  result += `총액: ${usd(totalAmount())}\n`;  
  result += `적립포인트: ${totalVolumeCredits()}점\n`;  
  return result;
  

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
  
  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(perf).type) 
    result += Math.floor(perf.audience / 5);
    return result
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function usd(aNumber)   {
    return new Intl.NumberFormat("en-US", { 
                                            style: "currency", 
                                            currency: "USD", 
                                            minimumFractionDigits: 2 
                                          }
                                ).format(aNumber/100);
  }
  
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
  


  
  

}

// console.log(plays);
// console.log(invoice);

function load() {
  
  let JSONInvoice = JSON.parse(invoice);
  let JSONPlays = JSON.parse(plays);
  console.log(statement(JSONInvoice, JSONPlays));

}