import { clearView } from '../transitions';
import { clearSectors, changeColor } from './radarView';
import { renderModeTable } from './modeTableView';
import { doms } from '../base';
import { calcSectors, positionElements } from './radar';

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

const modeState = [];

export const modeControl = ({id, val, data, subcats, sectors}) => {   
    modeState.mode = id;
    let newSectors;
    let init = !val ? true : false;   
    if(id.includes('_mode')) {
        modeState.sectorType = id === 'subcat_mode' ? subcats : sectors;
        clearSectors();
        data &&
            data.forEach(el => {  
                el.colorId = id === 'subcat_mode' ? `sub${el.subcatId}` :
                    !el.CAT ? 'c0' : el.statusId;
            });                 
    }
    newSectors = modeState.sectorType || sectors;
    if(val) modeState.equal = val === 'equal' ? true : false;   
    calcSectors(newSectors, data, modeState.equal, init); 
    positionElements(data, false);   
};
