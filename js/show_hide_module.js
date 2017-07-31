function showHide(module, button, showClass, hideClass) {
	var module = document.getElementById(module);
	var button = document.getElementById(button);
	var spanChar = button.getElementsByTagName('span')[0];
	if(module.className == hideClass){	
		module.className = showClass;
		spanChar.innerHTML = "- ";
		} else {
		module.className = hideClass;
		spanChar.innerHTML = "+ ";
		}
	}
	
