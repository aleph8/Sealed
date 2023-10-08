/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import { createRawButton, createRawDiv, createRawInput, createRawRadio, createRawTag, createTypeSelect } from '../rawComponents.mjs';

export function buildGeneralContext( mainDivId, generalDivId, stegoBox ){

	let main = document.getElementById( mainDivId );

	let general = createRawDiv( generalDivId );
	let buttons = createRawDiv( 'sealedButtons' );

	general.setAttribute('class','mb-5 flex flex-col gap-2');
	buttons.setAttribute('class','w-full mb-5 flex gap-5');

	// Selector for toolbox Options
	let toolboxSelector = createRawDiv( 'toolboxSelector' );

	let toolboxSelectorTag = createRawTag('Advanced Toolbox options');

	let ts_type = createTypeSelect('ts_type');
	toolboxSelector.appendChild(ts_type);

	// Message Input 

	let userMessageInput = createRawInput( 'userMessageInput' );
	userMessageInput.setAttribute("type","text");
	userMessageInput.setAttribute("placeholder", "The secret message");
	userMessageInput.setAttribute("autocomplete","off");
	userMessageInput.classList.add('pl-2');


	let encryptButton = createRawButton("encrypt-button", 'Encrypt');
	let decryptButton = createRawButton("decrypt-button", 'Decrypt');

	buttons.appendChild(encryptButton);
	buttons.appendChild(decryptButton);
	buttons.appendChild(userMessageInput);

	general.appendChild(buttons);
	general.appendChild(toolboxSelectorTag);
	general.appendChild(toolboxSelector);

	main.appendChild( general );

} 
