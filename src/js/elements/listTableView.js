import '../../css/tables.css';

export const renderTable = (heading, titles, data, element) => {
    let renderTitles = title => data.length > 0 ? `<th>${title}</th>` : `<td></td>`;
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
