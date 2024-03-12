
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new ButtonExample();
    myGame.start();
}

class ButtonExample extends engine.Scene {
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

        this.mMoved = engine.UIPrefabs.CreateText(0,0,"Move Me", 25);
        
        this.mUICanvas.addToCanvas(this.mMoved);

        //============================================================================================

        let buttonUp = engine.UIPrefabs.CreateButton(-300,-260, 100,40,"Go Up", this, this.moveUp);

        this.mUICanvas.addToCanvas(buttonUp);

        //============================================================================================

        let buttonDown = engine.UIPrefabs.CreateButton(-300,-300, 100,40,"Go Down", this, this.moveDown);

        this.mUICanvas.addToCanvas(buttonDown);

        //============================================================================================


        let buttonLeft = engine.UIPrefabs.CreateButton(-400,-300, 100,40,"Go Left", this, this.moveLeft);

        this.mUICanvas.addToCanvas(buttonLeft);
        //============================================================================================


        let buttonRight = engine.UIPrefabs.CreateButton(-200,-300, 100,40,"Go Right", this, this.moveRight);

        this.mUICanvas.addToCanvas(buttonRight);
    }

    moveUp() {
        this.mMoved.mRenderable.getXform().incYPosBy(20);
    }


    moveDown() {
        this.mMoved.mRenderable.getXform().incYPosBy(-20);
    }

    moveRight() {

        this.mMoved.mRenderable.getXform().incXPosBy(20);
    }

    moveLeft() {
        this.mMoved.mRenderable.getXform().incXPosBy(-20);

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

export default ButtonExample;