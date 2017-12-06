function createStatusTables(techList){
   if(document.getElementById("statusTablesPos") !== null){		
	var i;
	var len = techList.length;
	var statLen = statusList.length;
	for(s = 0; s < statLen; s++){ 
		var statusId = statusList[s].ID;
		var statusTitle = statusList[s].TITLE.toUpperCase();
		var table = "<table id='statusTable'><caption>" 
		+ statusTitle 
		+ "</caption><tr>"
		+ "<th>Name</th>"
		+ "<th>Category</th>"
		+ "<th>Subcategory</th>"
		+ "<th>Detail</th></tr>";
			
			for(i = 0; i < len; i++){ 
			var techStatus = techList[i].STATUS.toUpperCase();
			if(techStatus !== statusTitle){
				techStatus = "unknown";
			} else if(techStatus == statusTitle){
				var techId = techList[i].ID;	
				var techTech = techList[i].TECH.toUpperCase();
				var techSubcat = techList[i].SUBCAT;
				var techSubcatId = techList[i].SUBCATID;
				var techCat = techList[i].CAT;
				var techDetails = techList[i].DETAILS;
				if(techCat == ""){
					techCat = "Unallocated"; 
					var tdcol = "nocat";		
				} else if(techId){
					var tdcol = techId;
				}  
				if(!techSubcatId){
					techSubcat = "Unallocated";
					tdcol = "nosubcat";
				}
			
				if(techDetails == ''){techDetails = 'No Details'}		
					table += "<tr>" 
						+ "<td class='td1 " + tdcol + "'>"
						+ techTech 
						+ "</td>" 
						+ "<td class='td2 " + tdcol + "'>"
						+ techCat 
						+ "</td>"
						+ "<td class='td3 " + tdcol + "'>"
						+ techSubcat 
						+ "</td>" 
						+ "<td class='td4 " + tdcol + "'>"
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