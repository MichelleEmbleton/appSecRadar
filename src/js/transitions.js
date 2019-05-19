
export const fadeIn = element => {
    element.classList.add('fadein');
    setTimeout(() => {
        element.classList.remove('fadein');
    }, 1000);
};

export const clearView = parent => {
    parent.classList.add('fadeout');
    setTimeout(() => {
        parent.innerHTML = "";
        parent.classList.remove('fadeout');
    }, 300);
};

export const dragElement = (el, e) => {    
    const siblings = Array.from(el.parentNode.children);
    siblings.forEach(el => el.style.zIndex = 0);
    el.style.zIndex = 100;

    let xMargin = el.offsetLeft;   
    let yMargin = el.offsetTop;
    let xStart = e.clientX;
    let yStart = e.clientY;
  
    const moveElement = ev => {   
        ev.preventDefault();
        el.style.left = `${(xMargin + ev.clientX - xStart)}px`;
        el.style.top = `${(yMargin + ev.clientY - yStart)}px`;
    };

    const dropElement = () => {  
        document.removeEventListener('mousemove', moveElement);
    };

    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', dropElement); 
};

export const displayModule = btn => {  
    if(btn.id){ 	
        const btnId = btn.id;       
        let sign = btn.firstElementChild; 
        sign.textContent = sign.textContent === '-' ? '+' : '-';		
        const el = document.querySelector(`.${btnId}`);		
        el.classList.toggle(`${btnId}-show`);	
        return sign.textContent;
    }	
};
