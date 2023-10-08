/**
 *
 * Custom error for StegoBox errors.
 *
 * @author aleph8
 * @license CC BY-SA 4.0  
 */

class StegoBoxError extends Error {

	constructor(...args){
	    super(...args);
		this.name = "StegoBox Error";
	}

}

export default StegoBoxError;
