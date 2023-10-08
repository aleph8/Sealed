/**
 * @author aleph8
 * @license CC BY-SA 4.0  
 */

import ConfigurationError from '../error/ConfigurationError.mjs';
import StegoBox from '../StegoBox.mjs';

class ImageStego extends StegoBox {

	canvas;
	context;
	image;
	secret;

	RGBAmatrix;
	RGBpattern;
	RGBmin;

	imageName;
	imageWidth;
	imageHeight;

	constructor(){
		super();
		this.image         = new Image();
	}

	init( canvasId ){

		this.canvas        = document.getElementById( canvasId );
		this.context       = this.canvas.getContext("2d");

		this.image.addEventListener("load",() => {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			this.imageWidth = this.image.width ;
			this.imageHeight = this.image.height ;

			this.canvasWidth  = this.imageWidth;
			this.canvasHeight = this.imageHeight;


			this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, 0, 0, this.imageWidth, this.imageHeight );

  		},false,);

	}


	encrypt( data ){
	    super.encrypt( data );
	}

	decrypt(){
	    return true;
	}

	configure( options ){
	    return options;
	}

	downloadStegoVessel(){
		return true;
	}

	downloadSecret( secret, type){
		return true;
	}

	//// SETTERS
	

	set imageName(  value ){
		this.imageName = value;
	}

	set imageSrc( value ){
		this.image.src = value;
	}

	set canvasHeight( value ){
		this.canvas.height = value;
	}

	set canvasWidth(value){
		this.canvas.width = value;
	}

}

export default ImageStego;
