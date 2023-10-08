/**
 *
 * Custom error for capacity problems.
 *
 * @author aleph8
 * @license CC BY-SA 4.0
 */

class CapacityError extends Error {

	constructor(...args){
	    super(...args);
		this.name = "Capacity Error";
	}

}

export default CapacityError;
