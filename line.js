function lineShape(colour, cursor,startPos, endPos) {
    this.cursor = cursor;
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

lineShape.prototype = Object.create(shape.prototype);
lineShape.prototype.constructor = lineShape;

lineShape.prototype.draw = function() {
    this.cursor.beginPath();
    this.cursor.moveTo(this.startPos.x,this.startPos.y);
    this.cursor.lineTo(this.endPos.x,this.endPos.y);
    this.cursor.strokeStyle = this.colour;
    this.cursor.stroke();
};

lineShape.prototype.hit = function(cursorPos) {
    
    //gets cross product and checks if it is near cursor
    var crossproduct = (cursorPos.y - this.startPos.y) * (this.endPos.x - this.startPos.x) - (cursorPos.x - this.startPos.x) * (this.endPos.y - this.startPos.y);
    if ((Math.abs(crossproduct) < 2300)){
        return true;
    //if it is far return false    
    } else {
        return false;
    }
}



