package com.websockets;

import java.io.StringReader;

import jakarta.json.JsonNumber;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonString;
import jakarta.json.Json;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket")
public class WebsocketServer {

	
	public String toString() {
		return null;
	}
	
	private String serverID = this.toString();
	private int msgCnt = 0;
	
	@OnMessage
	public String serverAnswer(String msg, Session session) {
		//ausgabe auf dem Server
		
		
		System.out.println("Dieser server läuft auf dem Server mit der ID " + serverID);
		System.out.println(msg);
		//ausgabe an den Client
		if( msg.equals("CommandA"))
			return "AktionA";
		//return "Besucher " + ++msgCnt + "hat sich mit dem Server " + serverID + " verbunden!";
		else if( msg.equals("CommandB"))
			return "AktionB";
		else if( msg.equals("CommandC"))
			return "AktionC";
		else {
			JsonReader jsonReader = Json.createReader(new StringReader(msg));
			JsonObject jsonObject = jsonReader.readObject();
			JsonString nachnameI = jsonObject.getJsonString("ismail");
			JsonString nachnameD = jsonObject.getJsonString("dennis");
			System.out.println("JSON: " + nachnameI + nachnameD);
			
			return "Erster value = " + nachnameI + " zweiter Value = " + nachnameD;
		}
	}

}
