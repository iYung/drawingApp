//GENERIC

function shape(colour, cursor,startPos) {
    this.cursor = cursor;
    this.colour = colour;
    this.startPos = startPos;
}

shape.prototype.draw = function(){
    this.cursor.fillStyle=this.colour;
    this.cursor.fillRect(this.startPos.x - 2,this.startPos.y - 2,4,4);
};