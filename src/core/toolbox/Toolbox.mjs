/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import ConfigurationError from '../error/ConfigurationError.mjs';

class Toolbox{

    toolboxOptions;

    constructor( toolboxOptions ){
        this.toolboxOptions = toolboxOptions;
    }

    async apply( inputElement ){
        let finalData;
        let inputData = await this.getInputData(inputElement);
        let b64input = btoa(inputData);
        finalData = b64input;
        return finalData;
    }

    revert( processedData ){
        let finalData = atob(processedData);
        return finalData;
    }

    getTypeOfInput( inputElement ){
        return inputElement.getAttribute('type');
    }

    async getInputData( inputElement ){
        
        let type = this.toolboxOptions.type;

        if( type == "text" ){
            return inputElement.value;
        }else{
            let file = inputElement.files[0];
            if(file){
                let data = await this.fileToBase64(file);
                alert(data);
                return data;
            }
        }

    }

    fileToBase64(file){
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload  = () => resolve(fr.result);
            fr.onerror = reject; 
        });
    }

    options(){
        return this.toolboxOptions;
    }

    reconfigure( newConfig ){
        this.toolboxOptions = newConfig;
    }

}

export default Toolbox;