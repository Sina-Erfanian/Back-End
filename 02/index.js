// const fs = require("fs");
// const path = require("path");

// read
// fs.readFile("./files/starter.txt",(err , data) => {
//     if (err) throw err
//     console.log(data.toString());
// })

// instead of using toString to read the data correctly we can set utf8
// also instead of hard coding for path name we use this below code :

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// console.log("Hi..."); // this run first and then we got data (async)

// write
// we put rename inside the write because we want to first of all create our file and then rename it . in the other word we want to use sync
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "This is my content",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Complete");
//     fs.rename(
//       path.join(__dirname, "files", "reply.txt"),
//       path.join(__dirname, "files", "newReply.txt"),
//       (err) => {
//         if (err) throw err;
//         console.log("Rename Complete");
//       }
//     );
//   }
// );

// Updating
// it will create a file if it doesn't exist
// fs.appendFile(
//   path.join(__dirname, "files", "test.txt"),
//   "testing text 2.",
//   (err) => {
//     if (err) throw err;
//     console.log("Append Complete");
//   }
// );

// if we have error this will be run
// exit on uncaught error
// process.on("uncaughtException", (err) => {
//   console.log(`there was an uncaught error : ${err}`);
//   process.exit(1);
// });

///////////////////////////////////////////////
// use async await in file

const fsPromise = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  const data = await fsPromise.readFile(
    path.join(__dirname, "files", "starter.txt"),
    "utf8"
  );
  // delete original file with unlink
  await fsPromise.unlink(path.join(__dirname, "files", "starter.txt"));
  
  await fsPromise.writeFile(
    path.join(__dirname, "files", "promiseWrite.txt"),
    data
  );
  await fsPromise.appendFile(
    path.join(__dirname, "files", "promiseWrite.txt"),
    "\n\nNice To Meet You"
  );
  await fsPromise.rename(
    path.join(__dirname, "files", "promiseWrite.txt"),
    path.join(__dirname, "files", "promiseComplete.txt")
  );
  const newData = fsPromise.readFile(
    path.join(__dirname, "files", "promiseComplete.txt"),
    "utf8"
  );
  console.log(newData);
};

fileOps();
