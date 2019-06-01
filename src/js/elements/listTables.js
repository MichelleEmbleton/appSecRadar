import { doms } from '../base';
import { clearView, fadeIn } from '../transitions';
import * as tableView from './listTableView';

const getTableListData = (data, col2, col3) => {
    const tableData = [];
    const titles = ['name', col2, col3, 'detail'];
    
    data.forEach(el => {
        let invalidSubcat, invalidStatus;
        if(el.SUBCAT && el.subcatId === "0") {
            invalidSubcat = `
                ${el.SUBCAT} <br /> 
                Invalid subcat.<br /> 
                Register in SubcatConfig`;
        }
        if(el.STATUS && !el.statusId) {
            invalidStatus = `
                ${el.STATUS} <br /> 
                Invalid status.<br /> 
                Check against Titles in statusConfig`;
        }
        let subcat = invalidSubcat || el.SUBCAT;
        let status = invalidStatus || el.STATUS;

        tableData.push({
            tech: el.TECH,
            cat: el.CAT,
            subcat: subcat,
            status: status,
            statusId: el.statusId,
            details: el.DETAILS
        });   
    }); 

    return [tableData, titles];  
};

export const sectorTableControl = ({sign, data}, sectors) => {   
    if(sign === '+') clearView(doms.sectorList);
    else {
        if(data){
            const [listData, titles] = getTableListData(data, 'subcategory', 'status');
            tableView.createSectorTable(sectors, titles, listData);
            fadeIn(doms.sectorList);
        }       
    }        
};

export const statusTableControl = ({sign, data}, states) => {   
    if(sign === '+') clearView(doms.statusList);
    else {
        if(data){
            const [listData, titles] = getTableListData(data, 'category', 'subcategory');
            tableView.createStatusTable(states, titles, listData);
            fadeIn(doms.statusList);
        }
    }         
};

export const subcatTableControl = ({sign, data}, subcats) => {   
    if(sign === '+') clearView(doms.subcatList);
    else {
        if(data){
            const [listData, titles] = getTableListData(data, 'category', 'status');
            tableView.createSubcatTable(subcats, titles, listData);
            fadeIn(doms.subcatList);
        }
    }        
};

