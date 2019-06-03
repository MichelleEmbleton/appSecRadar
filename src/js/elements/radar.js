import * as radarView from './radarView';
import * as format from '../formatData';
import { doms } from '../base';

export const createRadar = (sectors, data, config) => {
    config.OUTERRADIUS = 330;  
    config.forEach(el => {
        radarView.renderRadar(el.RADIUS, config.OUTERRADIUS);
        const y = calcCircleTitlePositions(el.TITLE, el.RADIUS, config.OUTERRADIUS);
        const titleProps = {
            id: el.ID,
            title: el.TITLE,
            outerR: config.OUTERRADIUS,
            y
        };
        radarView.renderTitles(titleProps);
    });
    calcSectors(sectors, data); 
    positionElements(data);   
};

export const positionElements = (data, init=true) => {   
    data.forEach(el => {  
        const boundaries = {
            minRadius: el.minRadius, 
            radius: el.radius, 
            minA: el.minAngle,
            maxA: el.maxAngle
        };        
        if(el.statusId && el.colorId){
            const dot = init ? radarView.createDots(el.TECH, el.colorId) : el.dot;  
            el.dot = dot;          
            const [x, y, angle] = calcRandomPosition(boundaries);   
            let arrow;   
            if(el.CHANGE_SPEED){     
                arrow = init ? radarView.createArrows(el.TECH, el.colorId) : el.arrow;  
                const arrowProps = {
                    arrow,
                    angle,
                    changeSpeed: el.CHANGE_SPEED
                };    
                const direction = calcArrowDirection(arrowProps); 
                if(!isNaN(direction)){  
                    arrow.setAttribute('class', `dot-${el.colorId} dot`); 
                    arrow.setAttribute('transform', `translate(${x}, ${y})` 
                                        + `rotate(${direction}, 330,330)`);  
                };
                el.arrow = arrow;   
            } 
            dot.setAttribute('class', `dot-${el.colorId} dot`);
            dot.setAttribute('transform',`translate(${x}, ${y})`);           
            init && radarView.renderPositions({dot, arrow});
        }       
    });  
};

export const calcSectors = (sectors, data, equal=true, init=true) => {  
    if(sectors){   
        const counts = [];                  
        const sectorDataArr = []; 
        let dataCount;
        if(!equal){       
            sectors.forEach(el => counts.push({sector: el, count: 0}));    
            data.forEach(el => {  
                counts.forEach(e => (el.CAT === e.sector || el.SUBCAT === e.sector) && e.count ++); 
            });
            dataCount = counts.reduce((acc, cur) => acc + cur.count, 0);
        }  
        const r = 300;
        const equalAngles = (360 / sectors.length);
        for(let i = 0; i < sectors.length; i++){
            if(!equal && dataCount > 0){
                counts[i].angle = ((counts[i].count / dataCount) * 360);
                counts[i].min = (i-1) > -1 ? (counts[i-1].angle) + (counts[i-1].min) : 0;
                counts[i].max = counts[i].angle + counts[i].min;           
            }
            let textOffset = equal ? 
                Number((952 / sectors.length).toFixed(4)) : 
                dataCount > 0 ? Number(((counts[i].count / dataCount) * 952).toFixed(4)) : 0;
            
            let minA = equal ? equalAngles * i : counts[i].min ? counts[i].min : 0;
            let maxA = equal ? equalAngles * (i + 1) : counts[i].max ? counts[i].max : 0;
            const minRad = Number(((minA) * (Math.PI / 180)).toFixed(4)); 	
            const maxRad = Number(((maxA) * (Math.PI / 180)).toFixed(4));	
            const xa = 330 + Math.round(r * Math.cos(minRad));
            const ya = 330 + Math.round(r * Math.sin(minRad));        
            const xb = 330 + Math.round(r * Math.cos(maxRad));
            const yb = 330 + Math.round(r * Math.sin(maxRad));   
            const isReflex = maxA - minA <= 180 ? 0 : 1;
            const sectorLine = `M330 330 L ${xa}, ${ya}`;
            const sectorArc = `M ${xa} ${ya} A 300 300 0 ${isReflex} 1 ${xb} ${yb}`;
            let sectorConfig = [sectors[i], minRad, maxRad];    
            setAngleLimits(sectorConfig, data);
            const sectorData = {
                sector: sectors[i],
                textOffset,
                sectorLine,
                sectorArc
            };   
            if(init) radarView.renderSectors(sectorData);
            else sectorDataArr.push(sectorData);               
        };
        !init && radarView.alignSectors(sectorDataArr);
    }
};

