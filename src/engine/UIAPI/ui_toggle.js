import engine from "../index.js";
import UIObject from "./ui_object.js";
/*
*   File: ui_toggle.js
*   A toggleable ui object. Works similar to the button, however the text inside cycles betweeen all the input choices. 
*    Assumptions: choices array must not be empty
*/
class UIToggle {
    //The button will cycle through the choices when clicked
    constructor(choices, posX, posY, width, height) {

        this.mButtons = [];
        for (let i = 0; i < choices.length; i++) {
            this.mButtons[i] = engine.UIPrefabs.CreateButton(posX,posY,width,height, choices[i], this, this.toggle);
        }

        this.mCurrentOption = 0;
    }

    getCurrentOption() {
        return this.mCurrentOption;
    }
    
    toggle() {
        this.mCurrentOption++;

        this.mCurrentOption = this.mCurrentOption % this.mButtons.length;
    }

    
    
    draw(canvas) {

        this.mButtons[this.mCurrentOption].draw(canvas);


    }

    update(canvas) {
        this.mButtons[this.mCurrentOption].update(canvas);
    }
}

export default UIToggle;