
/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

export function createRawCanvas( canvasId ){
	const canvas = document.createElement("canvas");
	canvas.setAttribute("id", canvasId);
	canvas.setAttribute("class","bg-black w-auto h-full");
	return canvas;
}

export function createRawInput( inputId ){
	let input = document.createElement("input");
	input.setAttribute( "id", inputId );
	input.setAttribute("class", "file:h-full file:p-2 border-black border-10 file:bg-black file:text-white file:font-bold block w-full text-sm file:rounded-lg rounded-lg cursor-pointer bg-gray-50");
	return input;
}

export function createRawDiv( divId ){
	let div = document.createElement('div');
	div.setAttribute('id',divId);
	return div;
}

export function createRawButton( buttonId , buttonText ){
	let button = document.createElement('button');
	button.setAttribute('id', buttonId);
	button.setAttribute('class','bg-black text-white font-bold p-2 rounded-lg');
	button.textContent = buttonText;
	return button;
}

export function createRawTag( content ){
	let tag = document.createElement('p');
	tag.setAttribute('class','text-white font-bold mb-2');
	tag.textContent = content;
	return tag;
}

export function createRawRadio( id, value, name,  ){
	let radio = document.createElement('input');
	radio.setAttribute('type', 'radio');
	radio.setAttribute('id',id);
	radio.setAttribute('value',value);
	radio.setAttribute('name', name);
	return radio;
}

export function createTypeSelect( name ){
	let selector = document.createElement('select');
	selector.setAttribute('name',name);
	selector.setAttribute('id', name);
	selector.setAttribute('class', 'p-2');

	let ts_text = document.createElement('option');
	ts_text.value = "text";
	ts_text.innerHTML = "Text";

	let ts_file = document.createElement('option');
	ts_file.value = "file";
	ts_file.innerHTML = "File";

	selector.appendChild(ts_text);
	selector.appendChild(ts_file);

	return selector;
}

export function createStegoBoxSelector( name, stegoBox ){
	let selector = document.createElement('select');
	selector.setAttribute('name',name);
	selector.setAttribute('id', name);
	selector.setAttribute('class', 'p-2');

	let ImageStegoLSB = document.createElement('option');
	ImageStegoLSB.value = "ImageStegoLSB";
	ImageStegoLSB.innerHTML = "LSB-Seq-Replacement";

	let ImageStegoMSB = document.createElement('option');
	ImageStegoMSB.value = "ImageStegoMSB";
	ImageStegoMSB.innerHTML = "MSB-Seq-Replacement (NOT SECURE)";

	let ImageStegoRandomLSB = document.createElement('option');
	ImageStegoRandomLSB.value = "ImageStegoRandomLSB";
	ImageStegoRandomLSB.innerHTML = "LSB-Random-Replacement";

	selector.appendChild(ImageStegoLSB);
	selector.appendChild(ImageStegoMSB);
	selector.appendChild(ImageStegoRandomLSB);

	if(stegoBox == "ImageStegoMSB"){
		selector.value = "ImageStegoMSB";
	}else if(stegoBox == "ImageStegoRandomLSB"){
		selector.value = "ImageStegoRandomLSB";
	}

	return selector;
}

export function createRGBpatterns( name ){

	let selector = document.createElement('select');
	selector.setAttribute('name',name);
	selector.setAttribute('id', name);
	selector.setAttribute('class', 'p-2');

	let rgb = document.createElement('option');
	rgb.value = "RGB";
	rgb.innerHTML = "RGB";

	let rbg = document.createElement('option');
	rbg.value = "RBG";
	rbg.innerHTML = "RBG";

	let grb = document.createElement('option');
	grb.value = "GRB";
	grb.innerHTML = "GRB";

	let gbr = document.createElement('option');
	gbr.value = "GBR";
	gbr.innerHTML = "GBR";

	let bgr = document.createElement('option');
	bgr.value = "BGR";
	bgr.innerHTML = "BGR";

	let brg = document.createElement('option');
	brg.value = "BGR";
	brg.innerHTML = "BGR";

	selector.appendChild(rgb);
	selector.appendChild(rbg);
	selector.appendChild(grb);
	selector.appendChild(gbr);
	selector.appendChild(bgr);
	selector.appendChild(brg);

	return selector;
}