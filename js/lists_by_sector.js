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
var catMenu;
var sectorDropList = "";
for(i = 0; i < catLen; i++){ 
	catMenu = catList[i]; 
	sectorDropList += "<div class='sector_list_buttons' "
		+ "onClick='showModule(`sector_table_wrapper`, `show_sector_table`);" 				+ "createSectorTable(event)'>" 
		+ catMenu
		+ "</div>";	
		}
document.getElementById("sector_table_menu").innerHTML += sectorDropList;			

function createSectorTable(event){	
    	var category = (event.target.innerHTML);
	var table = "<table id='catTable'><caption>" 
		+ category 
		+ "</caption><tr><th>Name</th>"
		+ "<th>Status</th><th>Detail</th></tr>";
			
	for(i = 0; i < len; i++){ 
		var techCat = techList[i].CAT;
		if(techCat == ""){techCat = "unknown";
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
document.getElementById("sectorTablesPos").innerHTML = table + "</table>";
}
