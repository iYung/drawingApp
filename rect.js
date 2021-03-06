function rectShape(colour, startPos, endPos) {
    this.type = "rect";
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

rectShape.prototype = Object.create(shape.prototype);
rectShape.prototype.constructor = rectShape;

rectShape.prototype.draw = function(cursor) {
    cursor.fillStyle=this.colour;
    cursor.fillRect(this.startPos.x,this.startPos.y,this.endPos.x - this.startPos.x,this.endPos.y - this.startPos.y);
};

rectShape.prototype.hit = function(cursorPos) {
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

rectShape.prototype.move = function(shiftx,shifty) {
    this.startPos.x += shiftx;
    this.startPos.y += shifty;
    this.endPos.x += shiftx;
    this.endPos.y += shifty;
}