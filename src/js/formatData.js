
export const toLower = el => el = el.toLowerCase();

export const getUniqCats = data => { 
    const sectors = [];       
    data.forEach(el => {
        if((sectors.indexOf(el.CAT) === -1) && (el.CAT !== '')){
            sectors.push(el.CAT);				
        }
    });
    return sectors;
};

export const getUniqStates = config => {   
    const states = [];
    for(let i = 0; i < config.length; i++){
        states.push(config[i].TITLE);
    };
    return states;
};

export const getUniqSubcats = subcatConfig => {
    const subcats = [];
    subcatConfig.forEach(el => {
        el.SUBCAT && subcats.push(el.SUBCAT);
    });
    return subcats;
};

export const configData = (data, config, subcatConfig) => {                                     
    data.forEach(el => {   
        for(let i = 0; i < config.length; i++){
            if(el.STATUS && el.STATUS === config[i].TITLE){
                el.statusId = config[i].ID;     
                el.radius = Number(config[i].RADIUS); 
                el.minRadius = Number(config[i].minRadius); 
            }
        };                 
        for(let i = 0; i < subcatConfig.length; i++){
            if(el.SUBCAT && el.SUBCAT === subcatConfig[i].SUBCAT){
                el.subcatId = subcatConfig[i].ID;
            }	
        };
    });
};