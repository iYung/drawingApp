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
        this.cursor.fillRect(this.posArray[i].x - 3,this.posArray[i].y - 3,7,7);
    }
};

freehandShape.prototype.hit = function(cursorPos) {
    for (var i = 0; i < this.posArray.length; i++){
        if ((this.posArray[i].x - 3 < cursorPos.x) && (cursorPos.x < this.posArray[i].x + 3) && (this.posArray[i].y - 3 < cursorPos.y) && (cursorPos.y < this.posArray[i].y + 3)){
            return true;
        //if in rectangle drawn upwards
        }else if ((this.posArray[i].x - 3 > cursorPos.x) && (cursorPos.x > this.posArray[i].x + 3) && (this.posArray[i].y - 3 > cursorPos.y) && (cursorPos.y > this.posArray[i].y + 3)){
            return true;
        }
    }
    //not this square
    return false;
}

freehandShape.prototype.move = function(shiftx,shifty) {
    for (var i = 0; i < this.posArray.length; i++){
        this.posArray[i].x += shiftx;
        this.posArray[i].y += shifty;
    }
}