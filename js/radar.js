
var ns = "http://www.w3.org/2000/svg";
var xs = "http://www.w3.org/1999/xlink";
var svg = document.getElementById('svgRadar');
var svgDiv = document.getElementById('radar');	
var i;	
var len = techList.length;
var anomalyTable = "<table id='anomalyTable'>" 
		+ "<caption>Anomalies</caption>"
		+ "<tr><th>Name</th><th>Anomaly</th></tr>";


sectors();
function sectors(){
	var sectorTitle = [];			
	for(i = 0; i < len; i++){ 
		var cat = techList[i].CAT;
		if((sectorTitle.indexOf(cat) == -1) && (cat !=='')){
		sectorTitle.push(cat);				
		}	 			
   	}
	var sectorNum = sectorTitle.length; 
	var textOffset = (952 / sectorNum);
	var sectorAng = (360 / sectorNum);
	var sectorNamePath;
	var sectorBorder;
	var sectorNames;
	var textpath;
	var titleText;
	var r = 300;
	var x, y, radA;	
	var xa, ya, xb, yb, radAB;
	var a;
	var sector;
	for(a = 0; a < sectorNum; a++){
		sectorBorder = document.createElementNS(ns, 'path');		
		sectorBorder.setAttribute("stroke", "#fff");
		sectorBorder.setAttribute("stroke-width", 1);
		sectorBorder.setAttribute("stroke-dasharray", "10,10");
		radA = (sectorAng * a) * (Math.PI / 180); 	
		radAB = (sectorAng * (a+1)) * (Math.PI / 180);
		x = 330 + Math.round(r * Math.cos(radA));
		y = 330 + Math.round(r * Math.sin(radA));
		xa = 330 + Math.round((r+3) * Math.cos(radA));
		ya = 330 + Math.round((r+3) * Math.sin(radA));
		xb = 330 + Math.round((r+3) * (Math.cos(radAB)));
		yb = 330 + Math.round((r+3) * (Math.sin(radAB)));
		sectorBorder.setAttribute("d", "M330 330 L" + x + "," + y );	
		svg.appendChild(sectorBorder);

		sectorNamePath = document.createElementNS(ns, "path");
		sectorNamePath.setAttributeNS(null, "id", sectorTitle[a]);
		sectorNamePath.setAttribute("fill", "none");
		sectorNamePath.setAttribute("d", "M" + xa + "," + ya + "A300, 300, 0, 0, 1" +  xb + "," + yb);
		svg.appendChild(sectorNamePath);

		sectorNames = document.createElementNS(ns, 'text');		
		sectorNames.setAttribute("id", "sectorNames");
	
		textpath = document.createElementNS(ns,"textPath");
  		textpath.setAttributeNS(xs, "xlink:href", "#"+sectorTitle[a]); 
		textpath.setAttribute("startOffset", (textOffset)); 
		textpath.setAttribute("text-anchor", "middle");
  		titleText = document.createTextNode(sectorTitle[a]); 
  		textpath.appendChild(titleText);
 		sectorNames.appendChild(textpath);
  		svg.appendChild(sectorNames);	
		radA = Math.round((radA)*100)/100;
		radAB = Math.round((radAB)*100)/100;	
		sector = [sectorTitle[a], radA, radAB];
		for(i = 0; i < len; i++){
			if(sector[0] == techList[i].CAT){
				techList[i].MINA = sector[1];
				techList[i].MAXA = sector[2];
				randomAngle(techList[i].MINA, techList[i].MAXA);
				techList[i].ANGLE = Math.round(angle * 1000) / 1000;	
				}
			}
		}
}

function randomAngle(minA, maxA){
	angle = Math.random(maxA - minA) + minA;
	return angle; 
	}

for(i = 0; i < len; i++){
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
	var sectorAngle = techList[i].ANGLE;

	if(addDate == '')	{addDate = 'Date not entered'}
	if(detail == '')	{detail = 'No Details'}

	if(cat == ''){							
		var state = "Unallocated Category Sector"; 
		anomalies(tech, state, "nocatsec");
		} else {
		var dot = document.createElementNS(ns, 'circle');
		dot.setAttribute("cy","330"); 
		dot.setAttribute("cx","330"); 
		dot.setAttribute("r","6");	
	
		if(hold !== '')			{createDots("Hold", "#008f00", 10, 44, sectorAngle);}
		else if(adopt !== '')		{createDots("Adopt", "#0fff00", 56, 94, sectorAngle);}
		else if(trial !== '')		{createDots("Trial", "#ffff00", 106, 144, sectorAngle);}
		else if(evaluate !== '')	{createDots("Evaluate", "#ffc000", 156, 194, sectorAngle);}
		else if(noNewUse !== '')	{createDots("No New Use", "#fa8000", 206, 244, sectorAngle);}
		else if(planForRemoval !== '')	{createDots("Plan For Removal", "#dd0000", 256, 294, sectorAngle);}
		else if((hold == '') && (adopt == '') && (trial == '') && (evaluate == '') && (noNewUse == '') && (planForRemoval == '')){
		state = "Unallocated Status";
		anomalies(tech, state, "nostatus");
		}
	}
}
function anomalies(tech, state, trClass){	
	anomalyTable += "<tr class="
		+ trClass
		+ ">"
		+ "<td>" 
		+ tech  	
		+ "</td>"
		+ "<td>"
		+ state
		+ "</td></tr>";
	document.getElementById("anomalyTablePos").innerHTML = anomalyTable + "</table>";			
	}

function createDots(status, fill, minR, maxR, angle){ 	 	
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
    



