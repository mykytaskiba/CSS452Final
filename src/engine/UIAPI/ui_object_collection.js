/*
*   File: ui_object_collection.js
*   A collection of UI Objects that is drawn and updated together. 
*/
class UIObjectCollection { 
    constructor() {
        this.collection = [];
    }

    addToCollection(addedElement) {
        this.collection.push(addedElement);
    }

    draw(canvas) {
        this.collection.forEach(element => {
            element.draw(canvas);
        });
    }

    update(canvas) {
        this.collection.forEach(element => {
            element.update(canvas);
        });
    }

}

export default UIObjectCollection;