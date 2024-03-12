
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new TextExample();
    myGame.start();
}

class TextExample extends engine.Scene {
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

        this.mDropdownOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
        this.mDropdown = new engine.UIDropdown(this.mDropdownOptions, 0, 0, 200, 40);
        this.mUICanvas.addToCanvas(this.mDropdown);

        //============================================================================================
        
        this.mOptionText = new engine.UIPrefabs.CreateText(-85,50,"Option Selected", 20);
        this.mUICanvas.addToCanvas(this.mOptionText);
        console.log("add text");

        
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

        this.mOptionText.mRenderable.setText(this.mDropdownOptions[this.mDropdown.getCurrentlySelected()]);

    }

    
}

export default TextExample;