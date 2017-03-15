function rectShape(colour, cursor,startPos, endPos) {
    this.cursor = cursor;
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
    this.endPos = endPos;
}

rectShape.prototype = Object.create(shape.prototype);
rectShape.prototype.constructor = rectShape;

rectShape.prototype.draw = function() {
    this.cursor.fillStyle=this.colour;
    this.cursor.fillRect(this.startPos.x,this.startPos.y,this.endPos.x - this.startPos.x,this.endPos.y - this.startPos.y);
};