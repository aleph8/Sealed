/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import { buildSeqImageContext } from './contexts/seqImageContext.mjs'
import { buildGeneralContext } from './contexts/generalContext.mjs'
import { buildRandImageContext } from './contexts/randImageContext.mjs';


export function buildContext( stegoBox, mainDivId, vesselId, stegoOptions, generalDivId ){

	let main = document.getElementById( mainDivId );

	// console.log("DELETED ALL CHILDS");

	while( main.firstChild ){
	    main.removeChild( main.lastChild );
	}

	console.log(stegoBox.constructor.name);

	buildGeneralContext( mainDivId, generalDivId, stegoBox );

	if( stegoBox.constructor.name == "ImageStegoLSB" || stegoBox.constructor.name == "ImageStegoMSB" ){
		return buildSeqImageContext( stegoBox, mainDivId, vesselId );
	}else if( stegoBox.constructor.name == "ImageStegoRandomLSB" ){
		return buildRandImageContext(stegoBox, mainDivId, vesselId);
	}

}
