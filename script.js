var canvas; var mousedown; var cursor; var colour;
var freehand; var line; var rect; var square; var circ; var ellip; 
var del; var move; var copy; var group; var ungroup;

//holds starting pos, index of a shape in the shapeArray, and if a shapehas been copied
var startPos; var shapeIndex;

//holds shapes
var shapeArray = [];

var undoArray = [];

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = true; line = false; rect = false; square = false; circ = false; ellip = false; move = false;
    mousedown = false; copy = false; group = false; ungroup = false;
    colour = "#000000";
    cursor = canvas.getContext("2d");
    
    var freehandObj;
  
    $('#canvas').mousedown(function(e){
        
        //register that mouse is down
        mousedown = true;
        
        //get starting coordinates
        if (freehand || line || rect || square || circ || ellip || move || copy || group || ungroup) {
            startPos = getMousePos(canvas);
        }
        
        //creates freehand object to feed new points into
        if (freehand) {
            freehandObj = new freehandShape(colour,startPos);
        //gets object selected to move
        } else if (move || copy || group || ungroup) {
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
            updateUndo();
            var newLine = new lineShape(colour,startPos,endPos);
            shapeArray.push(newLine);
        //if shape is rect
        } else if (rect) {
            updateUndo();
            var newRect = new rectShape(colour,startPos,endPos);
            shapeArray.push(newRect);
        //if shape is square
        } else if (square) {
            updateUndo();
            var newSquare = new squareShape(colour,startPos,endPos);
            shapeArray.push(newSquare);
        //if shape is circle and not negative
        } else if (circ && endPos.x > startPos.x && endPos.y > startPos.y) {
            updateUndo();
            var newCirc = new circShape(colour,startPos,endPos);
            shapeArray.push(newCirc);
        //if shape is ellipse and not negative
        } else if (ellip && endPos.x > startPos.x && endPos.y > startPos.y) {
            updateUndo();
            var newEllip = new ellipShape(colour,startPos,endPos);
            shapeArray.push(newEllip);
        //if shape is freehand
        } else if (freehand) {
            updateUndo();
            shapeArray.push(freehandObj);
        //if in del mode
        } else if (del) {
            var objIndex = checkHit(getMousePos(canvas));
            if (objIndex != -1){
                updateUndo();
                shapeArray.splice(objIndex,1);
            }
        //if move mode
        } else if (move) {
            if (shapeIndex != -1) {
                updateUndo();
                var newPos = getMousePos(canvas);
                shapeArray[shapeIndex].move(newPos.x - startPos.x, newPos.y - startPos.y);
            }
        //if copy mode, no shape selected
        } else if (copy) {
            if (shapeIndex != -1) {
                updateUndo();
                var newPos = getMousePos(canvas);
                //clone shape without references to original shape
                var newShape = jQuery.extend(true, {}, shapeArray[shapeIndex]);
                newShape.move(newPos.x - startPos.x, newPos.y - startPos.y);
                shapeArray.push(newShape);
            }
        //group mode
        } else if (group) {
            //checks if both objects are valid
            var shapeIndex2 = checkHit(getMousePos(canvas));
            if ((shapeIndex != -1) && (shapeIndex2 != -1)) {
                updateUndo();
                var shape1, shape2;
                shape1 = jQuery.extend(true, {}, shapeArray[shapeIndex]);
                shapeArray.splice(shapeIndex,1);
                //gets new index value of second shape
                shapeIndex2 = checkHit(getMousePos(canvas));
                shape2 = jQuery.extend(true, {}, shapeArray[shapeIndex2]);
                shapeArray.splice(shapeIndex2,1);
                var newGroup = new groupShape(shape1, shape2);
                shapeArray.push(newGroup);
            }
        //ungroup mode
        } else if (ungroup) {
            //checks if shape is of type group
            if (shapeArray[shapeIndex].type == "group") {
                updateUndo();
                var newShape;
                newShape = jQuery.extend(true, {}, shapeArray[shapeIndex].shapeArray[0]);
                shapeArray.push(newShape);
                newShape = jQuery.extend(true, {}, shapeArray[shapeIndex].shapeArray[1]);
                shapeArray.push(newShape);
                shapeArray.splice(shapeIndex,1);
            }
        }
        
        //draw everything
        draw(canvas,cursor);
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#line').mousedown(function(e) {
        freehand = false; line = true; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#rect').mousedown(function(e) {
        freehand = false; line = false; rect = true; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#square').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = true; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#circ').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = true; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#ellip').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = true; 
        del = false; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#del').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = true; move = false; copy = false; group = false; ungroup = false;
    });
    
    $('#move').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = true; copy = false; group = false; ungroup = false;
    });
    
    $('#copy').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = true; group = false; ungroup = false;
    });
    
    $('#group').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = true; ungroup = false;
    });
    
    $('#ungroup').mousedown(function(e) {
        freehand = false; line = false; rect = false; square = false; circ = false; ellip = false; 
        del = false; move = false; copy = false; group = false; ungroup = true;
    });
    
    $('#save').mousedown(function(e) {
        //saves data as json
        localStorage.setItem("save", JSON.stringify(shapeArray));
    });
    
    $('#load').mousedown(function(e) {
        //get data from local storage and parse it
        var savedData = localStorage.getItem("save");
        var parsedData = JSON.parse(savedData);
        
        //load the data and draw it
        shapeArray = load(parsedData);
        draw(canvas,cursor);
    });
    
    $('#undo').mousedown(function(e) {
        var oldState = undoArray.pop().slice();
        shapeArray = oldState;
        draw(canvas,cursor);
    });
    
    $('#redo').mousedown(function(e) {
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
        shapeArray[i].draw(cursor);
    }
}

