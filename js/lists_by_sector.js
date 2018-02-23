function createSectorTables(techList){
   if(document.getElementById("sectorTablesPos") !== null){	
	const len = techList.length;
	const catList = [];
	let cat = null;
	for(let i = 0; i < len; i++){ 
	   cat = techList[i].CAT;
	   if((catList.indexOf(cat) == -1) && (cat !=='')){
	   catList.push(cat);
	   }
	}
	const catLen = catList.length;
	for(let c = 0; c < catLen; c++){ 			
	   const category = catList[c].toUpperCase();		
	   let table = `<table class='list_table'>
		<caption>${category}</caption>
		<tr>
		<th>Name</th>
		<th>Subcategory</th>
		<th>Status</th>
		<th>Detail</th>
		</tr>`
			
	   for(let i = 0; i < len; i++){ 
		let techCat = techList[i].CAT.toUpperCase();
		if(techCat == ""){
		   techCat = "unknown";
		} else if(techCat == category){
		   const techId = techList[i].ID;	
		   const techTech = techList[i].TECH.toUpperCase();
		   let techSubcat = techList[i].SUBCAT;
		   const techSubcatId = techList[i].SUBCATID;
		   let techStat = techList[i].STATUS.toLowerCase();
	   	   const techDet = techList[i].DETAILS; 
		   let tdcol = '';
		   if(techId){
		      tdcol = techId;
		   } else {
		      techStat = "Unallocated"; 
		      tdcol = "nostatus";
	 	   }
		   if(!techSubcatId){
		      techSubcat = "Unallocated";
		      tdcol = "nosubcat";
		   }
	   	   if(techDet == ''){
		      techDet = 'No Details'
		   }		
		   table += `<tr> 
			<td class='td1 ${tdcol}'>${techTech} </td> 
			<td class='td2 ${tdcol}'>${techSubcat} </td> 
			<td class='td3 ${tdcol}'>${techStat}</td> 
			<td class='td4 ${tdcol}'>${techDet} </td>
			</tr>`;	
		   }
		}	
		const sX = document.getElementById("sectorTablesPos")
		const sY = `${table}</table>`;
		sX.insertAdjacentHTML('afterend', sY );
	   }
	}
}