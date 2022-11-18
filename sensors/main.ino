/********************************************
* CPE 4020: Device Networks
* Group 5 lanyard project EPS 32 Source
* Written by: Johnny Lozano
********************************************/


#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <string.h>

#define SS_PIN 5
#define RST_PIN 0
const int ipaddress[4] = {103, 97, 67, 25};
byte nuidPICC[4] = {0, 0, 0, 0};
MFRC522::MIFARE_Key key;
MFRC522 rfid = MFRC522(SS_PIN, RST_PIN);

String UID = "0001"; //User ID for this Device
String NID = "0000"; //ID of new connection

//Bool used to determine if a new value has been read.
bool newData = 0;

const char* ssid = "<SSID for Network>";
const char* password = "<Password for Network>";

void setup() {

  //Open a serial console
	Serial.begin(115200);
	Serial.println(F("Initialize System"));
	//init SPI for RFID reader
	SPI.begin();
  //init RFID reader
	rfid.PCD_Init();
	Serial.print(F("Reader :"));
	rfid.PCD_DumpVersionToSerial();
  //Init WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());



}

//Main Program Loop
void loop()
{
  while(1)
  {
    //Read RFID every cycle
	  readRFID();
    //If a new value was read, transmit to broker
    if (newData == 1) transmitCode();
  }
}

//Code to transmit code to broker
void transmitCode()
{

  //initialize HTTP client
  HTTPClient http;
  int httpResponseCode = -1;
  int timeout = 0;
  
  //address used to send data to broker, data sent in embbedded URL format 
  String ServerName = "http://104.1.145.92:4020/group5/find?user=" + UID + "&target=" + NID;

  //Prints servername to console for debug purposes
  Serial.println(ServerName);

  //start an HTTP session 
  http.begin(ServerName);
  
  while (httpResponseCode != 200)
  {
    httpResponseCode = http.GET();
    if (httpResponseCode != 200)
    {
      Serial.println("Unable to Send, trying again");
      timeout++;
    }
    else
    {
      Serial.println("Transmission Succesful!");
    }
    if (timeout > 4) break;

  }
  //Set newData back to 0, signifying successful transmission
  newData = 0;

  //end HTTP session
  http.end();
}


//Function to read RFID data from device
void readRFID(void ) {
	////Read RFID card
	for (byte i = 0; i < 6; i++) {
			key.keyByte[i] = 0xFF;
	}
	// Look for new 1 cards
	if ( ! rfid.PICC_IsNewCardPresent())
			return;
	// Verify if the NUID has been readed
	if ( 	!rfid.PICC_ReadCardSerial())
			return;
	// Store NUID into nuidPICC array
	for (byte i = 0; i < 4; i++) {
			nuidPICC[i] = rfid.uid.uidByte[i];
	}
	Serial.print(F("RFID In dec: "));
  //Prints the data read from RFID card
	printDec(rfid.uid.uidByte, rfid.uid.size);
	Serial.println();
	// Halt PICC
	rfid.PICC_HaltA();
	// Stop encryption on PCD
	rfid.PCD_StopCrypto1();


  switch(rfid.uid.uidByte[0])
  {
    case 252:
      NID = "0002";
      newData = 1;
      Serial.println("NID = Caleb");
      break;
    case 225:
      NID = "0003";
      newData = 1;
      Serial.println("NID = Johnny");
      break;
    case 195:
      NID = "0004";
      newData = 1;
      Serial.println("NID = Anthony");
      break;
    case 144:
      NID = "0005";
      newData = 1;
      Serial.println("NID = Alem");
      break;
    default:
      NID = "0000";
      newData = 0;
  }

}


//Prints the bytes read from the RFID card.
void printDec(byte *buffer, byte bufferSize) {
	for (byte i = 0; i < bufferSize; i++) {
			Serial.print(buffer[i] < 0x10 ? " 0" : " ");
			Serial.print(buffer[i], DEC);
	}
}


