

export default function createStatementData(invoice, plays) {

  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance); // this method creates a new array with the result of calling a function for every array element.
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance){
    const result = Object.assign({}, aPerformance);    // this method 
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
        result = 30000;
        if (aPerformance.audience > 30) {
          result += (aPerformance.audience - 30) * 500;
        }
        break;
      case "comedy":
        result = 40000; // default charge
        if (aPerformance.audience > 40) { // over 40
          result += 10000 + ((aPerformance.audience - 40) * 500); // basic 10 + 초과인원 * 5
        }
        result += aPerformance.audience * 1000;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }
      return result;
  }
  
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);    
    if ("comedy" == aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);    // additional points for comendy
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

