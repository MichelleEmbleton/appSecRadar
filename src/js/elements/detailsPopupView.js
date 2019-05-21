import { doms } from '../base';
import { fadeIn } from '../transitions';
import '../../css/details_box.css';
                           
export const renderDetailsPopup = el => {    
    const content = `
        <p class='details-${el.statusId}'>
            Name: 
            <span class='details-text'>${el.TECH}</span><br />
            Category: 
            <span class='details-text'>${el.CAT}</span><br />
            Sub-category:
            <span class='details-text'>${el.SUBCAT}</span><br />
            Date Added: 
            <span class='details-text'>${el.DATE}</span><br />
            Status: 
            <span class='details-text'>${el.STATUS}</span><br />
            Detail: 
            <span class='details-text'>${el.DETAILS}
        </p>`;
        
    doms.detailsBox.innerHTML = content;
    fadeIn(doms.detailsBox);
};

