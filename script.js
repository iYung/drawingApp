var canvas; var mousedown; var cursor; var colour;
var freehand; var line; var rect; var square; var circ; var ellip;
var startPos;

var shapeArray = [];

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = false; line = false; rect = false; square = false; circ = false; ellip = false;
    mousedown = false; 
    colour = "#000000";
    cursor = canvas.getContext("2d");
    
    var freehandObj;
  
    $('#canvas').mousedown(function(e){
        
        //register that mouse is down
        mousedown = true;
        
        //if shape is line, get starting coordinates
        if (freehand || line || rect || square || circ || ellip) {
            startPos = getMousePos(canvas);
        }
        
        //creates freehand object to feed new points into
        if (freehand) {
            freehandObj = new freehandShape(colour,cursor,startPos);
        }
        
    });
    
    $('#canvas').mousemove(function(e){
        //add point to freehand object
        if(freehand && mousedown) {
            freehandObj.addPt(getMousePos(canvas));
        }
    });
    
    $('#canvas').mouseup(function(e){
        
        //register that mouse is up
        mousedown = false;
        
        //get mouse end point
        var endPos = getMousePos(canvas);
        
        //MAKING SHAPES
        //if shape is line, create line obj
        if (line) {
            var newLine = new lineShape(colour,cursor,startPos,endPos);
            shapeArray.push(newLine);
        //if shape is rect
        } else if (rect) {
            var newRect = new rectShape(colour,cursor,startPos,endPos);
            shapeArray.push(newRect);
        //if shape is square
        } else if (square) {
            var newSquare = new squareShape(colour,cursor,startPos,endPos);
            shapeArray.push(newSquare);
        //if shape is circle and not negative
        } else if (circ && endPos.x > startPos.x && endPos.y > startPos.y) {
            var newCirc = new circShape(colour,cursor,startPos,endPos);
            shapeArray.push(newCirc|| endPos.x > startPos.x || endPos.y > startPos.y);
        //if shape is ellipse and not negative
        } else if (ellip && endPos.x > startPos.x && endPos.y > startPos.y) {
            var newEllip = new ellipShape(colour,cursor,startPos,endPos);
            shapeArray.push(newEllip);
        //if shape is freehand
        } else if (freehand){
            shapeArray.push(freehandObj);
        }
        
        //draw everything
        draw(canvas,cursor);
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true; line = false; rect = false; square = false; circ = false; ellip = false;
    });
    
    $('#line').mousedown(function(e) {
        freehand = false; line = true; rect = false; square = false; circ = false; ellip = false;
    });
    
    $('#rect').mousedown(function(e) {
        freehand = false; line = false; rect = true; square = false; circ = false; ellip = false;
    });
    
    $('#square').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = true; circ = false; ellip = false;
    });
    
    $('#circ').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = true; ellip = false;
    });
    
    $('#ellip').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = true;
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