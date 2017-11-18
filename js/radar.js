function createRadar(techList){
  var 	ns = "http://www.w3.org/2000/svg",
	xs = "http://www.w3.org/1999/xlink",
	svg = document.getElementById('svgRadar'),
	svgDiv = document.getElementById('radar'),	
	i, 
	s,
	anomalyList = [],
	len = techList.length,
	statuslen = statusList.length,
	subcatlen = subcatList.length;

 for(s = 0; s < statuslen; s++){ 
	var statusTitle = statusList[s].TITLE.toUpperCase(); 
	var statusId = statusList[s].ID; 
	var r = statusList[s].RADIUS;					
	if(statusTitle.length > 12){
		var radarStatusText = 15;
		} else {
		radarStatusText = 11;
		}				
	var y = (330 - r + radarStatusText);
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
			techList[i].MIN_R = statusList[s].MIN_R; 							} 	
  	}
	
	var techId = techList[i].ID;	
	var techSubcat = techList[i].SUBCAT;
	for(sc = 0; sc < subcatlen; sc++){ 
		if(techSubcat == subcatList[sc].SUBCAT){					
			techList[i].SUBCATID = subcatList[sc].ID;							} 	
  	}
			
	var techSubcatId = techList[i].SUBCATID;		
	var techDir = techList[i].DIRECTION;
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
				});											} 
	 	if(!techId){
			anomalyList.push({	
				tech:techTech, 
				state:"Unallocated Status",
				trClass:"nostatus"
				});
			}
		} else {
		createDots(techStatus, techId, techSubcat, techSubcatId, minR, maxR, sectorAngle);
  	} 
	if((techSubcat == '') || (techSubcatId == undefined)){
		anomalyList.push({	
				tech:techTech, 
				state:"Unallocated Subcategory", 
				trClass:"nosubcat"
				});
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


  function createDots(status, techId, techSubcat, techSubcatId, minR, maxR, angle){ 
	var dot = document.createElementNS(ns, 'circle'); 
	var arrow = document.createElementNS(ns, 'polygon');
	var dotClass = "dot-" + techId;
	dot.setAttribute("class", dotClass);	
	dot.setAttribute("cx", "330");
	dot.setAttribute("cy", "330"); 
	dot.setAttribute("r", "6"); 
	dot.setAttribute("stroke", "#000");	
	var stat = document.getElementById("status_mode")
	stat.addEventListener("click", statClass, false);
	var subc = document.getElementById("subcat_mode")
	subc.addEventListener("click", subcClass, false);	
	function statClass(){
		dotClass = dot.setAttribute("class", "dot-" + techId); 		
		dotClass = arrow.setAttribute("class", "dot-" + techId);
	} 
	function subcClass(){
	   if((techSubcat == 'none') || (techSubcatId == undefined)){
		dotClass = dot.setAttribute("class", "hidesubcat");
		dotClass = arrow.setAttribute("class", "hidesubcat");
	   } else {
		dotClass = dot.setAttribute("class", "dot-sub" + techSubcatId);    
		dotClass = arrow.setAttribute("class", "dot-sub" + techSubcatId);	
	   }	
	}		
	var x, y;					
	x = Math.round(Math.cos(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR));		
	y =  Math.round(Math.sin(angle)*(Math.floor(Math.random() * (maxR - minR)) + minR));
	dot.setAttribute('transform','translate(' + x + ',' + y + ')');
	if(techDir != "" && techDir != "0"){
		var techDirection;
		var digits = techDir.replace(/\+/, "");		
		var d;
		var dlen = digits.length;
		for(d = 0; d <= dlen; d++){
			var vel = techDir.replace(/\D/g, "");				
			var tip = 324 - (parseInt(vel)*3+7);			
		}
		var points = "330," + tip + " 323.8,330 336.2,330";
		arrow.setAttribute("points", points);	
		arrow.setAttribute("x", "330");	
		arrow.setAttribute("y", "330");
		arrow.setAttribute("class", dotClass);
		svg.appendChild(arrow);		
		var arrowIn = ((angle * 180/Math.PI)-90);
		var arrowOut = (90+(angle * 180/Math.PI));
		digits > 0 ? 		
			techDirection = arrowIn : 
			techDirection = arrowOut;		
		arrow.setAttribute('transform','translate(' + x + ',' + y + ')' 
			+ 'rotate('+techDirection+',330,330)');    
	}
	svg.appendChild(dot);
	var boxText = "details-" + techId;
	var popUpText = "<p class=" 
			+ boxText 
			+ ">Name: &nbsp;<span class='text'>"
			+ techTech 
			+ "</span><br />Category: &nbsp;<span class='text'>" 
			+ techCat.toLowerCase()
			+ "</span><br />Sub-category: &nbsp;<span class='text'>" 
			+ techSubcat.toLowerCase()
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

  (function radar_mode(){
	for(s = 0; s < statuslen; s++){
		var statusCode = "<div id='stat-dot-code' class='dot-"
				   + statusList[s].ID
				   + "'></div>";
		document.getElementById('status_color_code').innerHTML += statusCode;
	}	
	var text = "<ul class='subcat-list'>";
	
	var j;
	for(j = 0; j < subcatlen; j++){
	    if(subcatList[j].SUBCAT != "none"){
		var colorCode = "<div id='sub-dot-code' class='dot-sub"
				   + subcatList[j].ID     
				   + "'></div>";
		text += "<li>" + subcatList[j].SUBCAT
				+ ": " 
				+ colorCode 
				+ "</li>";
	    }		
	}
	text += "</ul>";		
	document.getElementById('mode_list').innerHTML += text;
	
  })();

}  

	
