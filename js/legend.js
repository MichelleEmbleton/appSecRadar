(function legend(){
'use strict';
const sLen = statusList.length;

for(let i = 0; i < sLen; i++){
	const title = statusList[i].TITLE.toUpperCase();  
	const id = ('legend-' + statusList[i].ID);
	const description = statusList[i].TEXT;	
	const legendTitle = document.createElement('p');	
	legendTitle.setAttribute("id", id);
	legendTitle.innerHTML = title;
	const legendText = document.createElement('p');
	legendText.setAttribute("class", "legend-text");
	legendText.innerHTML = description;	
	document.getElementById('legend_text').appendChild(legendTitle);
	document.getElementById('legend_text').appendChild(legendText);
	}
})();