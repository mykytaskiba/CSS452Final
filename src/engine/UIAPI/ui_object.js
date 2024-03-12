/*
*   File: ui_object.js
*   The simple UI Object in the system.
*   Takes in a renderable and is capable of drawing that renderable in the UI.
*/
class UIObject { 
    constructor(renderable) {
        this.mRenderable = renderable;
    }

    draw(canvas) {
        this.mRenderable.draw(canvas.mUICamera);
    }

    update(canvas) {

    }

}

export default UIObject;