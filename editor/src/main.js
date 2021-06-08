let canv = document.getElementById("theCanvas");
let ctx = canv.getContext("2d");

//stores all zones to redraw
let zones = [];
let cards = [];
const placingModes = {
    SELECT: 0,
    ZONE: 1,
    CARD: 2,
    PLAYER: 3
}

let currentMode = placingModes.SELECT;
let currentCard; //current card dragging

//starting board
ctx.fillStyle = "#FEE7E2";
ctx.fillRect(0,0, 800, 600);

//Keyboard inputs
document.addEventListener('keydown', e => {
    switch(e.key){
        case 'Escape':
            console.log('escape key pressed');
            currentMode = placingModes.SELECT;
            redrawEverything();
            break;
        case 'q': //q
            console.log('q key pressed');
            currentMode = placingModes.ZONE;
            redrawEverything();
            break;
        case 'w': //w
            console.log('w key pressed');
            currentMode = placingModes.CARD;
            redrawEverything();
            break;
        case 'e': //e
            console.log('e key pressed');
            currentMode = placingModes.PLAYER;
            redrawEverything();
            break;
    }
}, false);

//keeps track of when mouse is down and up between events
let mouseDown = false;
//x and y of where to start drawing
let mouseDownX = 0;
let mouseDownY = 0;
let mouseMoveX = undefined;
let mouseMoveY = undefined;

canv.addEventListener("mousedown", mouseDownHandler);
canv.addEventListener("mouseup", mouseUpHandler);
canv.addEventListener("mousemove", mouseMoveHandler);

function mouseDownHandler(event){   
    mouseDown = true;
    console.log("Mouse down");
    var rect = canv.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    mouseDownX = x;
    mouseDownY = y;
    mouseMoveX = x;
    mouseMoveY = y;
    switch(currentMode){
        case placingModes.SELECT:
            for(let i = cards.length-1; i >= 0; i--){
                let card = cards[i];
                if(card.isClickedOn(mouseDownX,mouseDownY)){
                    currentCard = card;
                    break;
                }
            }
            break;
        case placingModes.ZONE:
            break;
        case placingModes.CARD:   
            ctx.fillText("CARD MODE", 10, 50);
            let card = new Card(mouseDownX, mouseDownY, 50, 70, 'https://i.ebayimg.com/images/g/dREAAOSwE3RfpGJU/s-l300.jpg');
            card.draw(ctx);
            cards.push(card);    
            redrawEverything();
            break;
        case placingModes.PLAYER:
            ctx.fillText("PLAYER MODE", 10, 50);
            break;
    }
}

//collision detection for zones
function mouseUpHandler(event){
    if(!mouseDown){return;}
    console.log("Mouse Up");
    var rect = canv.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    switch(currentMode){
        case placingModes.SELECT:
            currentCard = undefined;
            break;
        case placingModes.ZONE:
            mouseDown = false;
            //give name to zone?
            //add zone to list
            let zone = new Zone(mouseDownX, mouseDownY, x-mouseDownX, y-mouseDownY);
            zone.draw(ctx)
            zones.push(zone);
            redrawEverything();
            break;
        case placingModes.CARD:   
            
            break;
        case placingModes.PLAYER:
            ctx.fillText("PLAYER MODE", 10, 50);
            break;
    }
}

function mouseMoveHandler(event){
    if(!mouseDown){return;}
    redrawEverything();
    var rect = canv.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let mouseXDelta = x - mouseMoveX;
    let mouseYDelta = y - mouseMoveY;

    mouseMoveX = x;
    mouseMoveY = y;
    switch(currentMode){
        case placingModes.SELECT:
            if(currentCard !== undefined){
                currentCard.translate(mouseXDelta,mouseYDelta);
                //check if card is every zone
                for(let i = 0; i < zones.length; i++){
                    let zone = zones[i];
                    if(isColliding(zone, currentCard)){
                        currentCard.setZone(zone);
                    }
                }
            }
            break;
        case placingModes.ZONE:
            //draw dashed lines
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(mouseDownX, mouseDownY, x-mouseDownX, y-mouseDownY);
            ctx.beginPath();
            ctx.setLineDash([5, 15]);
            ctx.moveTo(mouseDownX, mouseDownY);
            ctx.lineTo(x, mouseDownY);
            ctx.lineTo(x, y);
            ctx.lineTo(mouseDownX, y);
            ctx.lineTo(mouseDownX, mouseDownY);
            ctx.stroke();
            break;
        case placingModes.CARD:   
            
            break;
        case placingModes.PLAYER:
            //ctx.fillText("PLAYER MODE", 10, 50);
            break;
    }
}

