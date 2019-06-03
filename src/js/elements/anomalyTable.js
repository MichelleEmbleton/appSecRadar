import { renderAnomalyTable } from './anomalyTableView';
import { doms } from '../base';
import { clearView } from '../transitions';

export const setAnomalies = data => {

    const tableList = data.map(
        ({ TECH, CAT, SUBCAT, subcatId, STATUS, statusId, DETAILS }) => 
        ({ TECH, CAT, SUBCAT, subcatId, STATUS, statusId, DETAILS })
    );                               

    const anomalyList = [];

    tableList.forEach(el => { 
        el.bkColor = el.statusId;
        if(!el.CAT) {
            anomalyList.push({	
                tech: el.TECH, 
                state: "Unallocated Category Sector", 
                trClass: "nocatsec"
            });	
            el.CAT = "Unallocated";
            el.bkColor = "nocat";
        }

        if(!el.statusId) {
            let invalidStatus = el.STATUS ? "Invalid Status" : "Unallocated Status";
            anomalyList.push({	
                tech: el.TECH, 
                state: invalidStatus,
                trClass: "nostatus"
            });
            el.STATUS = el.STATUS ? 
                `${el.STATUS} <br /> Invalid status.<br /> Check against Titles in statusConfig` :
                "Unallocated";
            el.bkColor = "nostatus";
        }

        if(el.subcatId === "0") {
            let invalidSubcat = el.SUBCAT ? "Invalid Subcategory" : "Unallocated Subcategory";    
            anomalyList.push({	
                tech: el.TECH, 
                state: invalidSubcat, 
                trClass: "nosubcat"
            });	
            el.SUBCAT = el.SUBCAT ? 
                `${el.SUBCAT} <br /> Invalid subcat.<br /> Register in SubcatConfig` :
                "Unallocated";
            el.bkColor = "nosubcat";
        }
        if(!el.DETAILS) el.DETAILS = "No details";
    });                                                 
    return [anomalyList, tableList];    
        
};

export const anomalyControl = (sign, anomalyList) => {  
    if(sign === '+') clearView(doms.anomalyTable);
    else anomalyList && renderAnomalyTable(anomalyList); 
};
