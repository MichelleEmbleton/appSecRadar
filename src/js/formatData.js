

export const format = el => {
    el = el.toLowerCase();
    if(!el.replace(/\s/g, "").length) el = "";  
    return el;    
};   

export const getUniqCats = data => { 
    const sectors = [];       
    data.forEach(el => {
        if(el.CAT && sectors.indexOf(el.CAT) === -1){
            el.CAT !== " " && sectors.push(el.CAT);				
        }
    });
    return sectors;
};

export const getUniqSubcats = subcatConfig => {
    const subcats = [];
    subcatConfig.forEach(el => {
        el.SUBCAT && subcats.push(el.SUBCAT);    
    });
    return subcats;
};

export const setRadii = (el, config) => {
    for(let i = 0; i < config.length; i++){
        if(el.STATUS && el.STATUS === config[i].TITLE){
            el.radius = Number(config[i].RADIUS); 
            el.minRadius = Number(config[i].minRadius); 
        }
    };
};

export const configData = (data, config, subcatConfig) => {                                     
    data.forEach(el => {   
        for(let i = 0; i < config.length; i++){
            if(el.STATUS && el.STATUS === config[i].TITLE){
                el.statusId = config[i].ID;  
            }
            setRadii(el, config);
            el.colorId = !el.CAT ? 'c0' : el.statusId;
        }; 
        if(subcatConfig){                
            for(let i = 0; i < subcatConfig.length; i++){
                if(el.SUBCAT && el.SUBCAT === subcatConfig[i].SUBCAT){
                    el.subcatId = subcatConfig[i].ID;
                }	
            };
        }
        if(!el.subcatId) el.subcatId = '0';    
    });
};
