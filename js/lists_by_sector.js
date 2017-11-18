function createSectorTables(techList){
   if(document.getElementById("sectorTablesPos") !== null){	
	var i;
	var len = techList.length;
	var catList = [];
	var cat;
	for(i = 0; i < len; i++){ 
		cat = techList[i].CAT;
		if((catList.indexOf(cat) == -1) && (cat !=='')){
		catList.push(cat);
		}
	}
	var catLen = catList.length;
	for(c = 0; c < catLen; c++){ 			
    		var category = catList[c].toUpperCase();		
		var table = "<table id='catTable'><caption>" 
		+ category 
		+ "</caption><tr>"
		+ "<th>Name</th>"
		+ "<th>Subcategory</th>"
		+ "<th>Status</th>"
		+ "<th>Detail</th></tr>";
			
			for(i = 0; i < len; i++){ 
				var techCat = techList[i].CAT.toUpperCase();
				if(techCat == ""){
					techCat = "unknown";
			} else if(techCat == category){
				var techId = techList[i].ID;	
				var techTech = techList[i].TECH.toUpperCase();
				var techSubcat = techList[i].SUBCAT;
				var techSubcatId = techList[i].SUBCATID;
				var techStat = techList[i].STATUS.toLowerCase();
				var techDet = techList[i].DETAILS;
				if(techId){
					var tdcol = techId;
				} else {
   					techStat = "Unallocated"; 
					tdcol = "nostatus";
				}
				if(!techSubcatId){
					techSubcat = "Unallocated";
					tdcol = "nosubcat";
				}
			if(techDet == ''){techDet = 'No Details'}		
			table += "<tr>" 
				+ "<td class='td1 " + tdcol + "'>"
				+ techTech 
				+ "</td>" 
				+ "<td class='td2 " + tdcol + "'>"
				+ techSubcat 
				+ "</td>" 
				+ "<td class='td3 " + tdcol + "'>"
				+ techStat 
				+ "</td>" 
				+ "<td class='td4 " + tdcol + "'>"
				+ techDet 
				+ "</td></tr>";	
				}
			}	
	var sectorX = document.getElementById("sectorTablesPos")
	var sectorY = table + "</table>";
	sectorX.insertAdjacentHTML('afterend', sectorY );
	}
    }
}