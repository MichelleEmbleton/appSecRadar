import { doms, svgs, sectorDoms } from '../base';
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
	textElement.setAttribute("text-anchor", "middle");
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

export const clearSectors = () => {
	const [borders, arcs, text] = sectorDoms();	
	borders.forEach(el => el.parentElement.removeChild(el));
	arcs.forEach(el => el.parentElement.removeChild(el));
	text.forEach(el => el.parentElement.removeChild(el));
};

export const alignSectors = sectorData => {  
	const [borders, arcs, text] = sectorDoms();
	for(let i = 0; i < sectorData.length; i++){
		borders[i].setAttribute("d", sectorData[i].sectorLine);
		arcs[i].setAttribute("d", sectorData[i].sectorArc);   
		text[i].setAttribute("startOffset", sectorData[i].textOffset);	
		fadeIn(text[i]);		
	};
};

export const createDots = id => {   
	const dot = document.createElementNS(svgs.ns, 'circle'); 
	dot.setAttribute("id", `${id}`);	
	dot.setAttribute("cx", "330");
	dot.setAttribute("cy", "330"); 
	dot.setAttribute("r", "6"); 
	dot.setAttribute("stroke", "#000");
	return dot;
};

export const createArrows = id => {  
	const arrow = document.createElementNS(svgs.ns, 'polygon');
	arrow.setAttribute("id", `${id}`);
	arrow.setAttribute("x", "330");	
	arrow.setAttribute("y", "330");
	return arrow;
};

export const renderPositions = ({dot, arrow}) => {
	arrow && doms.svg.appendChild(arrow);
	doms.svg.appendChild(dot);
};
