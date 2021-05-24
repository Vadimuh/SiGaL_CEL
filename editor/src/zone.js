class Zone {
    constructor(x, y, width, height, name){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.name = name;
        this.cards = [];
    }

    draw(ctx){
        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(newX, newY){
        this.x = newX;
        this.y = newY;
    }

    rename(newName){
        this.name = newName;
    }
}