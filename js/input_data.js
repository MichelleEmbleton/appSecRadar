
//JSON FILE PATH GOES HERE
//'data.json' in the main directory works(same dir as 
//'security-radar.html')..otherwise full path is needed.

var inputFile = "data.json";

var request = new XMLHttpRequest();
request.open("GET", inputFile, false);

request.onreadystatechange = function (){
	if(request.readyState === 4){
            	if(request.status === 200 || request.status == 0){
			request.onload = function() {
				var jsonText = request.response;
				window.techList = JSON.parse(jsonText); 
				}
     			}
  		}

	}
request.send(null);

