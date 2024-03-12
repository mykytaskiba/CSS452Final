/*
*   File: canvas.js
*   A Canvas where all elements are drawn in the UI. This is an object you need for any UI.
*/
import UICamera from "./ui_camera_main.js";

class Canvas {
    constructor() {
        this.mUICamera = new UICamera(
            vec2.fromValues(0, 0), // position of the camera
            1280,                       // width of camera
            [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
            
            //These values are hard coded, therefore you need to change them if you are using different viewport size. 
        );

        this.mCanvasWidth = 1280/2;
        this.mCanvasHeight = 720/2;

        this.mContents = [];

    }

    draw() {

        this.mUICamera.setViewAndCameraMatrix();

        this.mContents.forEach(element => {
            element.draw(this);
        });

    }

    update() {
        this.mContents.forEach(element => {
            element.update(this);
        });
    }

    addToCanvas(addedObject) {
        this.mContents.push(addedObject);
    }

}

export default Canvas;