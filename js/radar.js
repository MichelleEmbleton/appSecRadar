function createRadar(techList){
  const ns = "http://www.w3.org/2000/svg"
  const xs = "http://www.w3.org/1999/xlink"
  const svg = document.getElementById('svgRadar')
  const svgDiv = document.getElementById('radar')		
  let anomalyList = []
  const len = techList.length 
  let angle = null
  const statuslen = statusList.length
  const subcatlen = subcatList.length
  let s = ''
  let i = ''
  for(s = 0; s < statuslen; s++){ 
	const statusTitle = statusList[s].TITLE.toUpperCase() 
	const statusId = statusList[s].ID 
	let radarStatusText = ''
	let  r = statusList[s].RADIUS					
	statusTitle.length > 12 ?  radarStatusText = 15
				  : radarStatusText = 11;				
	const y = (330 - r + radarStatusText)
	
	const radarCircles = function(radius){	
	   const radarCircle = document.createElementNS(ns, 'circle');
	   radarCircle.setAttribute("class", "radar-circles");	
	   radarCircle.setAttribute("r", radius);
	   radarCircle.setAttribute("cx", "330");	
	   radarCircle.setAttribute("cy", "330"); 		
	   svg.appendChild(radarCircle);	
        }
        radarCircles(r);
	
	const statusTitles = function(title, titleClass, y){
	   const statusTitle = document.createElementNS(ns, 'text');
	   titleClass = "title-" + titleClass;
	   statusTitle.setAttribute("class", titleClass);
	   statusTitle.setAttribute("x","330"); 
	   statusTitle.setAttribute("y", y);
	   statusTitle.setAttribute("text-anchor","middle"); 	
	   const text = document.createTextNode(title);
	   statusTitle.appendChild(text);
	   svg.appendChild(statusTitle);	
       }
	statusTitles(statusTitle, statusId, y); 
  }

  for(s = 1; s < statuslen; s++){ 
	statusList[s-1].MIN_R = statusList[s].RADIUS;
	if(statusList[s].MIN_R  == undefined){
		statusList[s].MIN_R = '10';
	}
  }
 
  const sectors = function(){
     let sectorTitle = [];			
     for(i = 0; i < len; i++){ 
	const tCat = techList[i].CAT;
	if((sectorTitle.indexOf(tCat) == -1) && (tCat !=='')){
	    sectorTitle.push(tCat);				
	}	 			
     }
     const sectorNum = sectorTitle.length; 
     const textOffset = (952 / sectorNum);
     const sectorAng = (360 / sectorNum);
     const r = 300;
     for(let a = 0; a < sectorNum; a++){
	const sectorBorder = document.createElementNS(ns, 'path');		
	sectorBorder.setAttribute("stroke", "#fff");
	sectorBorder.setAttribute("stroke-width", 1);
	sectorBorder.setAttribute("stroke-dasharray", "10,10");
	const radA = (sectorAng * a) * (Math.PI / 180); 	
	const radAB = (sectorAng * (a+1)) * (Math.PI / 180);
	const x = 330 + Math.round(r * Math.cos(radA));	
	const y = 330 + Math.round(r * Math.sin(radA));	
	const xa = 330 + Math.round((r+3) * Math.cos(radA));
	const ya = 330 + Math.round((r+3) * Math.sin(radA));
	const xb = 330 + Math.round((r+3) * (Math.cos(radAB)));
	const yb = 330 + Math.round((r+3) * (Math.sin(radAB)));
	sectorBorder.setAttribute("d", `M330 330 L ${x}, ${y}` );	
	svg.appendChild(sectorBorder);
	const sectorNamePath = document.createElementNS(ns, "path");
	sectorNamePath.setAttributeNS(null, "id", sectorTitle[a]);
	sectorNamePath.setAttribute("fill", "none");
	sectorNamePath.setAttribute(
		"d", 
		`M ${xa}, ${ya} A300, 300, 0, 0, 1 ${xb}, ${yb}`
		);
	svg.appendChild(sectorNamePath);
	const sectorNames = document.createElementNS(ns, 'text');		
	sectorNames.setAttribute("id", "sectorNames");	
	const textpath = document.createElementNS(ns,"textPath");
	textpath.setAttributeNS(xs, "xlink:href", `#${sectorTitle[a]}`); 
	textpath.setAttribute("startOffset", textOffset); 
	textpath.setAttribute("text-anchor", "middle");
	const titleText = document.createTextNode(sectorTitle[a]); 
	textpath.appendChild(titleText);
	sectorNames.appendChild(textpath);
	svg.appendChild(sectorNames);		
	let sector = [sectorTitle[a], radA, radAB];
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
  sectors();
  function randomAngle(minA, maxA){
	minA = (minA + 0.09);
	maxA = (maxA - 0.09);
	angle = ((Math.random() * (maxA - minA)) + minA);
	return angle; 
  } 
  for(i = 0; i < len; i++){			
	const tTech = techList[i].TECH.toUpperCase(); 		
	const tAddDate = techList[i].DATE;
	const tDetail = techList[i].DETAILS;
	const tCat = techList[i].CAT.toUpperCase();
	const tStatus = techList[i].STATUS.toUpperCase();	
	for(s = 0; s < statuslen; s++){
	   var statusTitle = statusList[s].TITLE.toUpperCase(); 
	   if(tStatus == statusTitle){					
		techList[i].ID = statusList[s].ID; 
		techList[i].RADIUS = statusList[s].RADIUS; 
		techList[i].MIN_R = statusList[s].MIN_R; 					   } 	
	}	
	const tId = techList[i].ID;	
	const tSubcat = techList[i].SUBCAT;
	for(let sc = 0; sc < subcatlen; sc++){ 
	   if(tSubcat == subcatList[sc].SUBCAT){					
		techList[i].SUBCATID = subcatList[sc].ID;					   } 	
	}			
	const tSubcatId = techList[i].SUBCATID;					
	if(tAddDate == '')	{tAddDate = 'Date not entered'}
	if(tDetail == '')	{tDetail = 'No Details'}
	if((tCat == '') || (!tId)){
	   if(tCat == ''){
		anomalyList.push({	
		   tech:tTech, 
		   state:"Unallocated Category Sector", 
		   trClass:"nocatsec"
		});										   } 
	   if(!tId){
		anomalyList.push({	
		   tech:tTech, 
		   state:"Unallocated Status",
		   trClass:"nostatus"
		});
	   }
	} else {
	   createDots(tStatus, tId, tSubcat, tSubcatId, tTech, tAddDate, tDetail, tCat, tStatus);
  	} 
	if((tSubcat == '') || (tSubcatId == undefined)){
	   anomalyList.push({	
		tech:tTech, 
		state:"Unallocated Subcategory", 
		trClass:"nosubcat"
	   });
	}	
  }
  function createDots(status, tId, tSub, tSubId, tTech, tAddDate, tDetail, tCat, tStatus){ 
	const angle = techList[i].ANGLE;
	const tDir = techList[i].DIRECTION;
	const tRadius = (techList[i].RADIUS);	
	const minR = (techList[i].MIN_R) - -6;			
	const maxR = tRadius - 6; 
	const dot = document.createElementNS(ns, 'circle'); 
	const arrow = document.createElementNS(ns, 'polygon');
	let dotClass = `dot-${tId}`;
	dot.setAttribute("class", dotClass);	
	dot.setAttribute("cx", "330");
	dot.setAttribute("cy", "330"); 
	dot.setAttribute("r", "6"); 
	dot.setAttribute("stroke", "#000");
	let digits = '';
	let tip = '';	
	if(tDir != "" && tDir != "0"){
		digits = tDir.replace(/\+/, "");		
		const dlen = digits.length;
		for(let d = 0; d <= dlen; d++){
			const vel = tDir.replace(/\D/g, "");				
			tip = 324 - (parseInt(vel)*3+7);			
		}
		const points = `330, ${tip} 323.8,330 336.2,330`;
		arrow.setAttribute("points", points);	
		arrow.setAttribute("x", "330");	
		arrow.setAttribute("y", "330");
		arrow.setAttribute("class", dotClass);				
	}
	svg.appendChild(arrow);
	svg.appendChild(dot); 
	const stat = document.getElementById("status_mode")
	stat.addEventListener("click", statClass, false);
	const subc = document.getElementById("subcat_mode")
	subc.addEventListener("click", subcClass, false);	
	function statClass(){ 				
	   dotClass = dot.setAttribute("class", "dot-" + tId); 		
	   dotClass = arrow.setAttribute("class", "dot-" + tId);
	} 
	function subcClass(){ 
	   if((tSub == 'none') || (tSubId == undefined)){
		dotClass = dot.setAttribute("class", "hidesubcat");
		dotClass = arrow.setAttribute("class", "hidesubcat");
	   } else {
		dotClass = dot.setAttribute("class", "dot-sub" + tSubId);    
		dotClass = arrow.setAttribute("class", "dot-sub" + tSubId);	
	   }	
	}
	let arrowDir = '';		  				
	const x = Math.round(Math.cos(angle)
			*(Math.floor(Math.random() 
			* (maxR - minR)) + minR));	
	const y =  Math.round(Math.sin(angle)
			*(Math.floor(Math.random() 
			* (maxR - minR)) + minR));
	dot.setAttribute('transform',`translate(${x}, ${y})`);
	dot.addEventListener("mousedown", selectElement, false);

	function selectElement(event){  
	   const moveX = Math.round(Math.cos(angle)
			*(Math.floor(Math.random() 
			* (maxR - minR)) + minR));	   
	   const moveY = Math.round(Math.sin(angle)
			*(Math.floor(Math.random() 
			* (maxR - minR)) + minR));	    
	   dot.addEventListener("mousemove", moveElement);
	   function moveElement() {    		
		dot.setAttribute("transform", 
			`translate(${moveX}, ${moveY})`);
		if(arrowDir !== ''){
		       arrow.setAttribute("transform", 
		       `translate(${moveX}, ${moveY})`
			+ `rotate(${arrowDir}, 330,330)`);
		       dot.removeEventListener("mousedown", selectElement, false); 
	   	       dot.addEventListener("mousedown", selectElement, false); 
	        }	       
	           dot.removeEventListener("mousemove", moveElement); 
	   }	 	    
	}
	if(tDir != "" && tDir != "0"){			
	   const arrowIn = ((angle * 180/Math.PI)-90);
	   const arrowOut = (90+(angle * 180/Math.PI));
	   digits > 0 ? 		
		arrowDir = arrowIn : 
		arrowDir = arrowOut;
	   arrow.setAttribute('transform',
	               `translate(${x}, ${y})` 
	              + `rotate(${arrowDir}, 330,330)`);    
	}	
	const boxText = `details-${tId}`;
	const popUpText = `<p class=${boxText}>
			Name: <span class='text'>
			   ${tTech}   
			   </span><br />
			Category: <span class='text'>
			   ${tCat.toLowerCase()}   
			   </span><br />
			Sub-category:<span class='text'>
			   ${tSub.toLowerCase()}   
			   </span><br />
			Date Added: <span class='text'>
			   ${tAddDate}   
			   </span><br />
			Status: <span class='text'>
			   ${tStatus.toLowerCase()}  
			   </span><br />
			Detail: <span class='text'>
			   ${tDetail}
			</p>`;
	if(document.getElementById("detailsPos") !== null){
		dot.setAttribute('id', (popUpText));	
		dot.setAttribute("onmouseover", "showText(this)");	
	}
  }
  createAnomalyTable(anomalyList);

  (function radar_mode(){
     for(s = 0; s < statuslen; s++){
	const statusCode = `<div id='stat-dot-code' 
			     class='dot-${statusList[s].ID}'></div>`;
	const d = document.getElementById('status_color_code');
	d.innerHTML += statusCode;
     }	
     let text = "<ul class='subcat-list'>";	
     for(let j = 0; j < subcatlen; j++){
	if(subcatList[j].SUBCAT != "none"){
	   const colorCode = `<div id='sub-dot-code' 
				class='dot-sub${subcatList[j].ID}'></div>`;
	   text += `<li>${subcatList[j].SUBCAT}: ${colorCode}</li>`;
	 }		
     }
     text += "</ul>";		
     document.getElementById('mode_list').innerHTML += text;
	
  })();
}

function showText(obj){
	'use strict';
	const dotText = obj.id;
	obj.removeAttribute("onmouseover", "showText(this)");
	obj.setAttribute("onmouseover", "showText(this)");	
	document.getElementById("detailsPos").innerHTML = dotText;
}
