function groupShape(shape1, shape2) {
    this.type = "group";
    this.shapeArray = [];
    this.shapeArray.push(shape1);
    this.shapeArray.push(shape2);
}

groupShape.prototype = Object.create(shape.prototype);
groupShape.prototype.constructor = groupShape;

groupShape.prototype.draw = function(cursor) {
    this.shapeArray[0].draw();
    this.shapeArray[1].draw();
};

groupShape.prototype.hit = function(cursorPos) {
    this.shapeArray[0].hit(cursorPos);
    this.shapeArray[1].hit(cursorPos);
};

groupShape.prototype.move = function(shiftx,shifty) {
    this.shapeArray[0].move(shiftx,shifty);
    this.shapeArray[1].move(shiftx,shifty);
};