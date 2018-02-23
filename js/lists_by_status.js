function createStatusTables(techList){
  if(document.getElementById("statusTablesPos") !== null){		
	const len = techList.length;
	const statLen = statusList.length;
	for(let s = 0; s < statLen; s++){ 
	   const statusId = statusList[s].ID;
	   const statusTitle = statusList[s].TITLE.toUpperCase();
	   let table = `<table class='list_table'>
	   		<caption> ${statusTitle} </caption>
			<tr>
			<th>Name</th>
			<th>Category</th>
			<th>Subcategory</th>
			<th>Detail</th>
			</tr>`;
			
	   for(let i = 0; i < len; i++){ 
	      let techStatus = techList[i].STATUS.toUpperCase();
	      if(techStatus !== statusTitle){
		  techStatus = "unknown";
	      } else if(techStatus == statusTitle){
		  const techId = techList[i].ID;	
		  const techTech = techList[i].TECH.toUpperCase();
		  let techSubcat = techList[i].SUBCAT;
		  const techSubcatId = techList[i].SUBCATID;
		  let techCat = techList[i].CAT;
		  const techDetails = techList[i].DETAILS;
		  let tdcol = '';
		  if(techCat == ""){
		 	techCat = "Unallocated"; 
			tdcol = "nocat";		
		  } else if(techId){
			tdcol = techId;
		  }  
		  if(!techSubcatId){
			techSubcat = "Unallocated";
			tdcol = "nosubcat";
		  }
		  if(techDetails == ''){
			techDetails = 'No Details'
		  }		
		  table += `<tr> 
		  <td class='td1 ${tdcol}'>${techTech}</td> 
		  <td class='td2 ${tdcol}'>${techCat}</td>
		  <td class='td3 ${tdcol}'>${techSubcat}</td> 
		  <td class='td4 ${tdcol}'>${techDetails}</td>
		  </tr>`;	
		  }
	      }
	      const sX = document.getElementById("statusTablesPos")
	      const sY = `${table}</table>`;
	      sX.insertAdjacentHTML('afterend', sY);
	      }
         }
}