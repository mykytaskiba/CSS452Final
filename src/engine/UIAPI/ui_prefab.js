/*
*   Prefabs made with the UI System that aid in the creation of UI
*   This is a collection of helper methods to help create UI objects faster.
*
*/

import engine from "../index.js";


//Create a simple text UI object and return it
function CreateText(posX, posY, text, textHeight) {
        // Make status message        
        let renderable = new engine.FontRenderable(text);
        renderable.setColor([0, 0, 0, 1]);
        renderable.getXform().setPosition(posX, posY);
        renderable.setTextHeight(textHeight);

        let simpleText = new engine.UIObject(renderable);

        return simpleText;


}

function CreateButton(posX, posY, width, height, text, eventCaller, event) {
    
        //Make square outline
        let squareRend = new engine.Renderable();
        squareRend.getXform().setPosition(posX,posY);
        squareRend.getXform().setSize(width - 15, height - 15);
        squareRend.setColor([0.7,0.7,0.7,1]);

        let square = new engine.ClickableUIObject(squareRend);
        square.setClickEvent(eventCaller, event);
        

        let outlineRend = new engine.Renderable();
        outlineRend.getXform().setPosition(posX,posY);
        outlineRend.getXform().setSize(width,height);
        outlineRend.setColor([0.3,0.3,0.3,1]);

        let outline = new engine.UIObject(outlineRend);

        let labelRend = new engine.FontRenderable(text);
        labelRend.setColor([0, 0, 0, 1]);
        labelRend.getXform().setPosition(posX,posY);
        labelRend.setTextHeight(height * 0.4);
    
        let label = new engine.UIObject(labelRend);


        labelRend.getXform().setPosition(posX- width/2 + 25,posY);

        console.log(labelRend.getXform().getWidth());

        let button = new engine.UIObjectCollection();
        button.addToCollection(outline);
        button.addToCollection(square);
        button.addToCollection(label);

        return button;
}

export { 
    CreateText,
    CreateButton
}