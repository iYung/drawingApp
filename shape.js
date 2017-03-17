//GENERIC

function shape(colour, cursor,startPos) {
    this.cursor = cursor;
    this.colour = colour;
    this.startPos = startPos;
}

shape.prototype.draw = function(){
};

shape.prototype.hit = function(cursorPos){
}