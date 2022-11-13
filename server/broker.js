/********************************************
 * CPE 4020: Device Networks
 * Group 5 lanyard Project Server on BBB
 * By: Johnny Lozano
 ********************************************/

/* Required modules */
const http = require("http");
const path = require("path");
const url = require("url");
const b = require("bonescript");

/* Networking Variables */
const HOST = "192.168.137.50";
const PORT = 4020;

/* Database */
let storedUsers = [
   { id: "0001", name: "Nolan Gilmore", age: 99, major: "cpe" },
   { id: "0002", name: "Caleb Goodman", age: 99, major: "cpe" },
   { id: "0003", name: "Johnny Lozano", age: 99, major: "cpe" },
   { id: "0004", name: "Anthony Lopez", age: 99, major: "cpe" },
   { id: "0005", name: "Alem Sahic", age: 99, major: "cpe" },
   { id: "0006", name: "Etta Achere", age: 99, major: "cpe" },
];

/* DO NOT CHANGE
ID list for client to register users
*/
var ID = [
   "Nolan Gilmore",
   "0001",
   "Caleb Goodman",
   "0002",
   "Johnny Lozano",
   "0003",
   "Anthony Lopez",
   "0004",
   "Alem Sahic",
   "0005",
   "Etta Achere",
   "0006",
];

/* DO NOT CHANGE
Info list for client to see more information on each user
*/
var info = {
   "0001": "Nolan Gilmore,CPE,Senior",
   "0002": "Caleb Goodman,CPE,Senior",
   "0003": "Johnny Lozano,CPE,Senior",
   "0004": "Anthony Lopez,CPE,Senior",
   "0005": "Alem Sahic,CPE,Senior",
   "0006": "Etta Achere,CPE,Senior",
};

/* Connected list object for each user with data in string format */
var connects = {
   "0001": "",
   "0002": "",
   "0003": "",
   "0004": "",
   "0005": "",
   "0006": "",
};

/* Functions */

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
   /* reads urls from publisher */
   let q = url.parse(req.url, true);
   let qdata = q.query;

   /* Check proper url format */
   if (q.pathname === "/group5/find") {
      try {
         let user = findUserById(qdata.user);
         let target = findUserById(qdata.target);

         /* Publisher Endpoints */
         if (target === undefined || user === target) {
            /* check invalid target or user id */
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Unexpected error");

            /* Publishes target data to Nolan's list */
         } else if (user.name === "Nolan Gilmore") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Publishes target data to Caleb's list */
         } else if (user.name === "Caleb Goodman") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Publishes target data to Johnny's list */
         } else if (user.name === "Johnny Lozano") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Publishes target data to Anthony's list */
         } else if (user.name === "Anthony Lopez") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Publishes target data to Alem's list */
         } else if (user.name === "Alem Sahic") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Publishes target data to Etta's list */
         } else if (user.name === "Etta Achere") {
            if (connects[user.id] !== "") {
               connects[user.id] = connects[user.id] + "," + target.name;
            } else {
               connects[user.id] = target.name;
            }
            res.end("User successfully updated");

            /* Returns user not found if user is not in database */
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("User not found");
         }

         /* Returns error if incorrect request */
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

      /* Gives client IDs to make request */
   } else if (req.url === path.normalize("/group5/lanyard/getIDs")) {
      /* Names and IDs for subscriber */
      res.end(JSON.stringify(ID));
   } else if (req.url === path.normalize("/group5/lanyard/0001/info")) {
      red.end(info["0001"]);
   } else if (req.url === path.normalize("/group5/lanyard/0002/info")) {
      res.end(info["0002"]);
   } else if (req.url === path.normalize("/group5/lanyard/0003/info")) {
      res.end(info["0003"]);
   } else if (req.url === path.normalize("/group5/lanyard/0004/info")) {
      res.end(info["0004"]);
   } else if (req.url === path.normalize("/group5/lanyard/0005/info")) {
      res.end(info["0005"]);
   } else if (req.url === path.normalize("/group5/lanyard/0006/info")) {
      res.end(info["0006"]);

      /* End points for users to call API */
      /* Sends list of connections for user 0006 */
   } else if (req.url === path.normalize("/group5/lanyard/0006/connections")) {
      try {
         res.end(connects["0006"]);
      } catch (err) {
         return;
      }
      /* Sends list of connections for user 0004 */
   } else if (req.url === path.normalize("/group5/lanyard/0004/connections")) {
      try {
         res.end(connects["0004"]);
      } catch (err) {
         return;
      }
      /* Sends list of connections for user 0005 */
   } else if (req.url === path.normalize("/group5/lanyard/0005/connections")) {
      try {
         res.end(connects["0005"]);
      } catch (err) {
         return;
      }
      /* Sends list of connections for user 0001 */
   } else if (req.url === path.normalize("/group5/lanyard/0001/connections")) {
      try {
         res.end(connects["0001"]);
      } catch (err) {
         return;
      }
      /* Sends list of connections for user 0003 */
   } else if (req.url === path.normalize("/group5/lanyard/0003/connections")) {
      try {
         res.end(connects["0003"]);
      } catch (err) {
         return;
      }
      /* Sends list of connections for user 0002 */
   } else if (req.url === path.normalize("/group5/lanyard/0002/connections")) {
      try {
         res.end(connects["0002"]);
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
