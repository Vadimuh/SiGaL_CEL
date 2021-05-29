// let images = [];
// images[0] = document.createElement('img');
// images[0].src = 'https://i.ebayimg.com/images/g/dREAAOSwE3RfpGJU/s-l300.jpg';

class Card {
    constructor(x, y, width, height, imageURL){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        //this.name = name;
        //this.angle = angle;
        this.imageElem = document.createElement('img');
        this.imageElem.src = imageURL;
        this.priority; //order in a zone
        this.zone; // 
    }

    draw(ctx){
        //placeholder image for cards without image
        ctx.fillStyle = "#EEEEEE";
        ctx.drawImage(this.imageElem, this.x, this.y, this.width, this.height);
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(newX, newY){
        this.x = newX;
        this.y = newY;
    }

    translate(deltaX, deltaY){
        this.x += deltaX;
        this.y += deltaY;
    }

    setZone(zone){
        this.zone = zone;
        console.log('in Zone');
    }

    rename(newName){
        this.name = newName;
    }

    isClickedOn(mouseDownX, mouseDownY){
        return mouseDownX >= this.x && mouseDownY >= this.y && mouseDownX < this.x + this.width && mouseDownY < this.y + this.height;
    }
}