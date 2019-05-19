import { doms, svgs } from '../base';
import '../../css/radar.css';

const renderTitles = ({radius, id, r, title}) => {   
	title = title.toUpperCase();		 	
	let yPos;
	title.length > 12 ? yPos = 15 : yPos = 11;				
	const position = (radius - r + yPos);
	const svgTitle = document.createElementNS(svgs.ns, 'text');
	svgTitle.setAttribute("class", `title-${id}`);
	svgTitle.setAttribute("x", radius); 
	svgTitle.setAttribute("y", position);
	svgTitle.setAttribute("text-anchor","middle"); 	
	const text = document.createTextNode(title);
	svgTitle.appendChild(text);
	doms.svg.appendChild(svgTitle);
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
	sectorBorder.setAttribute("stroke", "#fff");
	sectorBorder.setAttribute("stroke-width", 1);
	sectorBorder.setAttribute("stroke-dasharray", "10,10");
	sectorBorder.setAttribute("d", props.sectorRadius);	
	doms.svg.appendChild(sectorBorder);
	const sectorNamePath = document.createElementNS(svgs.ns, "path");
	sectorNamePath.setAttributeNS(null, "id", props.sector);
	sectorNamePath.setAttribute("fill", "none");
	sectorNamePath.setAttribute("d", props.sectorArc);
	doms.svg.appendChild(sectorNamePath);
	const sectorNames = document.createElementNS(svgs.ns, 'text');		
	sectorNames.setAttribute("class", "sector-names");	
	const textpath = document.createElementNS(svgs.ns,"textPath");
	textpath.setAttributeNS(svgs.xs, "xlink:href", `#${props.sector}`); 
	textpath.setAttribute("startOffset", props.textOffset); 
	textpath.setAttribute("text-anchor", "middle");
	const titleText = document.createTextNode(props.sector); 
	textpath.appendChild(titleText);
	sectorNames.appendChild(textpath);
	doms.svg.appendChild(sectorNames);			  
};

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

export const renderPositions = props => {	
	if(props.arrow && !isNaN(props.direction)){
		props.arrow.setAttribute('transform', `translate(${props.x}, ${props.y})` 
	              		+ `rotate(${props.direction}, 330,330)`);  
		doms.svg.appendChild(props.arrow);
	}
	props.dot.setAttribute('transform',`translate(${props.x}, ${props.y})`);
	props.dot.addEventListener('mousemove', e => {
		document.addEventListener('mousemove', ev => {
			const xv = ev.clientX;

			e.target.style.transform = `translate(10, 10)` ;
		//console.log(document.clientX);
		})
		
	})
	doms.svg.appendChild(props.dot);
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
		


