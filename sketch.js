var dog,sadDog,happyDog;
var feed , addFood;
var FeedTime;
var lastFeed;
var database;
var foodStoke;
var dogFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  pedigree = new Food();
  foodStoke = database.ref('Food');
  foodStoke.on("value" , readStoke)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("FEED")
  feed.position(500,200);
  feed.mousePressed(feedDog); 

  addFood = createButton("ADD FOOD")
  addFood.position(500,300);
  addFood.mousePressed(addFood); 
}

function draw() {
  background(46,139,87);
  FeedTime = database.ref('FeedTime');
  FeedTime.on("value" , function(data){
    lastFeed = data.val();
  })
  fill("yellow");
  textSize(50)

  if(lastFeed >= 12){
    text("FEED TIME" + lastFeed % 12 + "PM" , 300,50);
  }

  else if(lastFeed === 0){
    text("FEED TIME: 12 AM" , 300,50);
  }

  else {
    text("FEED TIME " + lastFeed + "AM" , 300,50);
  }
  drawSprites();
}

//function to read food Stock
function readStoke (data){
  dogFood = data.val();
  pedigree.updateFood(dogFood);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  var foodVal = pedigree.getFood();
  if(foodVal <= 0){
    pedigree.updateFood(foodVal * 0)
  }

  else{
    pedigree.updateFood(foodVal-1)
  }
  database.ref('/').update({
    Food:pedigree.getFood(),
    FeedTime:hour(),
  })
}

//function to add food in stock
function addFood(){
  dogFood++;
  database.ref('/').update({
    Food:dogFood,
  })
}