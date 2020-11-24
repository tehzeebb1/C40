class Player
{
    constructor()
    {
        this.name=null;
        this.distance=0;
        this.index=null;
        this.rank=0;
    }
      getCount()
   {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",function(data){playerCount=data.val();})
   }
   updateCount(count)
   {
    database.ref('/').update({
        playerCount:count
       });
   }

   update(){
    var playerIndex="players/player"+this.index;
    database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        rank:this.rank
    });

   }
   static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })

   }

   playersGone()
   {
    var playerInfoRef = database.ref('players');
    playerInfoRef.remove();
   }
   getCarsAtEnd()
   {
        var carsAtEndRef = database.ref('carsAtEnd');
        carsAtEndRef.on("value",(data)=>{this.rank=data.val();})

   }

   static updateCarsAtEnd(rank)
   {
    database.ref('/').update({
        carsAtEnd:rank
       });
   }
}