function redrawEverything(){
    let tempFillStyle = ctx.fillStyle;
    //draw background
    ctx.fillStyle = "#FEE7E2";
    ctx.fillRect(0,0, 800, 600);
    //draw zones
    ctx.fillStyle = "#AAAAAA";
    for(let i = 0; i < zones.length; i++){
        let zone = zones[i];
        ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
    }
    //draw cards
    //ctx.fillStyle = "#AAAAAA";
    for(let i = 0; i < cards.length; i++){
        let card = cards[i];
        card.draw(ctx);
    }
    //draw mode text
    ctx.fillStyle = "#000000";
    ctx.font = "20px Georgia";
    switch(currentMode){
        case placingModes.SELECT:
            ctx.fillText("SELECT MODE", 10, 50);
            ctx.fillStyle = "#D1B397"; 
            ctx.fillRect(590,10,200,100);
            ctx.fillStyle = "#000000";
            ctx.font = "20px Georgia";
            ctx.fillText("Editor", 660, 30);
            ctx.fillText("Create Zone (Q)", 600, 55);
            ctx.fillText("Create Card (W)", 600, 75);
            ctx.fillText("Create Zone (E)", 600, 95);
            break;
        case placingModes.ZONE:
            ctx.fillText("ZONE MODE", 10, 50);
            ctx.fillStyle = "#D1B397"; 
            ctx.fillRect(590,10,200,100);
            ctx.fillStyle = "#000000";
            ctx.font = "20px Georgia";
            ctx.fillText("Editor", 660, 30);
            ctx.fillStyle = "#FFFFFF"; 
            ctx.fillRect(590, 35,200,50);
            ctx.fillStyle = "#000000";
            ctx.font = "20px Georgia";
            ctx.fillText("Create Zone (Q)", 600, 55);
            ctx.fillText("Create Card (W)", 600, 75);
            ctx.fillText("Create Zone (E)", 600, 95);
            break;
        case placingModes.CARD:   
            ctx.fillText("CARD MODE", 10, 50);
            ctx.fillStyle = "#D1B397"; 
            ctx.fillRect(590,10,200,100);
            ctx.fillStyle = "#000000";
            ctx.font = "20px Georgia";
            ctx.fillText("Editor", 660, 30);
            ctx.fillText("Create Zone (Q)", 600, 55);
            ctx.fillText("Create Card (W)", 600, 75);
            ctx.fillText("Create Zone (E)", 600, 95);
            break;
        case placingModes.PLAYER:
            ctx.fillText("PLAYER MODE", 10, 50);
            ctx.fillStyle = "#D1B397"; 
            ctx.fillRect(590,10,200,100);
            ctx.fillStyle = "#000000";
            ctx.font = "20px Georgia";
            ctx.fillText("Editor", 660, 30);
            ctx.fillText("Create Zone (Q)", 600, 55);
            ctx.fillText("Create Card (W)", 600, 75);
            ctx.fillText("Create Zone (E)", 600, 95);
            break;
    }
    ctx.fillStyle = tempFillStyle;
}

//Axis-Aligned Bounding Box collision for zones and cards
//could work for any rectangles really but not necessary rn
function isColliding(zone, card){
    if (zone.x < card.x + card.width &&
        zone.x + zone.width > card.x &&
        zone.y < card.y + card.height &&
        zone.y + zone.height > card.y) {
        return true;
    }
}

// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(100,75);
// ctx.stroke();

// //make triangle and fill it
// ctx.fillStyle = "#FACADE"; 
// ctx.beginPath();
// ctx.moveTo(250, 100);
// ctx.lineTo(290, 300);
// ctx.lineTo(175, 150);
// ctx.closePath();
// ctx.fill();

// ctx.fillStyle = "#000000"; 
// ctx.font = "30px Arial";
// let textWidth = ctx.measureText("Test text").width; //centers text
// ctx.fillText("Test text", canv.width/2-textWidth/2, canv.height/2);

//canv.addEventListener("click", clickHandler);

// function clickHandler(event){
//     console.log("Canvas was clicked");
//     console.log(event);
//     //makes sure its drawn in middle
//     var rect = canv.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;
//     //draw ellipse
//     // ctx.beginPath();
//     // ctx.fillStyle = "#"+Math.floor(Math.random()*16777216).toString(16); 
//     // ctx.ellipse(x, y, 50, 50, 0, 0, Math.PI*2);
//     // ctx.fill();
    
// }
//menu