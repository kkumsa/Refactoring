


function statement(invoice, plays) {
  return createStatementData(invoice, plays)
}

function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance){
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);    
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 80000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 60000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }
      return result;
  }
  
  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === perf.type) 
    result += Math.floor(perf.audience / 5);
    return result
  }
  
  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }
  
  function totalVolumeCredits(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }
    return result;
  }

}


function renderPlainText(data, plays) {
  
  let result = `Invoice Detail (Cusomer: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += ` - ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`   
  }
  result += `Total Amount: ${usd(data.totalAmount)}\n`;  
  result += `Accumulated Points: ${data.totalVolumeCredits} points\n`;  
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { 
                                            style: "currency", 
                                            currency: "USD", 
                                            minimumFractionDigits: 2 
                                          }
                                ).format(aNumber/100);
  }

  function totalAmount(data) {
    return data.performances
      .reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances
      .reduce((total, p) => total + p.volumeCredits, 0);
  }
  
}

// console.log(plays);
// console.log(invoice);

function load() {
  
  let JSONInvoice = JSON.parse(invoice);
  let JSONPlays = JSON.parse(plays);
  console.log(statement(JSONInvoice, JSONPlays));

}