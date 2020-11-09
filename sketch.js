//Create variables here

var dog,dog1,happyDog,database,foodS,foodStock;

var fedTime,lastFed;

function preload(){
dog = loadImage("images/dogImg.png")
happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1500, 1500);
  foodObj=new Food()

dog1=createSprite(250,300,150,150)
dog1.addImage(dog)
dog1.scale=0.25;



feed = createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood = createButton("Add food")
addFood.position(800,95)

foodStock = database.ref('Food')
foodStock.on("value",readStock)
}


function draw() {  
  background(46, 139, 87)
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })


foodObj.display()

fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed : "+lastFed%12 + "PM", 350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30)
  }
  drawSprites();

  fill ("black")
  textSize(15);
  textSize(25)
  text ("Food Remaining:"+foodS,250,100)

  }


function readStock(data){
  foodS=data.val();
}

function writeStock(x){

if(x<=0){
  x=0
}
else{
  x=x-1
}

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog1.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()

 
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}


