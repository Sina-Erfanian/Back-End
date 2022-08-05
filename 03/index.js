// we install nodemon globally with npm i nodemon -g

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyy/MM/dd\tHH:mm:ss"));

console.log(uuid());
console.log(uuid());
console.log(uuid());
console.log(uuid());


// npm
// 2.3.1 => 2 major / 3 minor / 1 patch 
// ^ update minor and patch
// ~ just update patch
