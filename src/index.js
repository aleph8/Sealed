/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

import './css/tailwind.css'
import Sealed from './core/Sealed.mjs';
import Toolbox from './core/toolbox/Toolbox.mjs';
import ImageStegoLSB from './core/stego-boxes/ImageStegoLSB.mjs';
import ImageStegoRandomLSB from './core/stego-boxes/ImageStegoRandomLSB.mjs';

console.log("[!] Init index script");

let defOptions = {
	"RGBpattern"  : [0,2,4],
	"RGBmin"      : [0,1,2],
};

let defToolboxOptions = {
	"encoding"    : "base64",
	"type"        : "text",
};

let canvasId = "canvas";
let mainId   = "sealed";
let generalId = "sealed-options";

let toolbox = new Toolbox(defToolboxOptions);

let sealed = new Sealed(defOptions, mainId, canvasId, generalId, toolbox);

sealed.buildStegoBox(new ImageStegoRandomLSB(), canvasId);


