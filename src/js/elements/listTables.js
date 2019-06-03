import { clearView, fadeIn } from '../transitions';
import { renderTable } from './listTableView';

const columnTitles = (col2, col3) => {
    return ['name', col2, col3, 'detail']; 
};

export const tableControl = ({sign, btnId, data, headings, element}) => {   
    if(sign === '+') clearView(element);
    else {
        if(data){
            let listData;                            
            headings.forEach(heading => {  
                const tableData = [];
                for(let i = 0; i < data.length; i++){
                    if(btnId === 'sector'){
                        listData = {
                            columns: columnTitles('subcategory', 'status'),
                            listBy: data[i].CAT,
                            td2: data[i].SUBCAT,
                            td3: data[i].STATUS
                        }
                    }
                    if(btnId === 'status'){
                        listData = {
                            columns: columnTitles('category', 'subcategory'),
                            listBy: data[i].STATUS,
                            td2: data[i].CAT,
                            td3: data[i].SUBCAT
                        }               
                    }
                    if(btnId === 'subcat'){
                        listData = {
                            columns: columnTitles('category', 'status'),
                            listBy: data[i].SUBCAT,
                            td2: data[i].CAT,
                            td3: data[i].STATUS
                        }
                    }

                    listData.listBy === heading &&                       
                        tableData.push({
                            td1: data[i].TECH,
                            td2: listData.td2,
                            td3: listData.td3,
                            td4: data[i].DETAILS,
                            bkColor: data[i].bkColor
                        });                                                                              
                };             
                renderTable(heading, listData.columns, tableData, element);
            });             
            fadeIn(element);
        }       
    }        
};

