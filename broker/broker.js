//* Required modules */
const http = require("http");
const path = require("path");
var url = require("url");
const b = require("bonescript");

//* Networking Variables */
const HOST = "192.168.137.50";
const PORT = 4020;

//* Database */
let storedUsers = [
   { id: "0001", name: "Nolan Gilmore", age: 99, major: "cpe" },
   { id: "0002", name: "Caleb Goodman", age: 99, major: "cpe" },
   { id: "0003", name: "Johnny Lozano", age: 99, major: "cpe" },
   { id: "0004", name: "Anthony Lopez", age: 99, major: "cpe" },
   { id: "0005", name: "Alem Sahic", age: 99, major: "cpe" },
   { id: "0006", name: "Etta Achere", age: 99, major: "cpe" },
];

//* Functions
/**
 * Receives data from ESP and finds user from
 * stored user data on the BBB
 *
 * @param { string } targetId id of target user to be added to laptop subscriber
 * @returns { Object } calledUser target user json
 */
function findUserData(targetId) {
   if (targetId === 0) return;

   let calledUser = storedUsers.filter((user) => {
      return user.id === targetId;
   });
   return calledUser[0];
}

/* Creates a web-server and facilitates API calls */
const server = http.createServer((req, res) => {
   var urlName = url.parse(req.url);
   console.log(urlName);
   if (req.url === path.normalize(req.url)) {
      res.end("Hi");
   }

   if (req.url === path.normalize("/")) {
      /* Not authorized to view the root resource. */
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("0");
      console.log(req.url);

      /* end point as ./sender=####&id=#### */
   } else if (req.url === path.normalize(`/group5/lanyard/`)) {
      try {
         res.end(JSON.stringify(findUserData("0015")));
      } catch (err) {
         return;
      }
   } else {
      /* Page not found */
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("this page doesn't exist");
   }
});

/* Start the http server. Non-blocking. */
server.listen(PORT, HOST);
