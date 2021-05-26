
import statement from "./statement.js";

function list(invoices, plays) {
  const result = {};  
  result = statement(invoices, plays);
  return result;
}

// console.log(plays);
// console.log(invoice);

//function load() {  
  let JSONInvoices = JSON.parse(invoices);
  let JSONPlays = JSON.parse(plays);

  console.log(list(JSONInvoices, JSONPlays));
  //document.getElementById("body").innerHTML = statementHTML(JSONInvoice, JSONPlays);
  
//}

// let numbers = [81, 9, 16, 25];
// let x = numbers.map(Math.sqrt);
// document.getElementById("demo").innerHTML = x;

// let obj1 = {a:1};
// let obj2 = {b:2};
// let obj3 = {c:3};
// let newObj = Object.assign({}, obj1, obj2, obj3);
// console.log(newObj);

