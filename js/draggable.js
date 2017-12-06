function dragElements(ev, element){ 

  document.getElementById(element).onclick = function() {
	this.style.zIndex = (this.style.zIndex + 1);
  }

  document.getElementById(element).onmousedown = function(ev) {
	this.prevX = ev.clientX;
	this.prevY = ev.clientY;
	this.mouseDown = true;
  }

  document.getElementById(element).onmousemove = function(ev) {
	if(this.mouseDown) {
		this.style.left = (Number(this.style.left.substring(0, this.style.left.length-2)) + (ev.clientX - this.prevX)) + "px";

		this.style.top = (Number(this.style.top.substring(0, this.style.top.length-2)) + (ev.clientY - this.prevY)) + "px";
				}

	this.prevX = ev.clientX;
	this.prevY = ev.clientY;
	
  }

  document.getElementById(element).onmouseup = function() {
	this.mouseDown = false;
  }
}