import { renderAnomalyTable } from './anomalyTableView';
import { doms } from '../base';
import { clearView } from '../transitions';

const getAnomalies = data => {
    const anomalyList = [];
    data && 
        data.forEach(el => { 
            !el.CAT && anomalyList.push({	
                tech: el.TECH, 
                state: "Unallocated Category Sector", 
                trClass: "nocatsec"
            });										   
            if(!el.statusId) {
                let invalidStatus = el.STATUS ? "Invalid Status" : "Unallocated Status";
                anomalyList.push({	
                    tech: el.TECH, 
                    state: invalidStatus,
                    trClass: "nostatus"
                });
            }
            if(!el.subcatId || el.subcatId === "0") {
                let invalidSubcat = el.SUBCAT ? "Invalid Subcategory" : "Unallocated Subcategory";    
                anomalyList.push({	
                    tech: el.TECH, 
                    state: invalidSubcat, 
                    trClass: "nosubcat"
                });	
            }
        });                          
    renderAnomalyTable(anomalyList);     
};

export const anomalyControl = ({sign, data}) => {
    if(sign === '+') clearView(doms.anomalyTable);
    else getAnomalies(data);
};
