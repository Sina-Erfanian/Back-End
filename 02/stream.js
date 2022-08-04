// if we have larger files sometimes it is good to not grab all of the data at once
// just like moving all the water in a swimming pool bucket by bucket rather than attempting to grab everything all at once so this could be more efficient and a little bit easier on the application if we do this


const fs = require("fs")

const rs = fs.createReadStream("./files/lorem.txt" , {encoding : "utf8"})

const ws = fs.createWriteStream("./files/new-lorem.txt")

rs.pipe(ws)
