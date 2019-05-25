import { doms, svgs } from '../base';
import '../../css/radar.css';
import { fadeIn } from '../transitions';

const renderTitles = ({radius, id, r, title}) => {   
	title = title.toUpperCase();		 	
	let yPos;
	title.length > 12 ? yPos = 15 : yPos = 11;				
	const position = (radius - r + yPos);
	const circleSpec = document.createElementNS(svgs.ns, 'text');
	circleSpec.setAttribute("class", `title-${id}`);
	circleSpec.setAttribute("x", radius); 
	circleSpec.setAttribute("y", position);
	circleSpec.setAttribute("text-anchor","middle"); 	
	const text = document.createTextNode(title);
	circleSpec.appendChild(text);
	doms.svg.appendChild(circleSpec);
};

export const renderRadar = config => {	
	const radius = 330;
	const svgRadar = document.createElementNS(svgs.ns, 'circle');
	svgRadar.setAttribute("class", "radar-circles");	
	svgRadar.setAttribute("r", config.RADIUS);
	svgRadar.setAttribute("cx", radius);	
	svgRadar.setAttribute("cy", radius); 		
	doms.svg.appendChild(svgRadar);
	const titles = {
		radius,
		title: config.TITLE,
		r: config.RADIUS,
		id: config.ID
	}					
	renderTitles(titles);
};	

export const renderSectors = props => { 
	const sectorBorder = document.createElementNS(svgs.ns, 'path');	
	sectorBorder.setAttribute("class", "sector-border");	
	sectorBorder.setAttribute("stroke", "#fff");
	sectorBorder.setAttribute("stroke-width", 1);
	sectorBorder.setAttribute("stroke-dasharray", "10,10");
	sectorBorder.setAttribute("d", props.sectorLine);		
	const arc = document.createElementNS(svgs.ns, "path");
	arc.setAttributeNS(null, "id", props.sector);
	arc.setAttribute("class", "sector-arc");
	arc.setAttribute("fill", "none");
	arc.setAttribute("d", props.sectorArc);
	const textElement = document.createElementNS(svgs.ns, 'text');		
	textElement.setAttribute("class", "sector-names");	
	const textpath = document.createElementNS(svgs.ns,"textPath");
	textpath.setAttributeNS(svgs.xs, "xlink:href", `#${props.sector}`);
	textpath.setAttribute("class", "text-path");
	textpath.setAttribute("startOffset", props.textOffset); 
	textpath.setAttribute("text-anchor", "middle");
	const title = document.createTextNode(props.sector); 	
	doms.svg.appendChild(sectorBorder);
	doms.svg.appendChild(arc);
	textpath.appendChild(title);
	textElement.appendChild(textpath);
	doms.svg.appendChild(textElement);			  
};

export const alignSectors = sectorData => {  
	const sectorBorder = document.querySelectorAll(".sector-border");
	const arc = document.querySelectorAll(".sector-arc");
	const textPath = document.querySelectorAll(".text-path");
	const borders = Array.from(sectorBorder);   
	const arcs = Array.from(arc);
	const text = Array.from(textPath);
	for(let i = 0; i < sectorData.length; i++){
		borders[i].getAttribute("d");
		borders[i].setAttribute("d", sectorData[i].sectorLine);
		arcs[i].getAttribute("d");
		arcs[i].setAttribute("d", sectorData[i].sectorArc);
		text[i].getAttribute("startOffset");    
		text[i].setAttribute("startOffset", sectorData[i].textOffset);
		fadeIn(text[i]);		
	};
}

export const createDots = (status, id) => {   
	const dot = document.createElementNS(svgs.ns, 'circle'); 
	dot.setAttribute("class", `dot-${status} dot`);
	dot.setAttribute("id", `${id}`);	
	dot.setAttribute("cx", "330");
	dot.setAttribute("cy", "330"); 
	dot.setAttribute("r", "6"); 
	dot.setAttribute("stroke", "#000");
	return dot;
};

export const createArrows = (id, statusId) => {  
	const arrow = document.createElementNS(svgs.ns, 'polygon');
	arrow.setAttribute("class", `dot-${statusId} dot`);
	arrow.setAttribute("id", `${id}`);
	arrow.setAttribute("x", "330");	
	arrow.setAttribute("y", "330");
	return arrow;
};

export const renderPositions = ({dot, arrow}) => {
	arrow && doms.svg.appendChild(arrow);
	doms.svg.appendChild(dot);
};

export const changeColor = ({id, dot, arrow}) => {    
	if(id.length === 1) {
		dot && dot.removeAttribute("class", `dot-${id}`);
		arrow && arrow.removeAttribute("class", `dot-${id}`);
		dot && dot.setAttribute("class", `dot dot-sub${id}`);
		arrow && arrow.setAttribute("class", `dot dot-sub${id}`);
	} else {
		arrow && arrow.removeAttribute("class", `dot-sub${id}`);
		dot && dot.removeAttribute("class", `dot-sub${id}`);
		arrow && arrow.setAttribute("class", `dot dot-${id}`);
		dot && dot.setAttribute("class", `dot dot-${id}`);
	}	
};
		


