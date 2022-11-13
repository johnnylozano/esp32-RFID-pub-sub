# API Documentation 

## POST Requests from the Publisher (ESP)

Path: /group5/find/

URL Parameters
* Required: user=[4-digit id]
* Required: target=[4-digit id]

Example URL: /group5/find?user=0001&target=0002

Where user is the person scanning, and target is the person who's data gets sent to the broker to be retrieved by the user.

---

## ID Guide:
* Nolan: 0001
* Caleb: 0002
* Johnny: 0003
* Anthony: 0004
* Alem: 0005
* Etta: 0006

---

## GET List of all users in database (client) 

Path: /group5/lanyard/getIDs

URL Parameters:
* None

Client receives a list of all the users and their respective IDs.

--- 

## GET Request of User Connections (Client)

Path: /group5/lanyard/[id]/connects

URL Parameters: 
* Required: [4-digit id]

Example URL: /group5/lanyard/0006/connections

Where Etta receives a string of all the users he has successfully scanned.

## GET Info of User (Client)

Path: /group5/lanyard/[id]/info

URL Parameters: 
* Required: [4-digit id]

Example URL: /group5/lanyard/0001/info

Client receives name and id of 0001.