//checks if mouse is over object
function checkHit(mousePos) {
    //returns index of hovered obj
    for (var i = shapeArray.length - 1; i > -1; i--){
        if (shapeArray[i].hit(mousePos)){
            return i;
        }
    }
    //returns if there is nothing
    return -1;
}

//used for loading shapes from an array
function load(parsedData) {
    
    var newShape;
    var array = [];
    for (var i = 0; i < parsedData.length; i++){
        //if line
        if (parsedData[i].type == "line") {
            newShape = new lineShape(parsedData[i].colour,parsedData[i].startPos,parsedData[i].endPos);
            array.push(newShape);
        //if rectangle
        } else if (parsedData[i].type == "rect") {
            newShape = new rectShape(parsedData[i].colour,parsedData[i].startPos,parsedData[i].endPos);
            array.push(newShape);
        //square
        } else if (parsedData[i].type == "square") {
            newShape = new squareShape(parsedData[i].colour,parsedData[i].startPos,parsedData[i].endPos);
            array.push(newShape);
        //if circle
        } else if (parsedData[i].type == "circ") {
            newShape = new circShape(parsedData[i].colour,parsedData[i].startPos,parsedData[i].endPos);
            array.push(newShape);
        //if ellipse
        } else if (parsedData[i].type == "ellip") {
            newShape = new ellipShape(parsedData[i].colour,parsedData[i].startPos,parsedData[i].endPos);
            array.push(newShape);
        //if freehand
        } else if (parsedData[i].type == "freehand") {
            newShape = new freehandShape(parsedData[i].colour,parsedData[i].startPos);
            newShape.addArray(parsedData[i].posArray);
            array.push(newShape);
        //grouped shape
        } else if (parsedData[i].type == "group") {
            var loadedShapes = [];
            loadedShapes = load(parsedData[i].shapeArray);
            newShape = new groupShape(loadedShapes[0],loadedShapes[1]);
            array.push(newShape);
        }
    }
    
    return array;
    
}

function updateUndo() {
    var oldState = shapeArray.slice();
    undoArray.push(oldState);
}