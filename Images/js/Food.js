class Food {
    constructor(){
        this.foodStoke = 0;
        this.lastFeed = 0;
        this.image = loadImage("images/Milk.png")
    }

    updateFood(foodStoke){
        this.foodStoke = foodStoke;
    }

    getlastFeedTime(lastFeed){
        this.lastFeed = lastFeed;
    }

    reduceFood(){
        if(this.foodStoke > 0){
            this.foodStoke -= 1;
        }
    }

    getfoodStoke(){
        return this.foodStoke;
    }

    display(){
        var x=80 , y=100;
        imageMode(CENTER);
        image(this.image , 250 , 50 , 70 , 70);

        if(this.foodStoke != 0){
            for(var i = 0 ; i < this.foodStoke; i++){
                if(i%10 === 0){
                    x += 80;
                    y = 50;
                }

                image(this.image , x , y , 50 , 50);
                y += 30
            }
        }
    }
}