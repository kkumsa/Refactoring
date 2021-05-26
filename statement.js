
import createStatementData from "./createStatementData.js";

function statementPlainText(invoices, plays) {
  let result = ''
  for (let invoice of invoices.list) {
    result += renderPlainText(createStatementData(invoice, plays));
  }
  return result;
}

function renderPlainText(data) {  
  let result = `Invoice Detail (Cusomer: for ${data.customer})\n`;
  for (let aPerformance of data.performances) {
    result += ` - ${aPerformance.play.name} (${aPerformance.play.type}): ${usd(aPerformance.amount)} (${aPerformance.audience} seats, ${aPerformance.volumeCredits} pts)\n`   
  }
  result += `Total Amount: ${usd(data.totalAmount)}\n`;  
  result += `Accumulated Points: ${data.totalVolumeCredits} points\n`;  
  return result;

  // function totalAmount(data) {
  //   return data.performances
  //     .reduce((total, p) => total + p.amount, 0);
  // }

  // function totalVolumeCredits(data) {
  //   return data.performances
  //     .reduce((total, p) => total + p.volumeCredits, 0);
  // }
  
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
}

function num(aNumber) {
  return new Intl.NumberFormat("en-US", {maximumSignificantDigits: 3}).format(aNumber);
}

function statementHTML(invoices, plays) {
  let result = ''
  for (let invoice of invoices.list) {
    result += `<hr><div>${renderHtml(createStatementData(invoice, plays))}</div>`;
  }
  return result;
}


function renderHtml(data) {
  
  let result = `<div>청구 내역 (고객: ${data.customer})</div>`;
  for (let aPerformance of data.performances) {
    result += `<div>- ${aPerformance.play.name} (${aPerformance.play.type.substring(0,3)}): ${usd(aPerformance.amount)} (${aPerformance.audience}석, ${aPerformance.volumeCredits}점)</div>`   
  }
  result += `<div>총액: ${usd(data.totalAmount)}</div>`;  
  result += `<div>적립 포인트: ${num(data.totalVolumeCredits)}점</div>`;  
  return result;

}

// console.log(plays);
// console.log(invoice);

//function load() {  
  let JSONInvoices = JSON.parse(invoices);
  let JSONPlays = JSON.parse(plays);

  console.log(statementPlainText(JSONInvoices, JSONPlays));
  document.getElementById("body").innerHTML = statementHTML(JSONInvoices, JSONPlays);
  
//}

// let numbers = [81, 9, 16, 25];
// let x = numbers.map(Math.sqrt);
// document.getElementById("demo").innerHTML = x;

// let obj1 = {a:1};
// let obj2 = {b:2};
// let obj3 = {c:3};
// let newObj = Object.assign({}, obj1, obj2, obj3);
// console.log(newObj);

