function squareShape(colour, cursor,startPos, endPos) {
    this.cursor = cursor;
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

squareShape.prototype = Object.create(shape.prototype);
squareShape.prototype.constructor = squareShape;

squareShape.prototype.draw = function() {
    this.cursor.fillStyle=this.colour;
    this.cursor.fillRect(this.startPos.x,this.startPos.y,this.endPos.x - this.startPos.x,this.endPos.x - this.startPos.x);
};

squareShape.prototype.hit = function(cursorPos) {
    //if in rectangle drawn downwards
    if ((this.startPos.x < cursorPos.x) && (cursorPos.x < this.endPos.x) && (this.startPos.y < cursorPos.y) && (cursorPos.y < this.endPos.y)){
        return true;
    //if in rectangle drawn upwards
    }else if ((this.startPos.x > cursorPos.x) && (cursorPos.x > this.endPos.x) && (this.startPos.y > cursorPos.y) && (cursorPos.y > this.endPos.y)){
        return true;
    //not in rectangle
    }else {
        return false;
    }
}

squareShape.prototype.move = function(shiftx,shifty) {
    this.startPos.x += shiftx;
    this.startPos.y += shifty;
    this.endPos.x += shiftx;
    this.endPos.y += shifty;
}