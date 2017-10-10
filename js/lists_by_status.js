function createStatusTables(techList){
   if(document.getElementById("statusTablesPos") !== null){		
	var i;
	var len = techList.length;
	var statLen = statusList.length;
	for(s = 0; s < statLen; s++){ 
		var statusId = statusList[s].ID;
		var statusTitle = statusList[s].TITLE.toUpperCase();
		var table = "<table id='status_table'><caption>" 
		+ statusTitle 
		+ "</caption><tr>"
		+ "<th>Name</th>"
		+ "<th>Category</th>"
		+ "<th>Detail</th></tr>";
			
			for(i = 0; i < len; i++){ 
			var techStatus = techList[i].STATUS.toUpperCase();
			if(techStatus !== statusTitle){
				techStatus = "unknown";
			} else if(techStatus == statusTitle){
				var techId = techList[i].ID;	
				var techTech = techList[i].TECH.toUpperCase();
				var techCat = techList[i].CAT;
				var techDetails = techList[i].DETAILS;
				var tr = "<tr>";
				if(techCat == ""){
					techCat = "Unallocated"; 
					var td = "<td class = 'lightblue'>";		
				} else if(techId){
					var td = "<td class = " + techId + ">";
					}  			
				if(techDetails == ''){techDetails = 'No Details'}		
					table += tr 
						+ td 
						+ techTech 
						+ "</td>" 
						+ td 
						+ techCat 
						+ "</td>" 
						+ td 
						+ techDetails 
						+ "</td></tr>";	
						}
				}
	var statusX = document.getElementById("statusTablesPos")
	var statusY = table + "</table>";
	statusX.insertAdjacentHTML('afterend', statusY);
	}
    }
}