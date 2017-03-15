function shape(colour, cursor,startPos) {
    this.cursor = cursor;
    this.cursor.fillStyle=colour;
    this.startPos = startPos;
}

shape.prototype.draw = function(){
    this.cursor.fillRect(this.startPos.x - 2,this.startPos.y - 2,4,4);
}