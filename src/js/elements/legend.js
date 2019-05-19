import { renderLegend } from './legendView';
import { doms } from '../base';
import { clearView } from '../transitions';

export const legendControl = (sign, config) => {  
    if(sign === '+') clearView(doms.legendContent);
    else config.forEach(el => renderLegend(el));   
};