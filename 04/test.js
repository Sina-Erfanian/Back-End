const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("logEvent", (msg) => {
  console.log("I am a log event " + msg);
});

setInterval(() => {
  myEmitter.emit("logEvent", ":)");
}, 2000);
