	var i;	
	var len = techList.length;
	var svg = document.getElementById('svgRadar'); 
	var dot;
for(i = 0; i < len; i++){
	dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	
	if(techList[i].HOLD == "y")			{createDots("lime green", "#008f00", 10, 44);}
	if(techList[i].ADOPT == "y")			{createDots("yellow green", "#0fff00", 56, 94);}
	if(techList[i].TRIAL == "y")			{createDots("lemon yellow", "#ffff00", 106, 144);}
	if(techList[i].EVALUATE == "y")		{createDots("cadmium yellow", "#ffc000", 156, 194);}
	if(techList[i].NO_NEW_USE == "y")		{createDots("orange", "#fa8000", 206, 244);}
	if(techList[i].PLAN_FOR_REMOVAL == "y")	{createDots("red", "#dd0000", 256, 294);}
	}
function createDots(color, fill, minR, maxR){
		var targetDot;	
 		var minA;
		var maxA;
		var minR;
		var maxR;
		var ar;
		var angle;
		var x;
		var y;
		dot.setAttribute("cy","300"); 
		dot.setAttribute("cx","300"); 
		dot.setAttribute("r","6"); 	
		svg.appendChild(dot);
		techList[i].COLORCODE = color;
		dot.style.fill = fill;
		dot.style.stroke = "#000";		
	if(techList[i].CAT == "app")		{ar = RandomAngle(5.2, 0.8);} 
	if(techList[i].CAT == "platform")	{ar = RandomAngle(1, 2.7);}
	if(techList[i].CAT == "service")	{ar = RandomAngle(2.9, 5);}
		angle = ar; 
		x = Math.cos(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);
		y =  Math.sin(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);
		dot.setAttribute('transform','translate(' + x + ',' + y + ')'); 
		dot.setAttribute('id', ("<p class='details-text'>Tech: &nbsp;<span class='col'>"
					+ techList[i].TECH 
					+ "</span><br />Date Added: &nbsp;<span class='col'>" 
					+ techList[i].DATE
					+ "</span><br />Colour Code: &nbsp;<span class='col'>" 
					+ techList[i].COLORCODE
					+ "</span><br />Status: &nbsp;<span class='col'>" 
					+ techList[i].DETAILS 
					+ "</p>"));
		dot.setAttribute("onmouseover", "showText(this)");		
		}
function RandomAngle(minA, maxA){
				ar = Math.random(maxA - minA) + minA;
				return ar; 
				}	
function showText(obj){
	targetDot = obj.id;
	document.getElementById("detailsPos").innerHTML = targetDot;
	}
