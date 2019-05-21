import { doms } from './base';
import LoadData from './LoadData';
import { config } from './statusConfig';
import { subcatConfig } from './subcatConfig';
import * as format from './formatData';
import { dragElement, displayModule } from './transitions';
import * as radarControl from './elements/radar';
import { legendControl } from './elements/legend';
import { anomalyControl } from './elements/AnomalyTable';
import * as modes from './elements/modeTable';
import * as listTables from './elements/listTables';
import { detailsPopupControl } from './elements/detailsPopup';
import '../css/main.css';

const state = [];

const dataControl = async () => {
    const loadData = new LoadData();
    try {
        await loadData.dataRes();    
        state.data = loadData.data;          
        state.data.forEach(el => {
            el.CAT = format.toLower(el.CAT);
            el.SUBCAT = format.toLower(el.SUBCAT);
            el.STATUS = format.toLower(el.STATUS);
        });                    
        config.forEach(el => el.TITLE = format.toLower(el.TITLE)); 
        subcatConfig.forEach(el => el.SUBCAT = format.toLower(el.SUBCAT));    
        state.sectors = format.getUniqCats(state.data);        
        state.states = config.map(el => el.TITLE); 
        state.subcats = format.getUniqSubcats(subcatConfig);   
        radarControl.calcRadiiLimit(config); 
        format.configData(state.data, config, subcatConfig);
        radarControl.createRadar(state.sectors, state.data, config);                              
    }
    catch(err){
        const dataError = `
            Data isn't loading! <br />
            Check data source: the fields should match the template JSON file.<br />
            Check path in LoadData - the default is localhost:8080 - <br />
            for the test data.json file in /dist - <br />
            you need to change it to where your json data is coming from if not here.`;
        doms.errorMessage.classList.add('error-show');
        doms.errorMessage.innerHTML = dataError;   
    }
};

const btnArr = Array.from(doms.btns);  	      
btnArr.forEach(btn => btn.addEventListener('click', e => {
    let btn = e.target;  	   
    const btnId = btn.id;
    const sign = displayModule(btn);  
    const props = {
        sign, 
        data: state.data
    }    
    btnId === 'legend' && legendControl(sign, config); 
    btnId === 'radar_mode' && modes.modeTableControl(sign, config, subcatConfig);
    btnId === 'anomalies' && anomalyControl(props);
    btnId === 'sector' && listTables.sectorTableControl(props, state.sectors);
    btnId === 'status' && listTables.statusTableControl(props, state.states);
    btnId === 'subcat' && listTables.subcatTableControl(props, state.subcats);
}));

const elementList = [
    doms.sectorList, 
    doms.statusList, 
    doms.subcatList, 
    doms.anomalyTable,
    doms.modeChart
]
elementList.forEach(el => {
    el.addEventListener('mousedown', e => dragElement(el, e));
});

doms.svg.addEventListener('click', e => {
    if(e.target.closest('.dot')) {
        const id = e.target.closest('.dot').id; 
        const selected = state.data.filter(el => el.TECH === id);   
        radarControl.positionElements(selected, false);       
    }
});

doms.svg.addEventListener('mouseover', e => {  
    if(e.target.closest('.dot')) {
        const id = e.target.closest('.dot').id;
        detailsPopupControl(id, state.data);
    }  
});

doms.modeChart.addEventListener('click', e => {
    modes.modeControl(e.target.id, state.data)
});

window.addEventListener('load', dataControl);



