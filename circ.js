function circShape(colour, cursor,startPos, endPos) {
    this.cursor = cursor;
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

circShape.prototype = Object.create(shape.prototype);
circShape.prototype.constructor = circShape;

circShape.prototype.draw = function() {
    this.cursor.beginPath();
    this.cursor.arc( (this.endPos.x + this.startPos.x) / 2, (this.endPos.y + this.startPos.y) / 2, ((this.endPos.x + this.startPos.x) / 2) - this.startPos.x, 0, 2 * Math.PI, false);
    this.cursor.fillStyle=this.colour;
    this.cursor.fill();
};