
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

        this.mPlayingText = engine.UIPrefabs.CreateText(-600,200,"This is a simple text prefab", 40);

        this.mUICanvas.addToCanvas(this.mPlayingText);

        //============================================================================================

        let renderable = new engine.FontRenderable("This is a customized text object");
        renderable.setColor([1, 0, 0.5, 1]);
        renderable.getXform().setPosition(-100, -200);
        renderable.setTextHeight(30);

        let customizedText = new engine.UIObject(renderable);

        this.mUICanvas.addToCanvas(customizedText);


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

export default TextExample;