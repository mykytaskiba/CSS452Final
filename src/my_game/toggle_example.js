
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new Example();
    myGame.start();
}

class Example extends engine.Scene {
    constructor() {
        super();

        
        this.mUICanvas = null;
    }

    load() {}

    unload() {
        engine.layer.cleanUp();
    }


    init() {


        this.mCurrentSong = 0;

        this.mUICanvas = new engine.Canvas();


        //============================================================================================

        this.mToggleOnOff = new engine.UIToggle(["On", "Off"], -200, 0, 100, 100);

        this.mUICanvas.addToCanvas(this.mToggleOnOff);

        //============================================================================================

        this.mTogglePlayPause = new engine.UIToggle(["Play", "Pause"], 0, 0, 200, 100);

        this.mUICanvas.addToCanvas(this.mTogglePlayPause);

        //============================================================================================

        this.mToggleColor = new engine.UIToggle(["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange", "Black", "White"], 300, 0, 200, 100);

        this.mUICanvas.addToCanvas(this.mToggleColor);

        
    }


    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        
        this.mUICanvas.draw();

    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {        
        this.mUICanvas.update();


    }

    
}

export default Example;