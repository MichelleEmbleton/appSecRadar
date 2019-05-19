import axios from 'axios';

export default class LoadData {

    async dataRes(){
        try {
            const res = await axios(`http://localhost:8080/data.json`);
            this.data = res.data;
        }
        catch(err){
            console.log(`LoadData error at LoadData: ${err}`);
        }       
    };
}



	
