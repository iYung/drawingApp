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