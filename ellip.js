function ellipShape(colour, cursor,startPos, endPos) {
    this.cursor = cursor;
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

ellipShape.prototype = Object.create(shape.prototype);
ellipShape.prototype.constructor = ellipShape;

ellipShape.prototype.draw = function() {
    this.cursor.beginPath();
    this.cursor.moveTo( (this.endPos.x + this.startPos.x) / 2, this.startPos.y);
    this.cursor.bezierCurveTo( this.endPos.x, this.startPos.y,
        this.endPos.x, this.endPos.y,
        (this.endPos.x + this.startPos.x) / 2, this.endPos.y);
    this.cursor.bezierCurveTo( this.startPos.x, this.endPos.y,
        this.startPos.x, this.startPos.y,
        (this.endPos.x + this.startPos.x) / 2, this.startPos.y);
    this.cursor.fillStyle=this.colour;
    this.cursor.fill();
};

ellipShape.prototype.hit = function(cursorPos) {
    var dx = cursorPos.x - (this.endPos.x + this.startPos.x) / 2;
    var dy = cursorPos.y - (this.endPos.y + this.startPos.y) / 2;
    var xRad = (this.endPos.x + this.startPos.x) / 2 - this.startPos.x;
    var yRad = (this.endPos.y + this.startPos.y) / 2 - this.startPos.y;
    if (( dx * dx ) / ( xRad * xRad ) + ( dy * dy ) / ( yRad * yRad ) <= 1){
        return true;
    } else {
        return false;
    }
}