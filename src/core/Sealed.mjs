/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import { buildContext } from './web/buildContext.mjs';
import ImageStegoMSB from './stego-boxes/ImageStegoMSB.mjs';
import ImageStegoLSB from './stego-boxes/ImageStegoLSB.mjs';
import ImageStegoRandomLSB from './stego-boxes/ImageStegoRandomLSB.mjs';
import { defEvents } from './Utils.mjs';

class Sealed {

	stegoBox;
	toolbox;
	stegoOptions;
	mainDivId;
	generalDivId;
	vesselId;
	context;
	generalDivId;
	canvasId;

	constructor( stegoOptions, mainDivId, vesselId, generalDivId, toolbox ){
		this.stegoOptions = stegoOptions;
		this.mainDivId    = mainDivId;
		this.vesselId     = vesselId;
		this.generalDivId = generalDivId;
		this.toolbox      = toolbox;
	}

	async encrypt( data ){
	    this.stegoBox.configure( this.stegoOptions );
		let processedData = await this.toolbox.apply(data);
	    this.stegoBox.encrypt(processedData);
		this.stegoBox.downloadStegoVessel();
	}

	decrypt(){
	    this.stegoBox.configure( this.stegoOptions );

		try{
			let processedData = this.stegoBox.decrypt();
			let ts_options    = this.toolbox.options();
			let secret        = this.toolbox.revert(processedData);
			this.stegoBox.downloadSecret(secret, ts_options.type);
		}catch{
			alert("ERROR!")
		}

	}

	buildStegoBox( stegoBox, canvasId ){
		this.canvasId = canvasId;
		this.stegoBox = stegoBox;
		this.context  = buildContext( this.stegoBox , this.mainDivId, this.vesselId, this.stegoOptions, this.generalDivId );
		this.buildSealedEvents();
		this.stegoBox.init( canvasId );
	}

	buildSealedEvents(){

		let encryptButton = document.getElementById('encrypt-button');
		let decryptButton = document.getElementById('decrypt-button');
		let userMessageInput = document.getElementById('userMessageInput');
		let rgb_pattern      = document.getElementById('rgb_pattern');
		let stegoBoxSelector = document.getElementById('stegoBoxSelector');

		let ts_type = document.getElementById('ts_type');

		let sealedContext = this;

		console.log(userMessageInput.getAttribute('type'));

		// stegoBox selector 

		stegoBoxSelector.addEventListener('change', function(){
			let stegoBoxChoice = this.value;
			if(stegoBoxChoice == "ImageStegoLSB"){
				sealedContext.buildStegoBox(new ImageStegoLSB(), sealedContext.canvasId );
			}else if(stegoBoxChoice == "ImageStegoMSB"){
				sealedContext.buildStegoBox(new ImageStegoMSB(), sealedContext.canvasId );
			}else if(stegoBoxChoice == "ImageStegoRandomLSB"){
				sealedContext.buildStegoBox(new ImageStegoRandomLSB(), sealedContext.canvasId );
			}
		});

		// Toolbox Configuration Selectors Event Listener

		ts_type.addEventListener("change", function() {
			sealedContext.toolbox.options()['type'] = this.value;
			userMessageInput.setAttribute('type', this.value);
			console.log(sealedContext.toolbox.options());
		});

		try{
			rgb_pattern.addEventListener("change", function(){
				let newRGBpattern  = [];
				let newRGBmin      = [];
	
				for( let i = 0; i < 3; i++){
	
					switch(this.value[i]){
	
						case 'R':
							newRGBpattern[i] = 0;
							newRGBmin[i]     = 0;
							break;
						case 'G':
							newRGBpattern[i] = 2;
							newRGBmin[i]     = 1;
							break;
						case 'B':
							newRGBpattern[i] = 4;
							newRGBmin[i]     = 2;
							break;
					}
	
				}
				sealedContext.stegoOptions.RGBpattern = newRGBpattern;
				sealedContext.stegoOptions.RGBmin     = newRGBmin;
				console.log(sealedContext.stegoOptions);
			});
		}catch{
			console.warn('rgb_pattern is null');
		}
		
		encryptButton.addEventListener("click", async function() { sealedContext.encrypt(userMessageInput); });
		decryptButton.addEventListener("click", function() { sealedContext.decrypt(userMessageInput); });
	}

	reconfigureToolbox( newConfig ){
		this.toolbox.reconfigure( newConfig )
	}

	
	///// SETTERS

	set options( options ){
		this.stegoOptions = options;
	}

	////// GETTERS
	
	get options(){
		return this.stegoOptions;
	}

}

export default Sealed;