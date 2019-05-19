import { doms } from '../base';
import '../../css/mode_table.css';

const renderStatusDots = el => `  
    <div class="status-color-code dot-${el}"></div> `;

const renderSubcatKey = el => `
    <div class="subcat-list">
        <span class="subcat-color-code dot-sub${el.ID}"></span>
        ${el.SUBCAT}
    </div> `;

export const renderModeTable = props => {   
    const modeList = `
        <p id="status_mode" class="btn mode_switch"> Status Mode </p>
        <div id="status_mode_list">
            ${props.statusId.map(el => renderStatusDots(el)).join('')}           
        </div>

        <p id="subcat_mode" class="btn mode_switch"> Subcategory Mode </p>
        <div id="subcat_mode_list" class="subcat_mode_list">           
            ${props.subcats.map(el => renderSubcatKey(el)).join('')}           
        </div> `;

    doms.modeChart.insertAdjacentHTML('beforeend', modeList);      
};


        
	   
	