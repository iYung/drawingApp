var canvas; var mousedown; var cursor; var colour;
var freehand; var line; var rect; var square; var circ;
var startPos;

var shapeArray = [];

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = false; line = false; rect = false; square = false; circ = false;
    mousedown = false; 
    colour = "#000000";
    cursor = canvas.getContext("2d");
  
    $('#canvas').mousedown(function(e){
        
        //register that mouse is down
        mousedown = true;
        
        //if shape is line, get starting coordinates
        if (line || rect || square || circ) {
            startPos = getMousePos(canvas);
        }
    });
    
    $('#canvas').mousemove(function(e){
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
        //if shape is square
        } else if (square) {
            var newSquare = new squareShape(colour,cursor,startPos,getMousePos(canvas));
            shapeArray.push(newSquare);
        } else if (circ) {
            var newCirc = new circShape(colour,cursor,startPos,getMousePos(canvas));
            shapeArray.push(newCirc);
        }
        //draw everything
        draw(canvas,cursor);
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true; line = false; rect = false; square = false; circ = false;
    });
    
    $('#line').mousedown(function(e) {
        freehand = false; line = true; rect = false; square = false; circ = false;
    });
    
    $('#rect').mousedown(function(e) {
        freehand = false; line = false; rect = true; square = false; circ = false;
    });
    
    $('#square').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = true; circ = false;
    });
    
    $('#circ').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = true;
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
//finds mous position relative to canvas
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