import { doms, svgs } from '../base';
import '../../css/radar.css';
import { fadeIn } from '../transitions';

export const renderTitles = ({id, title, outerR, y}) => {   
	title = title.toUpperCase();
	const circleTitle = document.createElementNS(svgs.ns, 'text');
	circleTitle.setAttribute("class", `title-${id}`);
	circleTitle.setAttribute("x", outerR); 
	circleTitle.setAttribute("y", y);
	circleTitle.setAttribute("text-anchor","middle"); 	
	const text = document.createTextNode(title);
	circleTitle.appendChild(text);
	doms.svg.appendChild(circleTitle);
};

export const renderRadar = (r, outerR) => {	 
	const svgRadar = document.createElementNS(svgs.ns, 'circle');
	svgRadar.setAttribute("class", "radar-circles");	
	svgRadar.setAttribute("r", r);
	svgRadar.setAttribute("cx", outerR);	
	svgRadar.setAttribute("cy", outerR); 		
	doms.svg.appendChild(svgRadar);
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
	textElement.setAttribute("dy", "-3");
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
		borders[i].setAttribute("d", sectorData[i].sectorLine);
		arcs[i].setAttribute("d", sectorData[i].sectorArc);   
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
		


