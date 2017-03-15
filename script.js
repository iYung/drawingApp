var canvas; var mousedown; var cursor; var colour;
var freehand; var line; var rect;
var startPos;

var shapeArray = [];

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = false; line = false; rect = false; mousedown = false; colour = "#000000";
    cursor = canvas.getContext("2d");
  
    $('#canvas').mousedown(function(e){
        
        //register that mouse is down
        mousedown = true;
        
        //if shape is line, get starting coordinates
        if (line || rect) {
            startPos = getMousePos(canvas);
        }
    });
    
    $('#canvas').mousemove(function(e){
        if (mousedown) {
            //var newShape = new shape(colour,cursor,getMousePos(canvas));
            //newShape.draw();
        }
    });
    
    $('#canvas').mouseup(function(e){
        
        //register that mouse is up
        mousedown = false;
        
        //if shape is line, create line obj
        if (line) {
            var newLine = new lineShape(colour,cursor,startPos,getMousePos(canvas));
            shapeArray.push(newLine);
        //if shape is rect
        } else if (rect) {
            var newRect = new rectShape(colour,cursor,startPos,getMousePos(canvas));
            shapeArray.push(newRect);
        }
        draw(canvas,cursor);
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true; line = false; rect = false;
    });
    
    $('#line').mousedown(function(e) {
        freehand = false; line = true; rect = false;
    });
    
    $('#rect').mousedown(function(e) {
        freehand = false; line = false; rect = true;
    });
    
    //COLOUR BUTTONS------------------------------
    
    $('#black').mousedown(function(e){
        colour = "#000000";
    });
    
    $('#red').mousedown(function(e){
        colour = "#ff0000";
    });
    
    $('#blue').mousedown(function(e){
        colour = "#0000ff";
    });

});

//FUNCS--------------------------------
function getMousePos(canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//clears canvas and redraws everything
function draw(canvas,cursor) {
    cursor.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < shapeArray.length; i++){
        shapeArray[i].draw();
    }
}