const setAngleLimits = (sectorConfig, data) => {  
	data.forEach(el => {  
		for(let i = 0; i < sectorConfig.length; i++){
			if(el.CAT === sectorConfig[0] || el.SUBCAT === sectorConfig[0]){
				el.minAngle = sectorConfig[1];
                el.maxAngle = sectorConfig[2];
            } 
            if(!el.minAngle) el.minAngle = 0;
            if(!el.maxAngle) el.maxAngle = 0;
		};
	});	 
};

export const calcRadiiLimit = config => {   
	for(let i = 1; i < config.length; i++){   
		if(config[i].minRadius  === undefined){
			config[i].minRadius = 10;
		}
		config[i-1].minRadius = Number(config[i].RADIUS);   
    };
};

const calcRandomPosition = props => {  
    	const minA = (props.minA + 0.06);
	const maxA = (props.maxA - 0.06);
    	const angle = Number((((Math.random() * (maxA - minA) + minA))).toFixed(4));
	const minR = props.minRadius + 6;			
    	const maxR = props.radius - 6; 	
    	const randomR = ~~((Math.random() * (maxR - minR)) + minR);	 				
	const x = Math.round(Math.cos(angle) * randomR);      
	const y =  Math.round(Math.sin(angle) * randomR);    
	return [x, y, angle];
};

const calcArrowDirection = props => {   
    const changeSpeed = props.changeSpeed.replace(/\+/, "");
    if(!isNaN(changeSpeed)){
        const length = 324 - (parseInt(Math.abs(changeSpeed)) * 3 + 7);	
        const points = `330, ${length} 324.8,328 335.2,328`;  
        props.arrow.setAttribute("points", points);	
        const arrowFaceIn = Number(((props.angle * 180/Math.PI)-90).toFixed(4));
        const arrowFaceOut = Number((90+(props.angle * 180/Math.PI)).toFixed(4));
        let direction = changeSpeed > 0 ? arrowFaceIn : arrowFaceOut;	
        return direction;      
    }	
};

const calcCircleTitlePositions = (title, r, outerR) => {
	let yOffset = title.length > 12 ? 15 : 11;				
	const y = (outerR - r + yOffset);
	return y;
};

export const changeRadius = (data, config, circle, initX) => {
    const r = circle.r.animVal.value; 
    const circleTitleId = circle.nextSibling.className.animVal; 
    const circleTitle = document.querySelector(`.${circleTitleId}`);
    const getNewX = e => {
        const newX = e.clientX - initX;
        for(let i = 0; i < config.length; i++){
            if(config[i].ID === circleTitleId.replace('title-', '')){
                let max = (i-1) > -1 ? (config[i-1].RADIUS - 15) : 300;
                let newR = (r + newX) < max ? (r + newX) : max;          
                circle.setAttribute('r', newR);
                config[i].RADIUS = newR;
                const newPosition = calcCircleTitlePositions(config[i].TITLE, config[i].RADIUS, config.OUTERRADIUS);
                circleTitle.setAttribute("y", newPosition);
            }           
        };
        calcRadiiLimit(config); 
        data.forEach(el => format.setRadii(el, config));
        positionElements(data, false);
    };
    doms.svg.addEventListener('mousemove', getNewX);
    doms.svg.addEventListener('mouseup', () => {
        doms.svg.removeEventListener('mousemove', getNewX);
    });       
};
