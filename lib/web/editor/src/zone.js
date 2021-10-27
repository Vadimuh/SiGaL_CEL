class Zone {
    constructor(x, y, width, height, name){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.name = 'Zone Name';
        this.cards = [];
    }

    draw(ctx){
        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.font = "20px Georgia";
        ctx.fillText(this.name, this.x, this.y -  5);
    }

    move(newX, newY){
        this.x = newX;
        this.y = newY;
    }

    rename(newName){
        this.name = newName;
    }
}