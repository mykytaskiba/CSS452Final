
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new CameraMoveExample();
    myGame.start();
}

class CameraMoveExample extends engine.Scene {
    constructor() {
        super();

        
        this.mUICanvas = null;
    }

    load() {
    }

    unload() {
        engine.layer.cleanUp();

    }


    init() {

        // Camera A
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5), // position of the camera
            100,                       // width of camera
            [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mSmallCamera = new engine.Camera(
            vec2.fromValues(50, 37.5), // position of the camera
            200,                       // width of camera
            [1080, 320, 200, 200]           // viewport (orgX, orgY, width, height)
        );
        this.mSmallCamera.setBackgroundColor([0.9, 0.8, 0.8, 1]);


        this.mHeroSquare = new engine.Renderable();
        this.mHeroSquare.getXform().setSize(20,20);
        this.mHeroSquare.getXform().setPosition(50,37.5);
        this.mHeroSquare.setColor([0.9,0.2,0.2,1]);

        engine.layer.addToLayer(engine.layer.eFront, this.mHeroSquare);

        for (let x = 0; x < 20; x++) {
                
            for (let y = 0; y < 20; y++) {
                let Square = new engine.Renderable();
                Square.getXform().setSize(10,10);
                Square.getXform().setPosition(-50 + x*10,-37.5 + y*10);
                Square.setColor([0.95,0.95,0.95,1]);
                if (x % 2 == y % 2) {
                    Square.setColor([0.1,0.1,0.1,1]);
                }

                engine.layer.addToLayer(engine.layer.eBackground, Square);
            }
        }


        //======================================================
        //Create the UI

        this.mHealth = 10;

        this.AliveCanvas = new engine.Canvas();

        let aliveText = engine.UIPrefabs.CreateText(-600, 0, "You are Alive :)", 30);
        aliveText.mRenderable.setColor([0,0.8,0,1]);
        this.AliveCanvas.addToCanvas(aliveText);

        let chooseDifficultyText = engine.UIPrefabs.CreateText(300, 50, "Choose difficulty", 15);
        chooseDifficultyText.mRenderable.setColor([0,0.8,0,1]);
        this.AliveCanvas.addToCanvas(chooseDifficultyText);

        let difficultySelection = new engine.UIToggle(["Easy", "Medium", "Hard"], 400, 0, 250, 50);
        this.AliveCanvas.addToCanvas(difficultySelection);


        this.DeadCanvas = new engine.Canvas();

        let deadText = engine.UIPrefabs.CreateText(-600, 0, "You are Dead :(", 30);
        deadText.mRenderable.setColor([0.8,0,0,1]);
        this.DeadCanvas.addToCanvas(deadText);

        let dropdownRespawn = new engine.UIDropdown(["Home Base", "Bed", "House", "Back To Menu"], 400, 0, 250, 50);
        this.DeadCanvas.addToCanvas(dropdownRespawn);

        
        let chooseRespawnText = engine.UIPrefabs.CreateText(300, 50, "Choose respawn point", 15);
        chooseRespawnText.mRenderable.setColor([0.8,0,0,1]);
        this.DeadCanvas.addToCanvas(chooseRespawnText);

        this.UniversalCanvas = new engine.Canvas();

        let tutorialText = engine.UIPrefabs.CreateText(-400,-300, "Controls: WASD - Move / RF - Increase/Decrease Health", 25);
        tutorialText.mRenderable.setColor([1,0,0,1]);
        this.UniversalCanvas.addToCanvas(tutorialText);

        this.mHealthText = engine.UIPrefabs.CreateText(-200,300, "Health: 10/10", 35);
        this.mHealthText.mRenderable.setColor([1,0,0,1]);
        this.UniversalCanvas.addToCanvas(this.mHealthText);

        let resetButton = engine.UIPrefabs.CreateButton(-400,-200, 300, 50, "Reset", this, this.reset);
        this.UniversalCanvas.addToCanvas(resetButton);


    }

    reset() {
        this.mHeroSquare.getXform().setPosition(50, 37.5);
        this.mHealth = 10;
    }


    


    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        

        this.mCamera.setViewAndCameraMatrix();
        engine.layer.drawAllLayers(this.mCamera);

        this.mSmallCamera.setViewAndCameraMatrix();
        engine.layer.drawAllLayers(this.mSmallCamera);

        this.UniversalCanvas.draw();

        if (this.mHealth > 0) {
            this.AliveCanvas.draw();
            
        } else {
            this.DeadCanvas.draw();

        }


    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {        
        
        this.mCamera.panTo(this.mHeroSquare.getXform().getXPos(),this.mHeroSquare.getXform().getYPos());
        this.mCamera.update();

        this.mSmallCamera.panTo(this.mHeroSquare.getXform().getXPos(),this.mHeroSquare.getXform().getYPos());
        this.mSmallCamera.update();
        
        if (this.mHealth > 0) {
            if (engine.input.isKeyPressed(engine.input.keys.W)) {
                this.mHeroSquare.getXform().incYPosBy(0.5);
            }

            if (engine.input.isKeyPressed(engine.input.keys.S)) {
                this.mHeroSquare.getXform().incYPosBy(-0.5);
            }
            if (engine.input.isKeyPressed(engine.input.keys.A)) {
                this.mHeroSquare.getXform().incXPosBy(-0.5);
            }
            if (engine.input.isKeyPressed(engine.input.keys.D)) {
                this.mHeroSquare.getXform().incXPosBy(0.5);
            }
        }
        if (engine.input.isKeyPressed(engine.input.keys.F)) {
            this.mHealth += -0.25;
        }
        if (engine.input.isKeyPressed(engine.input.keys.R)) {
            this.mHealth += 0.25;
        }

        
        this.mHealthText.mRenderable.setText("Health: " + this.mHealth + " / 10");


        if (this.mHealth > 0) {
            this.AliveCanvas.update();
            
        } else {
            this.DeadCanvas.update();

        }

        this.UniversalCanvas.update();
    }

    
}

export default CameraMoveExample;