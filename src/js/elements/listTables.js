import { clearView, fadeIn } from '../transitions';
import { renderTable } from './listTableView';

const columnTitles = (col2, col3) => {
    return ['name', col2, col3, 'detail']; 
};

export const tableControl = ({sign, btnId, data, headings, element}) => {   
    if(sign === '+') clearView(element);    
    else {
        if(data){
            let titles;                            
            headings.forEach(heading => {  
                const tableData = [];
                for(let i = 0; i < data.length; i++){
                    const tableConfig = {
                        sector: {
                            columns: columnTitles('subcategory', 'status'),
                            listBy: data[i].CAT,
                            td2: data[i].SUBCAT,
                            td3: data[i].STATUS
                        },
                        status: {
                            columns: columnTitles('category', 'subcategory'),
                            listBy: data[i].STATUS,
                            td2: data[i].CAT,
                            td3: data[i].SUBCAT
                        },
                        subcat: {
                            columns: columnTitles('category', 'status'),
                            listBy: data[i].SUBCAT,
                            td2: data[i].CAT,
                            td3: data[i].STATUS
                        }   
                    }

                    const {columns, listBy, td2, td3} = tableConfig[btnId];
                    titles = columns;
                    listBy === heading &&                       
                        tableData.push({
                            td1: data[i].TECH,
                            td2: td2,
                            td3: td3,
                            td4: data[i].DETAILS,
                            bkColor: data[i].bkColor
                        });                                                                               
                };             
                renderTable(heading, titles, tableData, element);
            });             
            fadeIn(element);
        }       
    }        
};

