# API Documentation 

## POST Requests from the Publisher (ESP)

Path: /group5/find/

URL Parameters
* Required: user=[4-digit id]
* Required: target=[4-digit id]

Example URL: /group5/find?user=0001?&target=0002

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

## GET Requests from the Subscriber (Client)

Path: /group5/u/

URL Parameters: 
* Required: [name]

Example URL: /group5/u/nolan

Where Nolan receives a json response of all the users he has successfully scanned.