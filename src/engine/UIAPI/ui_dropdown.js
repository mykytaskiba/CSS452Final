/*
*   File: ui_dropdown.js
*   A UI Object that dropdowns to a selection of choices. 
*    Assumptions: Choices array cannot be empty. 
*/
import engine from "../index.js";
import UIObject from "./ui_object.js";

class UIDropdown {
    constructor(choices, posX, posY, width, height) {

        //This will probably break if choices array is empty. So dont do that

        this.mShowButton = engine.UIPrefabs.CreateButton(posX,posY, width,height, "Show", this, this.changeActiveState);
        this.mHideButton = engine.UIPrefabs.CreateButton(posX,posY, width,height, "Hide", this, this.changeActiveState);

        this.mCurrentOption = 0;

        //Really bad approach but it works ¯\_(ツ)_/¯
        
        this.mOptionMethods = [];
        this.mOptions = [];
        for (let i = 0; i < choices.length; i++) {
            
            this.mOptionMethods[i] = function() {
                this.mCurrentOption = i;
            }

            this.mOptions[i] = engine.UIPrefabs.CreateButton(posX,posY - height * (i+1), width,height, choices[i], this, this.mOptionMethods[i]);
            
        }

        this.mActive = false;
    }
    
    changeActiveState() {
        this.mActive = !this.mActive;
    }


    getCurrentlySelected() {
        return this.mCurrentOption;
    }

    
    
    draw(canvas) {

        if (this.mActive) {

            this.mHideButton.draw(canvas);

            this.mOptions.forEach(element => {
                element.draw(canvas);
            });


        } else {
            this.mShowButton.draw(canvas);
        }

    }

    update(canvas) {
        if (this.mActive) {

            this.mHideButton.update(canvas);

            this.mOptions.forEach(element => {
                element.update(canvas);
            });

        } else {
            this.mShowButton.update(canvas);
        }
    }
}

export default UIDropdown;