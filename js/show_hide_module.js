function showHide(module, button, showClass, hideClass) {
'use strict';
	module = document.getElementById(module);
	button = document.getElementById(button);
	let spanChar = button.getElementsByTagName('span')[0];
	if(module.className == hideClass){	
		module.className = showClass;
		spanChar.innerHTML = "- ";
		} else {
		module.className = hideClass;
		spanChar.innerHTML = "+ ";
		}
	}
	
