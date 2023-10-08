/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import { createRawInput, createRawCanvas, createRawTag, createRawDiv, createRGBpatterns, createStegoBoxSelector } from '../rawComponents.mjs';

export function buildRandImageContext( stegoBox, mainDivId, vesselId ){
	
	let main = document.getElementById( mainDivId );

	let optionsTag = createRawTag("Advanced StegoBox options");
	main.appendChild(optionsTag);

	let optionsContainer = createRawDiv('stegoBoxOptionSelector');
	optionsContainer.setAttribute('class','grid gap-2');

	// Stego Box Selector

	let stegoBoxChoice = createStegoBoxSelector('stegoBoxSelector', stegoBox.constructor.name);
	let stegoBoxChoiceTag = createRawTag('StegoBox: ');
	optionsContainer.appendChild(stegoBoxChoiceTag);
	optionsContainer.appendChild(stegoBoxChoice);

	// Stego Box Options

	let stegoBoxOptions  = createRawTag('Options: ');
	optionsContainer.appendChild(stegoBoxOptions);

    let pass = createRawInput('session_password');
	pass.setAttribute("type","text");
	pass.setAttribute("placeholder", "The secret key");
	pass.setAttribute("autocomplete","off");
	pass.setAttribute("class", "p-2 rounded-lg");
    optionsContainer.appendChild(pass);


	main.appendChild(optionsContainer);

    // Upload 

    let uploadTag = createRawTag("Upload the vessel or sealed vessel:");
    uploadTag.setAttribute("class","mt-5 mb-5 text-white font-bold");
    main.appendChild(uploadTag);

    let inputImage = createRawInput( "inputImage" );
    inputImage.setAttribute("type","file");
    inputImage.setAttribute("accept","image/jpeg, image/png, image/jpg");
        
    inputImage.addEventListener("change", function() {
        let userImage = inputImage.files[0];
        stegoBox.imageName = inputImage.files[0].name.split(".")[0];
        stegoBox.imageSrc = URL.createObjectURL( userImage );
    });

    main.appendChild( inputImage );

    let canvas = createRawCanvas( vesselId );

    let canvasContainer = document.createElement("div");
    canvasContainer.setAttribute("id","preview");
    canvasContainer.setAttribute("class","w-full h-[20vh] lg:h-[35vh] mb-5 mt-5 flex justify-center items-center");
    canvasContainer.appendChild(canvas);

    main.appendChild(canvasContainer);

    return 'Image';

}