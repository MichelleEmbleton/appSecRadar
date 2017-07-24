var i;
var len = techList.length;
var statLen = statusList.length;
var statusMenu;
var statusDropList = "";
for(i = 0; i < statLen; i++){ 
	statusId = statusList[i].ID;
	statusMenu = statusList[i].TITLE.toUpperCase(); 
	statusMenuLi = "<span class='" 
			+ statusId 
			+ "'>" 
			+ statusMenu 
			+ "</span>";
	statusDropList += "<div class='status_list_buttons' "
		+ "onClick='showModule(`status_table_wrapper`, `show_status_table`);" 		+ "createStatusTable(event)'>" 
		+ statusMenuLi    
		+ "</div>";	
		}
document.getElementById("status_table_menu").innerHTML += statusDropList;		
function createStatusTable(event){	
    	var status = (event.target.innerHTML);
	var table = "<table id='status_table'><caption>" 
		+ status 
		+ "</caption><tr><th>Name</th>"
		+ "<th>Category</th><th>Detail</th></tr>";
			
	for(i = 0; i < len; i++){ 
		var techStat = techList[i].STATUS.toUpperCase();
		if(techStat !== status){
			techStat = "unknown";
			} else {
			var techId = techList[i].ID;	
			var techTech = techList[i].TECH.toUpperCase();
			var techCat = techList[i].CAT;
			var techDet = techList[i].DETAILS;
			var tr = "<tr>";
			if(techCat == ""){
				techCat = "Unallocated"; 
				td = "<td class = 'lightblue'>";
				} else if(techId){
				var td = "<td class = " + techId + ">";
				}  			
			if(techDet == ''){techDet = 'No Details'}
		
		table += tr 
			+ td 
			+ techTech 
			+ "</td>" 
			+ td 
			+ techCat 
			+ "</td>" 
			+ td 
			+ techDet 
			+ "</td></tr>";	
			}
		}
document.getElementById("statusTablesPos").innerHTML = table + "</table>";
}
