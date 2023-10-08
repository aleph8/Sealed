/**
 *
 * ----------------------------------------------------------------------
 * @aleph8:
 *
 * Class for apply the MSB algorithm sequentially from the beginning 
 * to an image with a secret message. 
 * The message could be an image or plaintext.
 *
 * ----------------------------------------------------------------------
 * 
 * @author aleph8
 * @license CC BY-SA 4.0 
 *
 */

import ImageStego from "./ImageStego.mjs";
import { leftZeroPadding } from "../lib/bytePadding.mjs";
import { downloadImageFromCanva } from '../lib/download.mjs';

class ImageStegoMSB extends ImageStego{

	constructor(){
	    super();
		this.RGBpattern    = [0,2,4]; // Red = 0, Green = 2, Blue = 4
		this.RGBmin        = [0,1,2]; // Redo = 0, Green = 1, Blue = 2
	}

	init( canvasId ){
		super.init( canvasId );
	}

	///// LSB Encrypt
	

	encrypt( data ){

        if(!this.canSealed(data)){
			alert("ERROR: The secret size is bigger than the vessel capacity");
			throw new StegoBoxError("ERROR: The secret size is larger than the vessel capacity");
		}

	    console.log("Inicio del cifrado");
	    console.log("RGB Pattern : " + this.RGBpattern);

	    this.RGBAmatrix = this.context.getImageData( 0, 0, this.imageWidth, this.imageHeight).data;
	
	    console.log("Image before Stego");
	    console.log(this.RGBAmatrix);
	    
	    // LSB Algorithm

	    let i = 0;
	    let substr;
	    let message = data;
	
	    let ascii_char;
	    let binary_char;

	    let bit_to_add;
	    let pixel_part;
	    let binary_pixel_part;

	    let colorCode;
	    let min;
	    let position;
	
	    while( i + 4 < this.RGBAmatrix.length && message != "" ){

		    substr = message.slice(0,1);
		    message = message.slice(1);
		
		    ascii_char  = substr.charCodeAt(0).toString(2);
		    binary_char =  leftZeroPadding(ascii_char, 8 - ascii_char.length);

		    // 3 Pixels by 1 ASCII char hiding LSB bit
		    // Pixel by pixel encrypt

		    for(let block = 1; block < 4; block++){

			for(let color = 0; color < this.RGBpattern.length ; color++){


				bit_to_add = binary_char.slice(0,1);
				binary_char = binary_char.slice(1); 

				colorCode  = this.RGBpattern[color];
				min        = this.RGBmin[color];

				position   = i + (colorCode - min);

				pixel_part = this.RGBAmatrix[ position ].toString(2) ;
				
				binary_pixel_part =  leftZeroPadding(pixel_part, 8 - pixel_part.length);


				// Check for end of message.

			        if( block == 3 && color == 2 ){

				    // Separator

				    if(message == ""){
				        binary_pixel_part = "1" + binary_pixel_part.slice(1); 
				        console.log("Mensaje finalizado");
				    }else{
				        binary_pixel_part = "0" + binary_pixel_part.slice(1);
				        console.log("Sigue el mensaje");
				    }

				    this.RGBAmatrix[ position ] = parseInt(binary_pixel_part, 2);

				}else{	

				    if( bit_to_add != binary_pixel_part.slice(0,1) ){
				        binary_pixel_part = bit_to_add + binary_pixel_part.slice(1);
						this.RGBAmatrix[ position ] = parseInt(binary_pixel_part, 2);
				    }
				}

			}

			i = i + 4;
		}

	}

	this.canvas.width = this.imageWidth;
	this.canvas.height = this.imageHeight;

	var stegoImage = new ImageData(this.RGBAmatrix, this.imageWidth, this.imageHeight);

	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.putImageData(stegoImage, 0, 0);


	console.log("CIPHER END");
	console.log(this.RGBAmatrix);

    }

    //// Check Capacity

    canSealed(data){
		let width  = this.canvas.width;
		let height = this.canvas.height;
		
		let maxData  = (width * height) * 3 ; // DUE LSB 3 bits per pixel
		let dataSize = data.length * 8;       // 8 bits per ASCII char

		if(dataSize > maxData){
			return false;
		}else{
			return true
		}
	}
	

	///// LSB decrypt
	
	
    decrypt(){
	
	    let endMessage = false;

	    this.RGBAmatrix = this.context.getImageData( 0, 0, this.imageWidth, this.imageHeight).data;

	    console.log(this.RGBAmatrix);
	
	    let i = 0;
	    let finalMessage = "";
	    let binaryChar;

	    let pixel_part;
	    let binary_pixel_part;

	    let colorCode;
	    let min;
	    let position;

	    while(!endMessage && i + 4 < this.RGBAmatrix.length){
		
	        binaryChar = "";

			for(let block = 1; block < 4; block++){

				for(let color = 0; color < this.RGBpattern.length ; color++){

					colorCode  = this.RGBpattern[color];
					min        = this.RGBmin[color];

					position   = i + (colorCode - min);

					pixel_part = this.RGBAmatrix[ position ].toString(2) ;

					binary_pixel_part = leftZeroPadding(pixel_part, 8 - pixel_part.length);


				
					if( block == 3 && color == 2 ){

						if( parseInt(binary_pixel_part.slice(0,1),2) ){
							endMessage = true;
						}

					}else{
						binaryChar += binary_pixel_part.slice(0,1);
					}


				}

	           i = i + 4;

	    	}

	       finalMessage += String.fromCharCode(parseInt(binaryChar,2));
	    }

	    return finalMessage;
    }

	configure( options ){
	    this.RGBpattern  = options["RGBpattern"];
	    this.RGBmin      = options["RGBmin"];
	}

	// Download Stego Vessel

	downloadStegoVessel(){
		downloadImageFromCanva(this.canvas);
	}

	// Download secret from image

	downloadSecret(secret, type){
		console.log("Download secret type: " + type);
		if( type == "text"){
			alert(secret);
		}else{
			// alert(secret);
			let link = document.createElement('a');
			let ext  = secret.split('/')[1].split(';')[0];
			console.log(ext);
			link.download = "secret." + ext;
			link.href = secret;
			document.body.appendChild(link);
			link.click();
		}
	}

	///// SETTERS
	
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

export default ImageStegoMSB;