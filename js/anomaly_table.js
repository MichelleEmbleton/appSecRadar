function createAnomalyTable(anomalyList){
  'use strict';
  if(document.getElementById("anomalyTable") !== null){
	const aTable = document.createElement("table");
	aTable.setAttribute("id", "anomalyTable");
	const caption = document.createElement("caption");
	caption.textContent = "Anomalies";
	aTable.appendChild(caption);
	const tr = document.createElement("tr");
	const th1 = document.createElement("th");
	th1.textContent = "Name";
	const th2 = document.createElement("th");
	th2.textContent = "Anomaly";
	tr.appendChild(th1);
	tr.appendChild(th2);
	aTable.appendChild(tr);
	const aLen = anomalyList.length;  
	   if (aLen == 0){ 
		const noTr = document.createElement("tr");
		noTr.setAttribute("class", "no-entries");
		const noTd = document.createElement("td");
		noTd.textContent = "No issues!";
		noTr.appendChild(noTd);
		aTable.appendChild(noTr);
	   } else { 
		for(let i = 0; i < aLen; i++){
		   const mainTr = document.createElement("tr");
		   mainTr.setAttribute("class", anomalyList[i].trClass);
		   const td1 = document.createElement("td");
		   td1.innerHTML = anomalyList[i].tech;
		   const td2 = document.createElement("td");
		   td2.innerHTML = anomalyList[i].state;
		   mainTr.appendChild(td1);
		   mainTr.appendChild(td2);
		   aTable.appendChild(mainTr);
		} 
	   }
	   let x = document.getElementById('anomalyTable')
	   x.appendChild(aTable) ;	
   }
}
