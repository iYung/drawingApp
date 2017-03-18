var canvas; var mousedown; var cursor; var colour;
var freehand; var line; var rect; var square; var circ; var ellip; var del; var move; var copy;

//holds starting pos, index of a shape in the shapeArray, and if a shapehas been copied
var startPos; var shapeIndex;

var shapeArray = [];

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = true; line = false; rect = false; square = false; circ = false; ellip = false; move = false;
    mousedown = false; copy = false;
    colour = "#000000";
    cursor = canvas.getContext("2d");
    
    var freehandObj;
  
    $('#canvas').mousedown(function(e){
        
        //register that mouse is down
        mousedown = true;
        
        //get starting coordinates
        if (freehand || line || rect || square || circ || ellip || move || copy) {
            startPos = getMousePos(canvas);
        }
        
        //creates freehand object to feed new points into
        if (freehand) {
            freehandObj = new freehandShape(colour,cursor,startPos);
        //gets object selected to move
        } else if (move || copy) {
            shapeIndex = checkHit(startPos);
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
            shapeArray.push(newCirc);
        //if shape is ellipse and not negative
        } else if (ellip && endPos.x > startPos.x && endPos.y > startPos.y) {
            var newEllip = new ellipShape(colour,cursor,startPos,endPos);
            shapeArray.push(newEllip);
        //if shape is freehand
        } else if (freehand) {
            shapeArray.push(freehandObj);
        //if in del mode
        } else if (del) {
            var objIndex = checkHit(getMousePos(canvas));
            if (objIndex != -1){
                shapeArray.splice(objIndex,1);
            }
        //if move mode
        } else if (move) {
            if (shapeIndex != -1) {
                var newPos = getMousePos(canvas);
                shapeArray[shapeIndex].move(newPos.x - startPos.x, newPos.y - startPos.y);
            }
        //if copy mode, no shape selected
        } else if (copy) {
            if (shapeIndex != -1) {
                var newPos = getMousePos(canvas);
                //clone shape without references to original shape
                var newShape = jQuery.extend(true, {}, shapeArray[shapeIndex]);
                newShape.move(newPos.x - startPos.x, newPos.y - startPos.y);
                shapeArray.push(newShape);
            }
        }
        
        //draw everything
        draw(canvas,cursor);
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; 
    });
    
    $('#line').mousedown(function(e) {
        freehand = false; line = true; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false;
    });
    
    $('#rect').mousedown(function(e) {
        freehand = false; line = false; rect = true; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; 
    });
    
    $('#square').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = true; circ = false; ellip = false; 
        del = false; move = false; copy = false; 
    });
    
    $('#circ').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = true; ellip = false; 
        del = false; move = false; copy = false; 
    });
    
    $('#ellip').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = true; 
        del = false; move = false; copy = false; 
    });
    
    $('#del').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = true; move = false; copy = false; 
    });
    
    $('#move').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = true; copy = false; 
    });
    
    $('#copy').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = true; 
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

//checks if mouse is over object
function checkHit(mousePos){
    //returns index of hovered obj
    for (var i = shapeArray.length - 1; i > -1; i--){
        if (shapeArray[i].hit(mousePos)){
            return i;
        }
    }
    //returns if there is nothing
    return -1;
}