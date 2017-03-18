function ellipShape(colour, startPos, endPos) {
    this.type = "ellip";
    this.colour=colour;
    this.startPos = startPos;
    this.endPos = endPos;
}

ellipShape.prototype = Object.create(shape.prototype);
ellipShape.prototype.constructor = ellipShape;

ellipShape.prototype.draw = function(cursor) {
    cursor.beginPath();
    cursor.moveTo( (this.endPos.x + this.startPos.x) / 2, this.startPos.y);
    cursor.bezierCurveTo( this.endPos.x, this.startPos.y,
        this.endPos.x, this.endPos.y,
        (this.endPos.x + this.startPos.x) / 2, this.endPos.y);
    cursor.bezierCurveTo( this.startPos.x, this.endPos.y,
        this.startPos.x, this.startPos.y,
        (this.endPos.x + this.startPos.x) / 2, this.startPos.y);
    cursor.fillStyle=this.colour;
    cursor.fill();
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

ellipShape.prototype.move = function(shiftx,shifty) {
    this.startPos.x += shiftx;
    this.startPos.y += shifty;
    this.endPos.x += shiftx;
    this.endPos.y += shifty;
}