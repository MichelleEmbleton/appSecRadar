	
var i;	
var len = techList.length;
var dot;
var table = "<table id='anomalyTable'><caption>Anomalies</caption>"
		+ "<tr><th>Name</th><th>Anomaly</th></tr>";

for(i = 0; i < len; i++){
	dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	dot.setAttribute("cy","300"); 
	dot.setAttribute("cx","300"); 
	dot.setAttribute("r","6");
	var tech = techList[i].TECH;
	var addDate = techList[i].DATE;
	var detail = techList[i].DETAILS;
	var cat = techList[i].CAT;
	var hold = techList[i].HOLD;
	var adopt = techList[i].ADOPT;
	var trial = techList[i].TRIAL;
	var evaluate = techList[i].EVALUATE;
	var noNewUse = techList[i].NO_NEW_USE;
	var planForRemoval = techList[i].PLAN_FOR_REMOVAL;

	if(addDate == '')	{addDate = 'Date not entered'}
	if(detail == '')	{detail = 'No Details'}

	if(cat !== "app" && cat !== "platform" && cat !== "service"){							cat = "Unknown Category Sector"; 
			anomalies(tech, cat);
			} else {	
	
		if(cat == "app")		{randomAngle(5.2, 0.8);} 
		else if(cat == "platform")	{randomAngle(1, 2.7);}
		else if(cat == "service")	{randomAngle(2.9, 5);}

		if(hold !== '')			{createDots("Hold", "#008f00", 10, 44, angle);}
		else if(adopt !== '')		{createDots("Adopt", "#0fff00", 56, 94, angle);}
		else if(trial !== '')		{createDots("Trial", "#ffff00", 106, 144, angle);}
		else if(evaluate !== '')	{createDots("Evaluate", "#ffc000", 156, 194, angle);}
		else if(noNewUse !== '')	{createDots("No New Use", "#fa8000", 206, 244, angle);}
		else if(planForRemoval !== '')	{createDots("Plan For Removal", "#dd0000", 256, 294, angle);}
		else if((hold == '') && (adopt == '') && (trial == '') && (evaluate == '') && (noNewUse == '') && (planForRemoval == '')){
		var status = "Unallocated Status";
		anomalies(tech, status);
		}
	}
}

function randomAngle(minA, maxA){
	angle = Math.random(maxA - minA) + minA;
	return angle; 
	}

function createDots(status, fill, minR, maxR, angle){ 
	var svg = document.getElementById('svgRadar'); 	
	svg.appendChild(dot);
	dot.style.fill = fill;
	dot.style.stroke = "#000";		
	var x;
	var y;					
	x = Math.cos(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);
	y =  Math.sin(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);
	dot.setAttribute('transform','translate(' + x + ',' + y + ')'); 
	var popUpText = "<p class='details-text'>Tech: &nbsp;<span class='col'>"
			+ tech 
			+ "</span><br />Category: &nbsp;<span class='col'>" 
			+ cat
			+ "</span><br />Date Added: &nbsp;<span class='col'>" 
			+ addDate
			+ "</span><br />Status: &nbsp;<span class='col'>" 
			+  status
			+ "</span><br />Detail: &nbsp;<span class='col'>" 
			+  detail
			+ "</p>";
	dot.setAttribute('id', (popUpText));	
	dot.setAttribute("onmouseover", "showText(this)");		
	}
	
function showText(obj){
	var targetDot = obj.id;	
	document.getElementById("detailsPos").innerHTML = targetDot;
	}
    
function anomalies(anomaly, state){
	var td = "<td>"; 
	if(state == cat){td = "<td class = 'blue'>";}
	if(state == status){td = "<td class = 'light-blue'>";}	
	table += "<tr>"
		+ td
		+ anomaly  	
		+ "</td>"
		+ td
		+ state
		+ "</td></tr>";
	document.getElementById("anomalyTablePos").innerHTML = table + "</table>";			
	}


