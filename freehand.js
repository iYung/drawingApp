function freehandShape(colour, cursor,startPos) {
    this.cursor = cursor;
    this.colour = colour;
    this.posArray = [];
    this.posArray.push(startPos);
}

freehandShape.prototype = Object.create(shape.prototype);
freehandShape.prototype.constructor = freehandShape;

freehandShape.prototype.addPt = function(newPt) {
    this.posArray.push(newPt);
}

freehandShape.prototype.draw = function() {
    this.cursor.fillStyle=this.colour;
    for (var i = 0; i < this.posArray.length; i++){
        this.cursor.fillRect(this.posArray[i].x - 2,this.posArray[i].y - 2,4,4);
    }
};

freehandShape.prototype.hit = function(cursorPos) {
    for (var i = 0; i < this.posArray.length; i++){
        this.cursor.fillRect(this.posArray[i].x - 2,this.posArray[i].y - 2,4,4);
    }
}