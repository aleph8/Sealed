/**
 * @author aleph8
 * @license CC BY-SA 4.0 
*/

export function downloadImageFromCanva( canvas ){
    let link = document.createElement('a');
    link.download = 'sealedImage.png';
    link.href     = canvas.toDataURL();
    link.click();
}