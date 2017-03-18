function lineShape(colour, startPos, endPos) {
    this.type = "line";
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

lineShape.prototype = Object.create(shape.prototype);
lineShape.prototype.constructor = lineShape;

lineShape.prototype.draw = function(cursor) {
    cursor.beginPath();
    cursor.moveTo(this.startPos.x,this.startPos.y);
    cursor.lineTo(this.endPos.x,this.endPos.y);
    cursor.strokeStyle = this.colour;
    cursor.stroke();
};

lineShape.prototype.hit = function(cursorPos) {
    
    //gets cross product and checks if it is near cursor
    var crossproduct = (cursorPos.y - this.startPos.y) * (this.endPos.x - this.startPos.x) - (cursorPos.x - this.startPos.x) * (this.endPos.y - this.startPos.y);
    if ((Math.abs(crossproduct) < 1800)){
        return true;
    //if it is far return false    
    } else {
        return false;
    }
}

lineShape.prototype.move = function(shiftx,shifty) {
    this.startPos.x += shiftx;
    this.startPos.y += shifty;
    this.endPos.x += shiftx;
    this.endPos.y += shifty;
}



