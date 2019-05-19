import { clearView } from '../transitions';
import { changeColor } from './radarView';
import { renderModeTable } from './modeTableView';
import { doms } from '../base';

export const modeTableControl = (sign, config, subcatConfig) => {  
    if(sign === '+') clearView(doms.modeChart);
    else {
        const colorCodes = {
            statusId: [], 
            subcats: []
        }
        config.forEach(el => el.ID && colorCodes.statusId.push(el.ID));
        subcatConfig.forEach(el => el.SUBCAT && colorCodes.subcats.push(el));   
        renderModeTable(colorCodes);      
    }   
};

export const modeControl = (id, data) => {  
    data && 
        data.forEach(el => {  
            let colorId = id === 'subcat_mode' ? el.subcatId : el.statusId;
            const colorData = {
                id: colorId, 
                dot: el.dot, 
                arrow: el.arrow
            }
            colorId && changeColor(colorData);  
        });
};