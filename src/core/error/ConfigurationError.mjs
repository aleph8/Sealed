/**
 *
 * Custom error for configuration errors.
 *
 * @author aleph8
 * @license CC BY-SA 4.0 
 */

class ConfigurationError extends Error {

	constructor(...args){
	    super(...args);
		this.name = "Configuration Error";
	}

}

export default ConfigurationError;
