function createRadar(techList){
var 	ns = "http://www.w3.org/2000/svg",
	xs = "http://www.w3.org/1999/xlink",
	svg = document.getElementById('svgRadar'),
	svgDiv = document.getElementById('radar'),	
	i, 
	s,
	anomalyList = [],
	len = techList.length,
	statuslen = statusList.length;

for(s = 0; s < statuslen; s++){ 
	var statusTitle = statusList[s].TITLE.toUpperCase(); 
	var statusId = statusList[s].ID; 
	var r = statusList[s].RADIUS;					
	var y = (330 - r + 10);

	radarCircles(r),
	statusTitles(statusTitle, statusId, y); 
	}

for(s = 1; s < statuslen; s++){ 
	statusList[s-1].MIN_R = statusList[s].RADIUS;
	if(statusList[s].MIN_R  == undefined){
		statusList[s].MIN_R = '10';
		}
	}

sectors();

for(i = 0; i < len; i++){			
	var techTech = techList[i].TECH.toUpperCase(); 		
	var techAddDate = techList[i].DATE;
	var techDetail = techList[i].DETAILS;
	var techCat = techList[i].CAT.toUpperCase();
	var techStatus = techList[i].STATUS.toUpperCase();	
	var sectorAngle = techList[i].ANGLE;  

	for(s = 0; s < statuslen; s++){
		var statusTitle = statusList[s].TITLE.toUpperCase(); 
		if(techStatus == statusTitle){					
			techList[i].ID = statusList[s].ID; 
			techList[i].RADIUS = statusList[s].RADIUS; 
			techList[i].MIN_R = statusList[s].MIN_R; 					
			} 	
		}
		var techId = techList[i].ID;		
		var radius = (techList[i].RADIUS);		
		var minR = (techList[i].MIN_R) - -6;			
		var maxR = radius - 6;
		
	if(techAddDate == '')	{techAddDate = 'Date not entered'}
	if(techDetail == '')	{techDetail = 'No Details'}
	if((techCat == '') || (!techId)){
		if(techCat == ''){
			anomalyList.push({	
				tech:techTech, 
				state:"Unallocated Category Sector", 
				trClass:"nocatsec"
				});								
			} 
	 	if(!techId){
			anomalyList.push({	
				tech:techTech, 
				state:"Unallocated Status",
				trClass:"nostatus"
				});
			}
		} else {
		createDots(techStatus, techId, minR, maxR, sectorAngle);
		} 		
}

function sectors(){
	var sectorTitle = [];			
	for(i = 0; i < len; i++){ 
		var techCat = techList[i].CAT;
		if((sectorTitle.indexOf(techCat) == -1) && (techCat !=='')){
		sectorTitle.push(techCat);				
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
	var x, y, xa, ya, xb, yb, radA, radAB, a;
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
		sectorNamePath.setAttribute("d", "M" + xa + "," + ya 
				+ "A300, 300, 0, 0, 1" 
				+  xb + "," + yb);
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
		sector = [sectorTitle[a], radA, radAB];
		for(i = 0; i < len; i++){
			if(sector[0] == techList[i].CAT){
				techList[i].MINA = sector[1];
				techList[i].MAXA = sector[2];
				randomAngle(techList[i].MINA, techList[i].MAXA);
				techList[i].ANGLE = angle;	
				}
			}
		}
}

function randomAngle(minA, maxA){
	minA = (minA + 0.09);
	maxA = (maxA - 0.09);
	angle = ((Math.random() * (maxA - minA)) + minA);
	return angle; 
	}

function radarCircles(radius){
	var radarCircle = document.createElementNS(ns, 'circle');
	radarCircle.setAttribute("class", "radar-circles");	
	radarCircle.setAttribute("r", radius);
	radarCircle.setAttribute("cx", "330");	
	radarCircle.setAttribute("cy", "330"); 		
	svg.appendChild(radarCircle);	
	}

function statusTitles(title, titleClass, y){
	var statusTitle = document.createElementNS(ns, 'text');
	titleClass = "title-" + titleClass;
	statusTitle.setAttribute("class", titleClass);
	statusTitle.setAttribute("x","330"); 
	statusTitle.setAttribute("y", y);
	statusTitle.setAttribute("text-anchor","middle"); 	
	var text = document.createTextNode(title);
	statusTitle.appendChild(text);
	svg.appendChild(statusTitle);	
	}

function createDots(status, dotId, minR, maxR, angle){ 
	var dot = document.createElementNS(ns, 'circle');
	var dotClass = "dot-" + dotId;	
	dot.setAttribute("class", dotClass);	
	dot.setAttribute("cx", "330");
	dot.setAttribute("cy", "330"); 
	dot.setAttribute("r", "6");
	dot.setAttribute("stroke", "#000");		
	svg.appendChild(dot);		
	var x, y;					
	x = Math.cos(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);	
	y =  Math.sin(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR);
	dot.setAttribute('transform','translate(' + x + ',' + y + ')'); 
	var boxText = "details-" + dotId;
	var popUpText = "<p class=" 
			+ boxText 
			+ ">Name: &nbsp;<span class='text'>"
			+ techTech 
			+ "</span><br />Category: &nbsp;<span class='text'>" 
			+ techCat.toLowerCase()
			+ "</span><br />Date Added: &nbsp;<span class='text'>" 
			+ techAddDate
			+ "</span><br />Status: &nbsp;<span class='text'>" 
			+  techStatus.toLowerCase() 
			+ "</span><br />Detail: &nbsp;<span class='text'>" 
			+  techDetail
			+ "</p>";
	if(document.getElementById("detailsPos") !== null){
		dot.setAttribute('id', (popUpText));	
		dot.setAttribute("onmouseover", "showText(this)");	
		}
	}	
createAnomalyTable(anomalyList);
}


	

