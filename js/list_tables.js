
function createTable(heading, category){

var table = "<table id='catTable'><caption>" 
+ heading 
+ "</caption><tr><th>Name</th><th>Status</th><th>Detail</th></tr>";

var i;
var len = techList.length;

for(i = 0; i < len; i++){ 
	var techCat = techList[i].CAT;
	if(techCat !== "app" && techCat !== "platform" && techCat !== "service"){techCat = "unknown";} 
	if(techCat == category){
		var catList = techList;	
		var catTech = catList[i].TECH;
		var catStat = "";
		var catDet = catList[i].DETAILS;
		var catHold = catList[i].HOLD;
		var catAdopt = catList[i].ADOPT;
		var catTrial = catList[i].TRIAL;
		var catEvaluate = catList[i].EVALUATE;
		var catNoNewUse = catList[i].NO_NEW_USE;
		var catPlanForRemoval = catList[i].PLAN_FOR_REMOVAL;
		var tr = "<tr>";
		var td = "<td>";
	
if(catHold !== '')		{catStat = "Hold"; td = "<td class = 'limeGreen'>"}
if(catAdopt !== '')		{catStat = "Adopt"; td = "<td class = 'yellowGreen'>"}
if(catTrial !== '')		{catStat = "Trial"; td = "<td class = 'lemonYellow'>"}
if(catEvaluate !== '')		{catStat = "Evaluate"; td = "<td class = 'cadmiumYellow'>"}
if(catNoNewUse !== '')		{catStat = "No New Use"; td = "<td class = 'orange'>"}
if(catPlanForRemoval !== '')	{catStat = "Plan For Removal"; td = "<td class = 'red'>"}
if((catHold == '') && (catAdopt == '') && (catTrial == '') && (catEvaluate == '') && (catNoNewUse == '') && (catPlanForRemoval == ''))	   {catStat = "Unallocated"; td = "<td class = 'blue'>"}
if(catDet == ''){catDet = 'No Details'}
		
	table += tr 
		+ td 
		+ catTech 
		+ "</td>" 
		+ td 
		+ catStat 
		+ "</td>" 
		+ td 
		+ catDet 
		+ "</td></tr>";	
		}
	}
document.getElementById("tablesPos").innerHTML = table + "</table>";
}
