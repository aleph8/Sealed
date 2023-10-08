/**
 *
 * ----------------------------------------------------------------------
 * @aleph8:
 *
 * Class for apply the LSB algorithm sequentially from the beginning 
 * to an image with a secret message. 
 * The message could be a file or plaintext.
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
import StegoBoxError from "../error/StegoBoxError.mjs";
import LCG from "../lib/LCG.mjs";

class ImageStegoRandomLSB extends ImageStego{

    prng;

    constructor(){
        super();
        this.prng = new LCG();
    }

    makeSeed(inputId, secretSize){
        let input = document.getElementById(inputId);
        let message = input.value;
        this.prng.configure(message, this.imageHeight, this.imageWidth, secretSize);
    }

    init(canvasId){
        super.init(canvasId);
    }

    configure( options ){ // MAKE prng config for decision
        return options;
    }

    encrypt(data){

        let pixelsNeeded = data.length * 3;
        this.makeSeed('session_password', pixelsNeeded);
	    this.RGBAmatrix = this.context.getImageData( 0, 0, this.imageWidth, this.imageHeight).data;

        // LSB Algorithm

	    let substr;
	    let message = data;
	
	    let ascii_char;
	    let binary_char;

	    let bit_to_add;
	    let pixel_part;
	    let binary_pixel_part;

	    let position;
        let random;
	
	    while( message != "" ){

		    substr = message.slice(0,1);
		    message = message.slice(1);
		
		    ascii_char  = substr.charCodeAt(0).toString(2);
		    binary_char =  leftZeroPadding(ascii_char, 8 - ascii_char.length);

		    // 3 Pixels by 1 ASCII char hiding LSB bit
		    // Pixel by pixel encrypt
		    for(let pixel = 1; pixel < 4; pixel++){

                random = this.prng.nextRandom() * 4;

				for(let rgb = 0; rgb < 3 ; rgb++){

                    // alert(binary_char)
					bit_to_add = binary_char.slice(0,1);
					binary_char = binary_char.slice(1);

					position   = random + rgb;

					pixel_part = this.RGBAmatrix[ position ].toString(2) ;
					
					binary_pixel_part =  leftZeroPadding(pixel_part, 8 - pixel_part.length); // Useless ?¿
					
                    // Check for end of message.

					if( pixel == 3 && rgb == 2 ){

						// Separator

						if(message == ""){
							binary_pixel_part = binary_pixel_part.slice(0,-1) + "1"; 
							console.log("Mensaje finalizado");
						}else{
							binary_pixel_part = binary_pixel_part.slice(0,-1) + "0";
							console.log("Sigue el mensaje");
						}

						this.RGBAmatrix[ position ] = parseInt(binary_pixel_part, 2);

					}else{	
						if( bit_to_add != binary_pixel_part.slice(-1) ){
							binary_pixel_part = binary_pixel_part.slice(0,-1) + bit_to_add;
							this.RGBAmatrix[ position ] = parseInt(binary_pixel_part, 2);
						}
					}

                    // DEBUG

                    // alert("random: " + random);
                    // alert("bitadd: " + bit_to_add );
                    // alert("RGBAmatrixbinary: " + binary_pixel_part);
                    // alert("EndRGBALSBProcess: " + binary_pixel_part);

				}
            }
        }

		this.canvas.width = this.imageWidth;
		this.canvas.height = this.imageHeight;

		var stegoImage = new ImageData(this.RGBAmatrix, this.imageWidth, this.imageHeight);

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.putImageData(stegoImage, 0, 0);

    }

    decrypt(){

        let endMessage = false;
        this.makeSeed('session_password', 0);
        this.RGBAmatrix = this.context.getImageData( 0, 0, this.imageWidth, this.imageHeight).data;

        // LSB Algorithm

	    let finalMessage = "";
	    let binaryChar;

	    let pixel_part;
	    let binary_pixel_part;

	    let position;
        let random;

	    while(!endMessage){
		
	        binaryChar = "";

			for(let pixel = 1; pixel < 4; pixel++){
                
                random = this.prng.nextRandom()*4;

				for(let rgb = 0; rgb < 3 ; rgb++){

					position   = random + rgb;

					pixel_part = this.RGBAmatrix[ position ].toString(2) ;

					binary_pixel_part = leftZeroPadding(pixel_part, 8 - pixel_part.length);

					if( pixel == 3 && rgb == 2 ){

						if( parseInt(binary_pixel_part.slice(-1),2) ){
							endMessage = true;
						}

					}else{
						binaryChar += binary_pixel_part.slice(-1);
					}
				}

	    	}
	       finalMessage += String.fromCharCode(parseInt(binaryChar,2));
	    }

        return finalMessage;

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

}

export default ImageStegoRandomLSB;