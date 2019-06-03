import { doms } from './base';
import LoadData from './LoadData';
import { config } from './statusConfig';
import { subcatConfig } from './subcatConfig';
import * as format from './formatData';
import { search } from './search';
import { dragElement, displayModule } from './transitions';
import * as radarControl from './elements/radar';
import { legendControl } from './elements/legend';
import * as anomalies from './elements/AnomalyTable';
import * as modes from './elements/modeTable';
import * as listTables from './elements/listTables';
import { renderDetailsPopup } from './elements/detailsPopupView';
import '../css/main.css';

const state = [];

const dataControl = async () => {
    const loadData = new LoadData();
    try {
        await loadData.dataRes();    
        state.data = loadData.data; 
        if(state.data){         
            state.data.forEach(el => {
                el.TECH = format.capitalize(el.TECH);
                el.CAT = format.format(el.CAT);   
                el.SUBCAT = format.format(el.SUBCAT);
                el.STATUS = format.format(el.STATUS);
            });                                             
            config.forEach(el => el.TITLE = format.format(el.TITLE)); 
            subcatConfig.forEach(el => el.SUBCAT = format.format(el.SUBCAT)); 
            state.sectors = format.getUniqCats(state.data);  
            state.states = config.map(el => el.TITLE); 
            state.subcats = format.getUniqSubcats(subcatConfig);   
            radarControl.calcRadiiLimit(config); 
            format.configData(state.data, config, subcatConfig);  
            state.techs = state.data.map(el => el.TECH); 
            const [anomalyList, tableList] = anomalies.setAnomalies(state.data);
            state.anomalyList = anomalyList;   
            state.tableList = tableList;         
            radarControl.createRadar(state.sectors, state.data, config); 
        } else {
            const errorMessage = `No data to display.`
            doms.errorMessage.classList.add('error-show');
            doms.errorMessage.innerHTML = errorMessage;  
            console.log(`Data: ${state.data}`);
        }                           
    }
    catch(err){
        const dataError = `Check data for errors!`;
        doms.errorMessage.classList.add('error-show');
        doms.errorMessage.innerHTML = dataError;  
        console.log(`${err}, Data source: ${state.data}`);
    }
};

const dotPositionControl = e => {
    if(e.target.closest('.dot')) {
        const id = e.target.closest('.dot').id; 
        const index = search(state.techs, id);  
        const selected = [state.data[index]];     
        radarControl.positionElements(selected, false);       
    }
};

const radiusControl = e => {
    if(e.target.closest('.radar-circles')) {
        const circle = e.target.closest('.radar-circles');
        const initX = e.clientX;       
        radarControl.changeRadius(state.data, config, circle, initX);    
    }
};

const detailsPopupControl = e => {
    if(e.target.closest('.dot')) {
        const id = e.target.closest('.dot').id;
        const index = search(state.techs, id);
        const selected = state.data[index];
        renderDetailsPopup(selected);
    }  
};
    
const modeChartControl = e => {  
    const id = e.target.id === 'mode_chart' ? null : e.target.id;  
    if(id && state.data){    
        const val = e.target.value;          
        const modeData = {
            id,
            val,
            data: state.data,
            subcats: state.subcats,
            sectors: state.sectors
        };  
        modes.modeControl(modeData);
    }
};

const displayModuleControl = e => {    
    let btn = e.target;  	   
    const btnId = btn.id;
    const sign = displayModule(btn);  
    
    btnId === 'legend' && legendControl(sign, config); 
    btnId === 'radar_mode' && modes.modeTableControl(sign, config, subcatConfig);
    btnId === 'anomalies' && anomalies.anomalyControl(sign, state.anomalyList);

    if(btnId === 'sector' || btnId === 'status' || btnId === 'subcat'){
        const props = {
            sign, 
            btnId,
            data: state.tableList
        };   
        if(btnId === 'sector'){
            props.headings = state.sectors;
            props.element = doms.sectorList;
        } 
        if(btnId === 'status'){
            props.headings = state.states;
            props.element = doms.statusList;
        }
        if(btnId === 'subcat'){
            props.headings = state.subcats;
            props.element = doms.subcatList;
        }
        listTables.tableControl(props);   
    };
};

const btnArr = Array.from(doms.btns);  	             
const chartList = [
    doms.sectorList, 
    doms.statusList, 
    doms.subcatList, 
    doms.anomalyTable,
    doms.modeChart
];

chartList.forEach(el => {
    el.addEventListener('mousedown', e => dragElement(el, e));
});
btnArr.forEach(btn => btn.addEventListener('click', displayModuleControl));
doms.svg.addEventListener('click', dotPositionControl);
doms.svg.addEventListener('mousedown', radiusControl);
doms.svg.addEventListener('mouseover', detailsPopupControl); 
doms.modeChart.addEventListener('click', modeChartControl);
window.addEventListener('load', dataControl);
