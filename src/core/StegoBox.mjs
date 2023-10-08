/**
 * @author aleph8
 * @license CC BY-SA 4.0 
 */

class StegoBox {

	secret;

	constructor(){
		this.secret = '';
	}

	encrypt( data ){
	    return data;
	}

	decrypt(){
	    return true;
	}

	configure( options ){
	    return options;
	}

	downloadStegoVessel(){
		return true;
	}

	downloadSecret(secret, type){
		return true;
	}

}

export default StegoBox;
