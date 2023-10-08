/**
 * @author aleph8
 * @license CC BY-SA 4.0 
 */

export function leftZeroPadding(string, length){

        if( length > 0 ){
	    return leftZeroPadding("0"+string, --length);
        }else{
	    return string;
        }

}
