'use strict';

if (typeof techList !== 'undefined'){
	createRadar(techList);
	createSectorTables(techList);
	createStatusTables(techList);
	createSubcatTables(techList);

} else {

const inputFile = "data.json";  	  //JSON FILE PATH GOES HERE
	
const request = new XMLHttpRequest();
if(request.open("GET", inputFile, true) !== false){

request.onreadystatechange = function (){
	if(request.readyState === 4){
            	if(request.status === 200 || request.status == 0){
			request.onload = function() {
				const jsonText = request.response;
				const techList = JSON.parse(jsonText); 

				createRadar(techList);
				createSectorTables(techList);
				createStatusTables(techList);
				createSubcatTables(techList);
				
				}
     			}
  		}
	}
  request.send(null);
  } 
}

