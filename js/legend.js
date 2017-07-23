(function legend(){
var i;
var sLen = statusList.length;

for(i = 0; i < sLen; i++){
	var title = statusList[i].TITLE.toUpperCase();  
	var id = ('legend-' + statusList[i].ID);
	var description = statusList[i].TEXT;		
	
	var text = "<span class='" 
		+ id 
		+ "'>" 
		+ title 
		+ "</span><br />" 
		+ description 
		+ "<br /><br />";

	document.getElementById('legend_text').innerHTML += text;
	}
})();