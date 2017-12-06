function createSubcatTables(techList){
   if(document.getElementById("subcatTablesPos") !== null){	
	var i;
	var len = techList.length;
	var subcatName = [];
	var subcat;
	var techSubcatId;
	for(i = 0; i < len; i++){ 
		subcat = techList[i].SUBCAT;
		techSubcatId = techList[i].SUBCATID;
		if((subcatName.indexOf(subcat) == -1) 
			&& (subcat !=='') && (techSubcatId)){
			subcatName.push(subcat);
		}
	}
	var subcatLen = subcatName.length;
	for(s = 0; s < subcatLen; s++){ 			
    		var subcategory = subcatName[s].toUpperCase();		
		var table = "<table id='subcatTable'><caption>" 
		+ subcategory 
		+ "</caption><tr>"
		+ "<th>Name</th>"
		+ "<th>Category</th>"
		+ "<th>Status</th>"
		+ "<th>Detail</th></tr>";
			
			for(i = 0; i < len; i++){ 
				var techSubcat = techList[i].SUBCAT.toUpperCase();
				if(techSubcat == ""){
					techSubcat = "unknown";
			} else if(techSubcat == subcategory){
				var techId = techList[i].ID;	
				var techTech = techList[i].TECH.toUpperCase();
				var techCat = techList[i].CAT.toLowerCase();
				var techStat = techList[i].STATUS.toLowerCase();
				var techDet = techList[i].DETAILS;
				if(techId){
					var tdcol = techId;
					} else {
   					techStat = "Unallocated"; 
					var tdcol = "nostatus"
					} 
				if(techCat == "") {
   					techCat = "Unallocated"; 
					var tdcol = "nocat"
					}
			if(techDet == ''){techDet = 'No Details'}		
			table += "<tr>" 
				+ "<td class='td1 " + tdcol + "'>" 
				+ techTech 
				+ "</td>" 
				+ "<td class='td2 " + tdcol + "'>" 
				+ techCat 
				+ "</td>" 
				+ "<td class='td3 " + tdcol + "'>" 
				+ techStat  
				+ "</td>"
				+ "<td class='td4 " + tdcol + "'>" 
				+ techDet 
				+ "</td></tr>";	
				}
			}	
	var subcatX = document.getElementById("subcatTablesPos")
	var subcatY = table + "</table>";
	subcatX.insertAdjacentHTML('afterend', subcatY );
	}
    }
}