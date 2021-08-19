var bird;
var birdImg;
var treeImg, treeImg2;
var backgroundImg;
var ground;
var gameOverImg;
var score = 0;
var gameState = "play";
var coinsGroup,obstaclesGroup;

function preload() {
    backgroundImg = loadImage('images/Background.jpg');
    birdImg = loadAnimation('images/Bird1.PNG', 'images/Bird2.PNG', 'images/Bird3.PNG', 'images/Bird4.PNG', 'images/Bird5.PNG', 'images/Bird6.PNG', 'images/Bird7.PNG', 'images/Bird8.PNG', 'images/Bird9.PNG');
    treeImg = loadImage('images/Tree.png');
    treeImg2 = loadImage('images/Tree2.jpg');
    coinImg = loadImage('images/Coin.jpg');
    gameOverImg = loadImage('images/gameover.png');
}

function setup() {
    createCanvas(1500, 700);
    ground = createSprite(630, 350);
    ground.addImage(backgroundImg);
    ground.scale = 2
    ground.velocityX = -2;
    bird = createSprite(100, 300, 50, 50);
    bird.addAnimation('bird', birdImg);
    gameOver = createSprite(700,320);
    gameOver.addImage('gameover', gameOverImg)
    gameOver.scale=0.7

    coinsGroup = new Group();
    obstaclesGroup = new Group();

}

function draw() {
    background("white");

    if(gameState === "play"){
        gameOver.visible = false;
        if(coinsGroup.isTouching(bird)){
            score=score+1
            coinsGroup.destroyEach();
        }


        if (ground.x < 250) {
            ground.x = ground.width / 2
        }
        
       bird.velocityY=1;
        if(keyDown(UP_ARROW)){
            bird.y = bird.y-10
        }
        /*if(keyDown(DOWN_ARROW)){
            bird.y = bird.y+10
        }*/
        spawnObstacles();
        spawnCoins();

        if(obstaclesGroup.isTouching(bird)){
            gameState = "end";
        }
    }

    if(gameState === "end"){
        gameOver.visible = true;
        ground.velocityX = 0;
        obstaclesGroup.destroyEach(0);
        coinsGroup.destroyEach(0);
        bird.velocityY = 5;
        
    }
   
    drawSprites();
    
    textSize(30);
    text("Score:"+score,750,50);
    
}


function spawnObstacles() {
    if(frameCount % 300 === 0){
        var obstacle = createSprite(1500,500,50,50);
        var x = Math.round(random(1,2))
        switch(x){
            case 1: obstacle.addImage('tree', treeImg);
            obstacle.scale=0.3;
            break;
            case 2: obstacle.addImage('tree', treeImg2);
            obstacle.scale=1.5
            break;

            default: break;
        }
       
        obstacle.velocityX = -5;
        obstaclesGroup.add(obstacle);
    }
}

function spawnCoins(){
    if(frameCount % 200 === 0){
        var coin = createSprite(1500,random(250,550),10,10);
        coin.addImage('coin',coinImg);
         coin.scale = 0.25;
       coin.velocityX=-5;
       coinsGroup.add(coin)
    }
}





