// How Nodejs differs from Vanilla js

// 1 ) Node runs on a server - not in browser (backend not front)
// 2 ) The console is the terminal window
// 3 ) Global object instead of window object
// console.log(global);
// 4 ) Has common core modules that we will explore
// 5 ) CommonJs modules instead of Es6 modules
// 6 ) Missing some js APIs like fetch

const os = require("os");
const path = require("path");

// console.log(os);

// console.log("Type :" , os.type());
// console.log("Version :" , os.version());
// console.log("homedir :" , os.homedir());

// console.log("dirname :", __dirname);
// console.log("filename :", __filename);

// console.log("path direname :", path.dirname(__filename));
// console.log("base name : ", path.basename(__filename));
// console.log("extname : ", path.extname(__filename));

// console.log("path :", path.parse(__filename));

const math = require("./math");

// also we can destructure in require like : const {divide} = require("./math")

// console.log(math);

// console.log(math.add(2,6));
// console.log(math.subtract(6,2));
