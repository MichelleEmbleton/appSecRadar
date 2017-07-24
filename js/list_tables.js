

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
var tableList = "";
	for(i = 0; i < catLen; i++){ 
	catMenu = catList[i]; 
	tableList += "<div class='listrep-buttons' "
		+ "onClick='showModule(`tablewrapper`, `showtable`); createTable(event)'>" 
		+ catMenu
		+ "</div>";	
		}
document.getElementById("tableMenu").innerHTML += tableList;			

function createTable(event){	
    	var category = (event.target.innerHTML);
	var table = "<table id='catTable'><caption>" 
		+ category 
		+ "</caption><tr><th>Name</th><th>Status</th><th>Detail</th></tr>";
			
for(i = 0; i < len; i++){ 
	var techCat = techList[i].CAT;
	if(techCat == ""){techCat = "unknown";
	} else if(techCat == category){	
			var techTech = techList[i].TECH;
			var techStat = "";
			var techDet = techList[i].DETAILS;
			var techHold = techList[i].HOLD;
			var techAdopt = techList[i].ADOPT;
			var techTrial = techList[i].TRIAL;
			var techEvaluate = techList[i].EVALUATE;
			var techNoNewUse = techList[i].NO_NEW_USE;
			var techPlanForRemoval = techList[i].PLAN_FOR_REMOVAL;
			var tr = "<tr>";
			var td = "<td>";
	
if(techHold !== '')		{techStat = "Hold"; td = "<td class = 'limeGreen'>"}
if(techAdopt !== '')		{techStat = "Adopt"; td = "<td class = 'yellowGreen'>"}
if(techTrial !== '')		{techStat = "Trial"; td = "<td class = 'lemonYellow'>"}
if(techEvaluate !== '')	{techStat = "Evaluate"; td = "<td class = 'cadmiumYellow'>"}
if(techNoNewUse !== '')	{techStat = "No New Use"; td = "<td class = 'orange'>"}
if(techPlanForRemoval !== '')	{techStat = "Plan For Removal"; td = "<td class = 'red'>"}
if((techHold == '') && (techAdopt == '') && (techTrial == '') && (techEvaluate == '') && (techNoNewUse == '') && (techPlanForRemoval == ''))	   {techStat = "Unallocated"; td = "<td class = 'blue'>"}
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
document.getElementById("tablesPos").innerHTML = table + "</table>";
}
