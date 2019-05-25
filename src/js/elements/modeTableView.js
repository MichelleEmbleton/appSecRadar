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
        <div class="sector_switch">
            <input type="radio" id="equal" class="sector_switch-input" value="equal" name="sectors" checked> 
            <span class="sector_switch-btn"></span>
            <label for="equal" class="sector_switch-label"> Equal sectors </label> <br />
    
            <input type="radio" id="weighted" class="sector_switch-input" value="weighted" name="sectors"> 
            <span class="sector_switch-btn"></span>
            <label for="weighted" class="sector_switch-label"> Weighted sectors </label>
        </div>
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
