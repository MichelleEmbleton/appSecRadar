import axios from 'axios';
import { doms } from './base';

export default class LoadData {

    async dataRes(){
        try {
            const res = await axios(`http://localhost:8080/data.json`);
            this.data = res.data;
        }
        catch(err){
            const dataError = `
            Data isn't loading! <br />
            Check data source: the fields should match the template JSON file.<br />
            Check path in LoadData - the default is localhost:8080 - <br />
            for the test data.json file in /dist - <br />
            you need to change it to where your json data is coming from if not here.`;
        doms.errorMessage.classList.add('error-show');
        doms.errorMessage.innerHTML = dataError; 
        console.log(err); 
        }       
    };
};

