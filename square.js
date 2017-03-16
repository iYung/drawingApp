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