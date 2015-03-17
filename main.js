var network = require("./network.js");
var planning = require("./planning.js");

var A = network.insert();
var B = network.insert();
var C = network.insert();
var D = network.insert();
var E = network.insert();

console.log("A: " + A);
console.log("B: " + B);
console.log("C: " + C);
console.log("D: " + D);
console.log("E: " + E);

network.connectBoth(A, B, 1);
network.connectBoth(A, C, 2);
network.connectBoth(B, E, 2);
network.connectBoth(C, D, 1);
network.connectBoth(B, C, 1);
network.connectBoth(E, D, 1);

console.log("From " + A + " to " + E + ":");
console.log("    " + planning.plan(network.getNodes(), A, E).join(" -> "));