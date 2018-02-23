function createSubcatTables(techList){
   if(document.getElementById("subcatTablesPos") !== null){	
	let len = techList.length;
	let subcatName = [];
	let i = '';
	for(i = 0; i < len; i++){ 
	   const subcat = techList[i].SUBCAT;
	   const techSubcatId = techList[i].SUBCATID;
	   if((subcatName.indexOf(subcat) == -1) 
	       && (subcat !=='') && (techSubcatId)){
	          subcatName.push(subcat);
	   }
	}
	const subcatLen = subcatName.length;
	for(let s = 0; s < subcatLen; s++){ 			
 	   const subcategory = subcatName[s].toUpperCase();		
	   let table = `<table class='list_table'>
			<caption>${subcategory}</caption>
			<tr>
			<th>Name</th>
			<th>Category</th>
			<th>Status</th>
			<th>Detail</th>
			</tr>`;
			
	   for(i = 0; i < len; i++){ 
		let techSubcat = techList[i].SUBCAT.toUpperCase();
		   if(techSubcat == ""){
			techSubcat = "unknown";
	  	   } else if(techSubcat == subcategory){
			const techId = techList[i].ID;	
			const techTech = techList[i].TECH.toUpperCase();
			let techCat = techList[i].CAT.toLowerCase();
			let techStat = techList[i].STATUS.toLowerCase();
			const techDet = techList[i].DETAILS;
			let tdcol = '';
			if(techId){
			   tdcol = techId;
			} else {
   			   techStat = "Unallocated"; 
			   tdcol = "nostatus"
			} 
			if(techCat == "") {
   			   techCat = "Unallocated"; 
			   tdcol = "nocat"
			}
			if(techDet == ''){
 			   techDet = 'No Details'
			}		
			table += `<tr> 
			    <td class='td1 ${tdcol}'>${techTech}</td> 
			    <td class='td2 ${tdcol}'>${techCat}</td> 
			    <td class='td3 ${tdcol}'>${techStat}</td>
			    <td class='td4 ${tdcol}'>${techDet}</td>
			    </tr>`;	
			}
		   }	
	 	   const sX = document.getElementById("subcatTablesPos")
 		   const sY = `${table} </table>`;
		   sX.insertAdjacentHTML('afterend', sY );
	  }
    }
}