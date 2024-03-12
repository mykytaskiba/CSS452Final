
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new BuyMenuExample();
    myGame.start();
}

class BuyMenuExample extends engine.Scene {
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

        this.mMoney = 1000;

        //============================================================================================

        this.mMoneyText = engine.UIPrefabs.CreateText(-200,300,"Your Bottlecaps: ", 25);
        this.mUICanvas.addToCanvas(this.mMoneyText);

        //============================================================================================

        this.mStoreOptions = [ 
            "10mm Pistol",
            "Fat Man",
            "Stimpack",
            "Rad Away",
            "Nuka Cola",
            "Radroach Meat"
        ]

        this.mStorePrices = [
            150,
            1000,
            80,
            90,
            15,
            5
        ]


        this.mStoreDropdown = new engine.UIDropdown(this.mStoreOptions, -200, 200, 300, 50);
        this.mUICanvas.addToCanvas(this.mStoreDropdown);

        this.mYourChoice = engine.UIPrefabs.CreateText(100, 200, "Your choice: ", 20);
        this.mUICanvas.addToCanvas(this.mYourChoice);

        let buyButton = engine.UIPrefabs.CreateButton(120,150,100,50, "Buy", this, this.buy);
        this.mUICanvas.addToCanvas(buyButton);
        
        let sellButton = engine.UIPrefabs.CreateButton(220,150,100,50, "Sell", this, this.sell);
        this.mUICanvas.addToCanvas(sellButton);

        this.mStatusText = engine.UIPrefabs.CreateText(-200, -300, "Your Last Action: ", 20);
        this.mUICanvas.addToCanvas(this.mStatusText);
    }
    

    buy() {

        let choiceNum = this.mStoreDropdown.getCurrentlySelected(); 

        if (this.mMoney >= this.mStorePrices[choiceNum]) {
            this.mMoney += -this.mStorePrices[choiceNum];

            this.mStatusText.mRenderable.setText("Your Last Action: " + "Buy " + this.mStoreOptions[choiceNum]);
        } else {
            this.mStatusText.mRenderable.setText("Not Enough Money For: " + "Buy " + this.mStoreOptions[choiceNum]);
        }
    }

    sell() {

        let choiceNum = this.mStoreDropdown.getCurrentlySelected(); 

        this.mMoney += this.mStorePrices[choiceNum];

        this.mStatusText.mRenderable.setText("Your Last Action: " + "Sell " + this.mStoreOptions[choiceNum]);
        
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

        let choiceNum = this.mStoreDropdown.getCurrentlySelected();

        this.mYourChoice.mRenderable.setText("Your choice: " + this.mStoreOptions[choiceNum] + "(Price : " + this.mStorePrices[choiceNum] + ")");

        this.mMoneyText.mRenderable.setText("Your Bottlecaps: " + this.mMoney);
    }

    
}

export default BuyMenuExample;