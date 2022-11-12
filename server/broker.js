//* Required modules */
const http = require("http");
const path = require("path");
const url = require("url");
const b = require("bonescript");

//* Networking Variables */
const HOST = "192.168.137.50";
const PORT = 4020;

//* Database */
let storedUsers = [
   { id: "0001", name: "Nolan", age: 99, major: "cpe" },
   { id: "0002", name: "Caleb", age: 99, major: "cpe" },
   { id: "0003", name: "Johnny", age: 99, major: "cpe" },
   { id: "0004", name: "Anthony", age: 99, major: "cpe" },
   { id: "0005", name: "Alem", age: 99, major: "cpe" },
   { id: "0006", name: "Etta", age: 99, major: "cpe" },
];

const Etta = [];
const Anthony = [];
const Alem = [];
const Nolan = [];
const Johnny = [];
const Caleb = [];

//* Functions */

/**
 * Finds data of user with ID
 *
 * @param { string } targetId id of target user to be added to laptop subscriber
 * @returns { Object } calledUser target user json
 */
function findUserById(targetId) {
   if (targetId === 0) return;

   let calledUser = storedUsers.filter((user) => {
      return user.id === targetId;
   });
   return calledUser[0];
}

/* Creates a web-server and facilitates API calls */
const server = http.createServer((req, res) => {
   let q = url.parse(req.url, true);
   let qdata = q.query;

   /* Check proper url format */
   if (q.pathname === "/group5/find") {
      try {
         let user = findUserById(qdata.user);
         let target = findUserById(qdata.target);

         /* Prevents storing undefined or target if the target is also the user */
         if (target === undefined || user === target) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Unexpected error");
         } else if (user.name === "Nolan") {
            Nolan.push(target);
            console.log(Nolan);
         } else if (user.name === "Caleb") {
            Caleb.push(target);
            console.log(Caleb);
         } else if (user.name === "Johnny") {
            Johnny.push(target);
            console.log(Johnny);
         } else if (user.name === "Anthony") {
            Anthony.push(target);
            console.log(Anthony);
         } else if (user.name === "Alem") {
            Alem.push(target);
            console.log(Alem);
         } else if (user.name === "Etta") {
            Etta.push(target);
            console.log(Etta);
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("User not found");
         }
      } catch (err) {
         res.writeHead(404, { "Content-Type": "text/plain" });
         res.end("Unexpected error");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Success");
   }

   if (req.url === path.normalize("/")) {
      /* Not authorized to view the root resource. */
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("0");
      console.log(req.url);

      /* End points for users to call API */
   } else if (req.url === path.normalize("/group5/u/etta")) {
      try {
         res.end(JSON.stringify(Etta));
      } catch (err) {
         return;
      }
   } else if (req.url === path.normalize("/group5/u/anthony")) {
      try {
         res.end(JSON.stringify(Anthony));
      } catch (err) {
         return;
      }
   } else if (req.url === path.normalize("/group5/u/alem")) {
      try {
         res.end(JSON.stringify(Alem));
      } catch (err) {
         return;
      }
   } else if (req.url === path.normalize("/group5/u/nolan")) {
      try {
         res.end(JSON.stringify(Nolan));
      } catch (err) {
         return;
      }
   } else if (req.url === path.normalize("/group5/u/johnny")) {
      try {
         res.end(JSON.stringify(Johnny));
      } catch (err) {
         return;
      }
   } else if (req.url === path.normalize("/group5/u/caleb")) {
      try {
         res.end(JSON.stringify(Caleb));
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
