import * as radarView from './radarView';

export const createRadar = (sectors, data, config) => {
    config.forEach(el => radarView.renderRadar(el));
    calcSectors(sectors, data); 
    positionElements(data);
};

const positionElements = data => {   
    data.forEach(el => {  
        const boundaries = {
            minRadius: el.minRadius, 
            radius: el.radius, 
            angle: el.angle
        };        
        if(el.statusId && el.CAT){
            const dot = radarView.createDots(el.statusId, el.TECH);  
            el.dot = dot;            
            const [x, y] = calcRandomPosition(boundaries);          
            const positionData = {x, y, dot};
            if(el.CHANGE_SPEED){  
                const arrowProps = {};
                const arrow = radarView.createArrows(el.TECH, el.statusId);
                el.arrow = arrow;
                arrowProps.arrow = arrow;
                arrowProps.changeSpeed = el.CHANGE_SPEED;
                arrowProps.angle = el.angle;       	
                const direction = calcArrowDirection(arrowProps);	
                positionData.arrow = arrow;
                positionData.direction = direction;
            } 
            radarView.renderPositions(positionData);
        }       
    });
};

export const repositionElement = (data, id) => {  
    data.forEach(el => {     
        if(el.TECH === id){    
            const boundaries = {
                minRadius: el.minRadius, 
                radius: el.radius, 
                angle: el.angle
            } 
            const [x, y] = calcRandomPosition(boundaries); 
            const newPositionData = {x, y, dot: el.dot} 
            if(el.arrow){
                const arrowProps = {
                    arrow: el.arrow,
                    changeSpeed: el.CHANGE_SPEED,
                    angle: el.angle
                }
                const direction = calcArrowDirection(arrowProps);
                newPositionData.arrow = arrowProps.arrow;
                newPositionData.direction = direction;
            } 
            radarView.renderPositions(newPositionData);
        }               
    });               
};

const calcSectors = (sectors, data) => {
	const textOffset = parseFloat((952 / sectors.length).toFixed(4));
	const sectorAngle = (360 / sectors.length);
	const r = 300;
	for(let i = 0; i < sectors.length; i++){
		 const radA = parseFloat(((sectorAngle * i) * (Math.PI / 180)).toFixed(4)); 	
		 const radAB = parseFloat(((sectorAngle * (i + 1)) * (Math.PI / 180)).toFixed(4));
		 const x = 330 + Math.round(r * Math.cos(radA));	
		 const y = 330 + Math.round(r * Math.sin(radA));	
		 const xa = 330 + Math.round((r + 3) * Math.cos(radA));
		 const ya = 330 + Math.round((r + 3) * Math.sin(radA));
		 const xb = 330 + Math.round((r + 3) * Math.cos(radAB));
		 const yb = 330 + Math.round((r + 3) * Math.sin(radAB));
		 const sectorRadius = `M330 330 L ${x}, ${y}`;
		 const sectorArc = `M ${xa}, ${ya} A300, 300, 0, 0, 1 ${xb}, ${yb}`;
		 let sectorConfig = [sectors[i], radA, radAB];      
         calcAngleLimit(sectorConfig, data);
         const sectorData = {
            sector: sectors[i],
            textOffset,
            sectorRadius,
            sectorArc
         }
		 radarView.renderSectors(sectorData);	
	};
};

const calcAngleLimit = (sectorConfig, data) => {  
	data.forEach(el => {  
		for(let i = 0; i < sectorConfig.length; i++){
			if(el.CAT === sectorConfig[0]){
				el.minAngle = sectorConfig[1];
				el.maxAngle = sectorConfig[2];
				const minA = (el.minAngle + 0.09);
				const maxA = (el.maxAngle - 0.09);
                el.angle = Number((((Math.random() * (maxA - minA)) + minA)).toFixed(4));
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
	const minR = props.minRadius - -6;			
	const maxR = props.radius - 6; 		  				
	const x = Math.round(Math.cos(props.angle)
			* (~~(Math.random() 
			* (maxR - minR)) + minR));			
	const y =  Math.round(Math.sin(props.angle)
			* (~~(Math.random() 
			* (maxR - minR)) + minR));     
	return [x, y];
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

