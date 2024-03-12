/*
*   File: clickable_ui_object.js
*   A UI Object that is clickable. 
*    Assumptions: The game object needs a renderable that has an accurate transform position and height/width
*/

import BoundingBox from "../utils/bounding_box.js";
import UIObject from "./ui_object.js";

import * as input from "../components/input.js";


class ClickableUIObject extends UIObject {
    constructor(renderable) {
        super(renderable);

        this.mNormalColor = [1,1,1,1];
        this.mHoverColor = [0.7,0.7,0.7,1];
        this.mClickColor = [0.4,0.2,0.2,1];

        this.mClickEvent = null;
        this.mEventCaller = null;
    }

    setClickEvent(eventCaller, clickEvent) {
        this.mClickEvent = clickEvent;
        this.mEventCaller = eventCaller;
    }

    setNormalColor(color) {
        this.mNormalColor = color;
    }

    setHoverColor(color) {
        this.mHoverColor = color;
    }

    setClickColor(color) {
        this.mClickColor = color;
    }
    
    update(canvas) {

        let color = this.mNormalColor;

        let center = this.mRenderable.getXform().getPosition();
        let width = this.mRenderable.getXform().getWidth();
        let height = this.mRenderable.getXform().getHeight();

        let bounds = new BoundingBox(center,width,height);
        
        if (canvas.mUICamera.isMouseInViewport()) {
            let clickPos = [];
            clickPos[0] = canvas.mUICamera.mouseWCX();
            clickPos[1] = canvas.mUICamera.mouseWCY();
            
            if (bounds.containsPoint(clickPos[0],clickPos[1])) {
                color = this.mHoverColor;


                if (input.isButtonPressed(input.eMouseButton.eLeft)) {
                    color = this.mClickColor;
                }
                
                if (input.isButtonClicked(input.eMouseButton.eLeft)) {
                    this.mClickEvent.call(this.mEventCaller);
                }
            }
            
        }


        this.mRenderable.setColor(color);

    }
}

export default ClickableUIObject;