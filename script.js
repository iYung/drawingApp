var canvas; var freehand; var mousedown; var cursor; var colour;

$(document).ready(function(){
    
    canvas = document.getElementById("canvas");
    freehand = false; mousedown = false; colour = "#000000";
    cursor = canvas.getContext("2d");
  
    $('#canvas').mousedown(function(e){
        mousedown = true;
        
    });
    
    $('#canvas').mousemove(function(e){
        if (mousedown) {
            var newShape = new shape(colour,cursor,getMousePos(canvas));
            newShape.draw();
        }
    });
    
    $('#canvas').mouseup(function(e){
        mousedown = false;
    });
    
    //MODE BUTTONS------------------------------
    
    $('#freehand').mousedown(function(e){
        freehand = true;
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