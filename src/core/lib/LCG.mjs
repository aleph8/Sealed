/**
 * @author aleph8
 * @license CC BY-SA 4.0 
 * @description An algorithm for obtaining a sequence of pseudorandom numbers. It's NOT secure for crypto purpose.
 * It is inefficient, but due to the limitations of the browser and the generation of non-repetitive random numbers 
 * with initial seed, without the use of large resources, such as excessive memory or computational usage for example 
 * in prime number factorization, it can only generate these unique numbers.
 * 
 * TODO: Search for a better method.
 * 
 * To generate a sequence of non-repetitive random numbers based on the LGC and based on the dimensions of the image in question. 
 * Unfortunately, as I commented above, only a little use can be made of the image....
 * 
 */

import CapacityError from "../error/CapacityError.mjs";

class LCG{

    seed;
    module;
    multiplier; // a
    number_key_based;
    increment;
    lastRandom;
    randHeight;
    randWidth;
    internalCounter;
    limit;

    constructor(){
        this.increment       = 1;
        this.internalCounter = -1;
        this.randHeight      = [];
        this.randWidth       = [];
    }

    nextRandom(){
        this.internalCounter++;

        if(this.internalCounter >= this.limit){
            this.internalCounter = 0;
        }

        return this.randHeight[this.internalCounter] * this.randWidth[this.internalCounter];
    }

    lcg(module){
        let number = ((this.multiplier*this.lastRandom + this.increment) % 456793) % module;
        this.lastRandom = number;
        return number;
    }

    internalCounterReset(){
        this.internalCounter = 0;
    }

    canBeSealed(pixelsNeeded, imageHeight, imageWidth){
        let maxPixels = Math.min(imageHeight, imageWidth) / 2;
        if(pixelsNeeded > maxPixels){
            return false;
        }else{
            return true;
        }
    }

   /*
    *   @Ale Pixel parameter needed for future optimization of the method, so that only the necessary random numbers are 
    *   generated for encryption. For this the class needs some adjustments.
    */

    configure(key, imageHeight, imageWidth, pixelsNeeded){

        this.internalCounter = 0;

        if(!this.canBeSealed(pixelsNeeded, imageHeight, imageWidth)){
            alert("ERROR: the secret is too big for this mode!");
            throw new CapacityError('The pixels required are higher than those that can be used.');
        }

        // Decrypt condition

        if(pixelsNeeded > -1){
            pixelsNeeded = Math.floor(Math.min(imageHeight, imageWidth) / 2);
        }

        this.seed       = this.makeSeedFromKey(key);
        this.lastRandom = this.seed;
        this.multiplier = Math.abs(( this.number_key_based ) + 1);

        // Suffle Image Height Array

        let memory    =  [];
        let numberPos = 0; 

        for(let i = 0; i<imageHeight; i++){
            if(i % 2 == 0){
                memory[numberPos] = i;
                numberPos++;
            }
        }

        let sentinel = memory.length - 1;

        for(let i = 0; i < pixelsNeeded; i++){
            let position = this.lcg(Math.floor(imageHeight/2));
            let tmp      = memory[position];
            memory[position] = memory[sentinel];
            memory[sentinel] = tmp;
            sentinel--;
        }

        this.randHeight = memory.slice(sentinel+1, memory.length).reverse();

        // Suffle Image Width Array

        memory    = [];
        numberPos = 0;

        for(let i = 0; i<imageWidth; i++){
            if(i % 2 != 0){
                memory[numberPos] = i;
                numberPos++;
            }
        }

        sentinel = memory.length - 1;

        //// RESET THE LCG

        this.seed       = this.makeSeedFromKey(key);
        this.lastRandom = this.seed;

        for(let i = 0; i < pixelsNeeded; i++){
            let position = this.lcg(Math.floor(imageWidth/2));
            let tmp      = memory[position];
            memory[position] = memory[sentinel];
            memory[sentinel] = tmp;
            sentinel--;
        }

        this.randWidth = memory.slice(sentinel+1, memory.length).reverse();

        // LIMIT LENGTH

        this.limit = this.randHeight.length;

        // DEBUG INFO

        // console.log("RandHeight: " + this.randHeight.slice(0,12));
        // console.log("RandWidth: " + this.randWidth.slice(0,12));
    }

    makeSeedFromKey( key ){
        let newSed = 0;
        let nkb    = 13;
        let tmp;
        for (let i = 0; i < key.length; i++) {
            tmp = key.charAt(i).charCodeAt(0);
            newSed += tmp;
            if(i % 2 == 0){
                nkb = (nkb*(tmp**2));
            }else{
                nkb = (nkb^(tmp**2));
            }
        }
        this.number_key_based = nkb;
        return newSed;
    }
}

export default LCG;