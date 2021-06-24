var wsUri = "ws://localhost:8080/WebSockets/websocket";
var ws = new WebSocket(wsUri);

ws.onopen = (event)=>{
	print("connected to : " + wsUri);
};

ws.onmessage = (event)=>{
	let msg = event.data;
	print(msg);
};

ws.onerror = (event)=>{
	print("error");
}


function print(msg){
	let p = document.getElementById("text");
	p.innerHTML = msg;
	if(msg == "AktionA")
		p.innerHTML = "BLINKE ROT";
}

function sendEcho(){
	ws.send("client sendet....");
	print("client sendet...");
}

function sendeAutomatisch(){
	
	ampelPhase = "rot";
	schalter = 0;
	
	setInterval(()=>{
		switch(ampelPhase){
			case "rot":
				ampelWerdeRot();
				ampelPhase = "gelb";
				break;
			case "gruen":
				ampelWerdeGruen();
				ampelPhase = "gelb";
				break;
			case "gelb":
				ampelWerdeGelb();
				if( schalter == 0){
					ampelPhase = "gruen";
					schalter++;
				}
				else{
					ampelPhase = "rot";
					schalter--;
				}	
		}
	},1000);
}

function sendCommandA(){
	ws.send("CommandA");
	ampelWerdeRot();
}

function sendCommandB(){
	ws.send("CommandB");
	ampelWerdeGelb();
}

function sendCommandC(){
	ws.send("CommandC");
	ampelWerdeGruen();
}

function ampelWerdeRot(){
	document.getElementById("ampel").style.backgroundColor = "red";
}

function ampelWerdeGelb(){
	document.getElementById("ampel").style.backgroundColor = "yellow";
}

function ampelWerdeGruen(){
	document.getElementById("ampel").style.backgroundColor = "green";
}

function sendJsonObject(){
	
	let userdata = { "ismail": "Ali", "dennis": "Busch" };
	ws.send(JSON.stringify(userdata));
}

