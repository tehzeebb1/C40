class Game{
   constructor()
   {
       
   }
   getState()
   {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){gameState=data.val();})
   }
   update(state)
   {
    database.ref('/').update({
        gameState:state
       });
   }
   async start()
   {
    if (gameState === 0)
    {
        player=new Player();
        var playerCountRef = await database.ref('playerCount').once("value");

        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
        player.getCount();
        }
        form=new Form();
        form.display();     
    }
    car1 = createSprite(100, 200)
    car1.addImage("car1",car1Img);
    car2 = createSprite(300, 200)
    car2.addImage("car2", car2Img);
    car3 =createSprite(500,200);
    car3.addImage("car3", car3Img);
    car4 =createSprite(700,200);
    car4.addImage("car4", car4Img);
cars = [car1, car2, car3, car4];
   }
   

   play()
   {
       form.hide();
       textSize(30);
       text("Game Start", 120, 100);

      
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      if(allPlayers !== undefined)
      {
          background(ground);
          image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

          var index=0;
          var x=150;
          var y;

       // var display_position = 130;
        for(var plr in allPlayers)
        {
            index=index+1;
            x=x+200;
            y = displayHeight - allPlayers[plr].distance;

           cars[index-1].x=x;
           cars[index-1].y=y;

           if(index === player.index)
           {
               stroke(10);
               fill("Red");
               ellipse(x, y, 65, 65);
               //text("Tehzeeb", x, y);
               cars[index-1].shapeColor="Red"
               camera.position.x = displayWidth/2;
               camera.position.y = cars[index-1].y;
           }
        }
        
        if(keyIsDown(UP_ARROW)&& player.index != null)
        {
            player.distance = player.distance+10;
            player.update();
        }
        console.log(player.distance);
        if(player.distance>3450)
        {
           gameState=2;
           player.rank+=1;
           player.update();
           Player.updateCarsAtEnd(player.rank);
        }
        
      }

      drawSprites();
   }
   end()
   {
    camera.position.x =0;
    camera.position.y = 0;
    imageMode(CENTER);
    Player.getPlayerInfo();  //allPlayers
    console.log("Game Ended");
    fill("red");
    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers)
    {
        //1st: Name1
        if(allPlayers[plr].rank === 1){
            text("1st :  "+allPlayers[plr].name,0,85);
          }
          else if(allPlayers[plr].rank === 2){
            text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
          }
          else if(allPlayers[plr].rank === 3){
            text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
          }

        
    }
   }
}