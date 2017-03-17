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
    //checks if on line
    if (Math.sqrt((cursorPos.x - this.startPos.x)^2 + (cursorPos.y - this.startPos.y)^2) + Math.sqrt((cursorPos.x - this.endPos.x)^2 + (cursorPos.y - this.endPos.y)^2) == Math.sqrt((this.endPos.x - this.startPos.x)^2 + (this.endPos.y - this.startPos.y)^2)){
        return true;
    }
    return false; 
}



