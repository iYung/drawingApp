function circShape(colour, startPos, endPos) {
    this.type = "circ";
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

circShape.prototype = Object.create(shape.prototype);
circShape.prototype.constructor = circShape;

circShape.prototype.draw = function(cursor) {
    cursor.beginPath();
    cursor.arc( (this.endPos.x + this.startPos.x) / 2, (this.endPos.y + this.startPos.y) / 2, ((this.endPos.x + this.startPos.x) / 2) - this.startPos.x, 0, 2 * Math.PI, false);
    cursor.fillStyle=this.colour;
    cursor.fill();
};

circShape.prototype.hit = function(cursorPos) {
    //if mouse is not in x axis
    if ( Math.abs(cursorPos.x - (this.endPos.x + this.startPos.x) / 2) > ((this.endPos.x + this.startPos.x) / 2) - this.startPos.x ) {
        return false;
    //if mouse is not in y axis
    }else if ( Math.abs(cursorPos.y - (this.endPos.y + this.startPos.y) / 2) > ((this.endPos.x + this.startPos.x) / 2) - this.startPos.x ) {
        return false;
    //if in circle
    }else {
        return true;
    }
}

circShape.prototype.move = function(shiftx,shifty) {
    this.startPos.x += shiftx;
    this.startPos.y += shifty;
    this.endPos.x += shiftx;
    this.endPos.y += shifty;
}