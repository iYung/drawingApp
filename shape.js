//GENERIC

function shape(colour, startPos) {
    this.colour = colour;
    this.startPos = startPos;
}

shape.prototype.draw = function(cursor){
};

shape.prototype.hit = function(cursorPos){
}

shape.prototype.move = function(shiftx,shifty){
}