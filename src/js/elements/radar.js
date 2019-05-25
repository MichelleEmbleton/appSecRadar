import * as radarView from './radarView';

export const createRadar = (sectors, data, config) => {
    config.forEach(el => radarView.renderRadar(el));
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
        if(el.statusId && el.CAT){
            const dot = init ? radarView.createDots(el.statusId, el.TECH) : el.dot;  
            el.dot = dot;           
            const [x, y, angle] = calcRandomPosition(boundaries);   
            let arrow;   
            if(el.CHANGE_SPEED){     
                arrow = init ? radarView.createArrows(el.TECH, el.statusId) : el.arrow;  
                const arrowProps = {
                    arrow,
                    angle,
                    changeSpeed: el.CHANGE_SPEED
                };    
                const direction = calcArrowDirection(arrowProps); 
                if(!isNaN(direction)){  
                    arrow.setAttribute('transform', `translate(${x}, ${y})` 
                                        + `rotate(${direction}, 330,330)`);  
                };
                el.arrow = arrow;       
            } 
            dot.setAttribute('transform',`translate(${x}, ${y})`);
            init && radarView.renderPositions({dot, arrow});
        }       
    });
};

export const calcSectors = (sectors, data, equal=true, init=true) => {     
    const counts = []; 
    const sectorDataArr = []; 
    if(!equal){       
        sectors.forEach(el => counts.push({sector: el, count: 0}));    
        data.forEach(el => {
            counts.forEach(e => el.CAT === e.sector && e.count ++);        
        });
    }     
    const r = 300;
    const equalAngles = (360 / sectors.length);
	for(let i = 0; i < sectors.length; i++){
        if(!equal){
            counts[i].angle = ~~((counts[i].count / data.length) * 360);
            counts[i].min = (i-1) > -1 ? (counts[i-1].angle) + (counts[i-1].min) : 0;
            counts[i].max = counts[i].angle + counts[i].min;           
        }
        let textOffset = equal ? 
            Number((952 / sectors.length).toFixed(4)) : 
            Number(((counts[i].count / data.length) * 952).toFixed(4));
        let minA = equal ? equalAngles * i : counts[i].min;
        let maxA = equal ? equalAngles * (i + 1) : counts[i].max;
        const radA = Number(((minA) * (Math.PI / 180)).toFixed(4)); 	
		const radAB = Number(((maxA) * (Math.PI / 180)).toFixed(4));
		const x = 330 + Math.round(r * Math.cos(radA));	
		const y = 330 + Math.round(r * Math.sin(radA));	
		const xa = 330 + Math.round((r+3) * Math.cos(radA));
		const ya = 330 + Math.round((r+3) * Math.sin(radA));
		const xb = 330 + Math.round((r+3) * Math.cos(radAB));
		const yb = 330 + Math.round((r+3) * Math.sin(radAB));
		const sectorLine = `M330 330 L ${x}, ${y}`;
		const sectorArc = `M ${xa}, ${ya} A300, 300, 0, 0, 1 ${xb}, ${yb}`;
		let sectorConfig = [sectors[i], radA, radAB];    
        setAngleLimits(sectorConfig, data);
        const sectorData = {
            sector: sectors[i],
            textOffset,
            sectorLine,
            sectorArc
        } 
        if(init) radarView.renderSectors(sectorData);
        else sectorDataArr.push(sectorData);	
    };
    !init && radarView.alignSectors(sectorDataArr);
};

const setAngleLimits = (sectorConfig, data) => {  
	data.forEach(el => {  
		for(let i = 0; i < sectorConfig.length; i++){
			if(el.CAT === sectorConfig[0]){
				el.minAngle = sectorConfig[1];
				el.maxAngle = sectorConfig[2];
			}
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
