// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module-1.js');
const calc1 = new C();
console.log(calc1.add(2, 3));

// exports

//const calc2 = require('./test-module-2.js');
const { add, multiply, divide } = require('./test-module-2.js');

console.log(add(1, 2));
console.log(multiply(4, 4));
console.log(divide(4, 4));

// Caching

require('./test-module-3.js')();
require('./test-module-3.js')();
require('./test-module-3.js')();
