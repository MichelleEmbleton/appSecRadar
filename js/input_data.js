var inputFile = "data.json";		//JSON FILE PATH GOES HERE

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

