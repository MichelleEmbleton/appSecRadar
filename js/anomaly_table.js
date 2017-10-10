function createAnomalyTable(anomalyList){
	if(document.getElementById("anomalyTablePos") !== null){
		var anomalyTable = "<table id='anomalyTable'>" 
			+ "<caption>Anomalies</caption>"
			+ "<tr><th>Name</th><th>Anomaly</th></tr>";
		var i;
		var aLen = anomalyList.length;  

		if (aLen == 0){ 
			anomalyTable += "<tr class='no-entries'>"
				+ "<td>No issues!</td>"
				+ "</tr>";
			} else { 
 
		for(i = 0; i < aLen; i++){
			anomalyTable += "<tr class="
				+ anomalyList[i].trClass
				+ ">"
				+ "<td>" 
				+ anomalyList[i].tech  	
				+ "</td>"
				+ "<td>"
				+ anomalyList[i].state
				+ "</td></tr>";
				} 
			}
		var x = document.getElementById('anomalyTablePos')
		x.innerHTML = anomalyTable + "</table>";	
		}
	}
