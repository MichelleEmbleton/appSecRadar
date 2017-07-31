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
		+ "<th>Status</th>"
		+ "<th>Detail</th></tr>";
			
			for(i = 0; i < len; i++){ 
				var techCat = techList[i].CAT.toUpperCase();
				if(techCat == ""){
					techCat = "unknown";
			} else if(techCat == category){
				var techId = techList[i].ID;	
				var techTech = techList[i].TECH.toUpperCase();
				var techStat = techList[i].STATUS.toLowerCase();
				var techDet = techList[i].DETAILS;
				var tr = "<tr>";
				if(techId){
					var td = "<td class = " + techId + ">";
					} else {
   				techStat = "Unallocated"; td = "<td class = 'blue'>"
				}
			if(techDet == ''){techDet = 'No Details'}		
			table += tr 
				+ td 
				+ techTech 
				+ "</td>" 
				+ td 
				+ techStat 
				+ "</td>" 
				+ td 
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