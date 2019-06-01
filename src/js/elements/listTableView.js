import { doms } from '../base';
import '../../css/tables.css';

const renderTable = (heading, titles, data, element) => {
    const renderTitles = title => `<th>${title}</th>`;
    const renderData = el => `
        <tr>
            <td class="${el.bkColor}">${el.td1}</td>
            <td class="${el.bkColor}">${el.td2}</td>
            <td class="${el.bkColor}">${el.td3}</td>
            <td class="${el.bkColor}">${el.td4}</td>
        </tr> `;

    const tableContent = `  
    <table class="list_table">  
        <caption>${heading}</caption> 
        <tr>${titles.map(title => renderTitles(title)).join('')}</tr>  
        ${data.map(el => renderData(el)).join('')}
    </table> `;

    element.insertAdjacentHTML("afterbegin", tableContent);
};

export const createSectorTable = (headings, titles, data) => {   
    const element = doms.sectorList;
    headings.forEach(heading => {       
        const sectorData = [];
        for(let i = 0; i < data.length; i++){
            data[i].cat === heading &&                               
                sectorData.push({
                    td1: data[i].tech,
                    td2: data[i].subcat || "Unallocated",
                    td3: data[i].status || "Unallocated",
                    td4: data[i].details || "No Details",
                    bkColor: data[i].statusId || "nostatus"
                });                                     
        }; 
        sectorData.forEach(el => {
            if(el.td2 === "Unallocated" || el.td2.includes("Invalid")) el.bkColor = "nosubcat";
        });          
        renderTable(heading, titles, sectorData, element);
    }); 
};     

export const createStatusTable = (headings, titles, data) => {
    const element = doms.statusList;
    headings.forEach(heading => {       
        const statusData = [];
        for(let i = 0; i < data.length; i++){
            data[i].status === heading &&                               
                statusData.push({
                    td1: data[i].tech,
                    td2: data[i].cat || "Unallocated",
                    td3: data[i].subcat || "Unallocated",
                    td4: data[i].details || "No Details",
                    bkColor: data[i].statusId
                });                   
        }; 
        statusData.forEach(el => {
            if(el.td2 === "Unallocated") el.bkColor = "nocat";
            if(el.td3 === "Unallocated" || el.td3.includes("Invalid")) el.bkColor = "nosubcat";
        });         
        renderTable(heading, titles, statusData, element);
    });           
};

export const createSubcatTable = (headings, titles, data) => {
    const element = doms.subcatList;
    headings.forEach(heading => {   
        const subcatData = [];
        for(let i = 0; i < data.length; i++){
            data[i].subcat === heading &&                               
                subcatData.push({
                    td1: data[i].tech,
                    td2: data[i].cat || "Unallocated",
                    td3: data[i].status || "Unallocated",
                    td4: data[i].details || "No details",
                    bkColor: data[i].statusId || "nostatus"
                });                   
        }; 
        subcatData.forEach(el => {
            if(el.td2 === "Unallocated") el.bkColor = "nocat";
        });            
        renderTable(heading, titles, subcatData, element);
    });           
};
