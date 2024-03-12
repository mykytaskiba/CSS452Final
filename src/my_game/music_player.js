
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MusicPlayer();
    myGame.start();
}

class MusicPlayer extends engine.Scene {
    constructor() {
        super();

        
        this.mUICanvas = null;
    }

    load() {}

    unload() {
        engine.layer.cleanUp();
    }


    init() {

        this.mSongNames = [
            "Closer - Chainsmokers",
             "Deja Vu - Olivia Rodrigo",
             "Nightcall - Kavinsky",
             "Beggin - Maneskin",
             "Somebody I Used To Know - Gotye",
             "Short Song Test"
            ];

        this.mCurrentSong = 0;

        this.mCurrentPlaytime = 0;

        this.mSongLengths = [
            246,
            215,
            258,
            212,
            245,
            5
        ];

        this.mSongMax = this.mSongLengths[0];

        this.mUICanvas = new engine.Canvas();

        this.mPlayingText = engine.UIPrefabs.CreateText(-120,50,"Now Playing: ", 30);

        this.mUICanvas.addToCanvas(this.mPlayingText);

        this.mCurrentSongText = engine.UIPrefabs.CreateText(-120,20, "Song Name", 25);
        this.mUICanvas.addToCanvas(this.mCurrentSongText);


        this.mPlayButton = new engine.UIToggle([">", "||"],0,-100, 90,90);

        this.mUICanvas.addToCanvas(this.mPlayButton);
        
        
        this.mSkipButton = engine.UIPrefabs.CreateButton(90,-100, 90,90, ">>", this, this.incrementSong);

        this.mUICanvas.addToCanvas(this.mSkipButton);
        
        this.mRewindButton = engine.UIPrefabs.CreateButton(-90,-100, 90,90, "<<", this, this.decrementSong);

        this.mUICanvas.addToCanvas(this.mRewindButton);

        
        this.mSongPlaytimeText = engine.UIPrefabs.CreateText(-120,0, "0:00", 25);
        this.mUICanvas.addToCanvas(this.mSongPlaytimeText);

        //this.mPauseButton = engine.UIPrefabs.CreateButton(0,-30, 90,90, "||", null, null);

        //this.mUICanvas.addToCanvas(this.mPauseButton);
        
        this.updateSongDisplay();
    }

    incrementSong() {
        this.mCurrentSong++;
        this.mCurrentSong = this.mCurrentSong % this.mSongNames.length;

        this.mCurrentPlaytime = 0;

        this.updateSongDisplay();
    }

    decrementSong() {

        if (this.mCurrentPlaytime > 3) {
            this.mCurrentPlaytime = 0;
            return;
        }

        this.mCurrentSong+= this.mSongNames.length-1;
        this.mCurrentSong = this.mCurrentSong % this.mSongNames.length;
        
        this.mCurrentPlaytime = 0;

        this.updateSongDisplay();
    }

    updateSongDisplay() {
        this.mCurrentSongText.mRenderable.setText(this.mSongNames[this.mCurrentSong]);
        
        this.mSongMax = this.mSongLengths[this.mCurrentSong];
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

        if (this.mPlayButton.getCurrentOption() == 0) {
        this.mCurrentPlaytime += 1/60;
        }
        this.mSongPlaytimeText.mRenderable.setText("" + Math.floor(this.mCurrentPlaytime) + " / " + this.mSongMax);

        if (this.mCurrentPlaytime > this.mSongMax) {
            this.incrementSong();
        }
    }

    
}

export default MusicPlayer;