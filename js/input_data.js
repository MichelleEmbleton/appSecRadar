var inputFile = "data.json";    	//JSON FILE PATH GOES HERE

var request = new XMLHttpRequest();
request.open("GET", inputFile, true);

request.onreadystatechange = function (){
	if(request.readyState === 4){
            	if(request.status === 200 || request.status == 0){
			request.onload = function() {
				var jsonText = request.response;
				var techList = JSON.parse(jsonText); 

				createRadar(techList);
				createSectorTables(techList);
				createStatusTables(techList);
				createSubcatTables(techList);
				
				}
     			}
  		}

	}
request.send(null);

