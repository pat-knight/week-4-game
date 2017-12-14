


    var players;
    var game;
    function gameInit(){
         players = start(); // assigning value to players, inside array
         game = resetGame(); 
         renderPlayers();
    }
    //Array of Playable Characters
    function start() { //define all players values
       return {
        'homer': {
            name: "Homer",
            hp: 120,
            attackPower: 8,
            imageUrl: "assets/images/homer.jpg",
            counterAttack: 15
        },
        'grimey': {
            name: "Frank Grimes",
            hp: 100,
            attackPower: 14,
            imageUrl: "assets/images/frank2.jpg",
            counterAttack: 5
        },
        'hank': {
            name: "Hank Scorpio",
            hp: 150,
            attackPower: 14,
            imageUrl: "assets/images/hank.jpg",
            counterAttack: 20
        },
        'mcbain': {
            name: "McBain",
            hp: 180,
            attackPower: 7,
            imageUrl: "assets/images/mcbain.jpg", 
            counterAttack: 25
        },
    }};

    function resetGame(){ //empty keys
        return {
        charSelected: null, //user player
        activeOpp: null, //current opponent
        opponentsLeft: 0,
        attacks: 0
        }
    }

    function createPlayerDiv(players, key){//create character skeleton, fill with players
        var playerDiv = $("<div class='player' data-name='"+ key+"'>");
        var playerName = $("<div class= 'player-name'>").text(players.name);
        var playerImage = $("<img alt='player image' class='player-image'>").attr("src", players.imageUrl);
        var playerHP = $("<div class= 'player-hp'>").text(`HP ${players.hp}`);
        playerDiv.append(playerName);
        playerDiv.append(playerImage);
        playerDiv.append(playerHP);
        return playerDiv;
    }

    function renderPlayers(){
        var keys = Object.keys(players); //filter player array to select player key
        for(var i = 0; i< keys.length; i++){// cycle through player-data
            var playerKey = keys[i];
            var player = players[playerKey]; //create var that holds all player data
            var playerDiv = createPlayerDiv(player, playerKey);//store in div
            $('#character-area').append(playerDiv); //fill div
        }
    }

    function displayOpponents(selectedPlayerKey){
        var playerKeys = Object.keys(players)
        for(var j = 0; j <playerKeys.length; j++){
                if (playerKeys[j] !== selectedPlayerKey){//if player not selected
                    var opponentKey = playerKeys[j];//add opponent key
                    var opponent = players[opponentKey];//fill with player data
                    var opponentDiv = createPlayerDiv(opponent, opponentKey);//create div to fill
                    $(opponentDiv).addClass('opponent');//adding class here to add clickable function, clear leftover opponent divs after a loss
                    $('#enemies-on-deck').append(opponentDiv);//fill on deck section with players not selected
                }
            }
        }

    function enableOpponentSelection(){
         $('.opponent').on('click.enemySelect', function(){//when selecting opponent
            var opponent = $(this).attr('data-name');//store key(data-name) of selected opponent as variable
            game.activeOpp = players[opponent]; //fill activeOpp with selected opponent data
            $('#opponent').append(this);//fill opponent id with opponent class
            $('#attack-button').show(); //display attack button
            $('.opponent').off('click.enemySelect');
        }
    )}

        
    function attack(attacks){
        game.activeOpp.hp -= game.charSelected.attackPower*attacks; //reduce enemy damage by increasing amounts based on turn     
    }

    function defend(){
        game.charSelected.hp -= game.activeOpp.counterAttack;//counter attack selected player
    }

    function checkDefHP(){
        console.log("checking def HP");
        return game.activeOpp.hp <= 0;//check opponent hp, return if <=0
    }

    function checkHP(){
        console.log("check hero hp");
        return game.charSelected.hp <= 0; //check player hp, return if <=0
    }

    function gameStatusCheck(){
        console.log("checking if game won");
        return game.opponentsLeft === 0;//return if no more enemies to fight
    }

    function attackState(){
        if (checkHP()){//selected player dead
            alert("You were beaten by "+ game.activeOpp.name)
            $("#active-player").empty();
            $("#reset-button").show();
            return true;
        } else if (checkDefHP()) {//opponent defeated
            game.opponentsLeft--;
            $("#opponent").empty();
                if(gameStatusCheck()) {//all opponents defeated
                    alert("You Win! Click reset to play again");  
                    $("#reset-button").show();
                } else {//opponents remain
                    alert(`You defeated ${game.activeOpp.name} Select your next opponent.`);
                    enableOpponentSelection();
                }
            return true } //opponent defeated
        return false  }//opponent not defeated
        
        
    

    function clearData(){//clear all created and assigned divs
        $('#opponent').empty();
        $('#enemies-on-deck .opponent').empty();
        $('#character-area').empty();
        $('#active-player').empty();
        $('.opponent').remove();
        $('#select-player').show();
    }  

    $(document).ready(function() {
        $('#character-area').on('click','.player',function(){
            var toPlayer = $(this).attr('data-name');//fill selected player key with data-name
            game.charSelected = players[toPlayer];//define character selected with selected player
            $('#active-player').append(this);//fill active-player div with character
            displayOpponents(toPlayer);//
            $('#select-player').hide();
            game.opponentsLeft = Object.keys(players).length- 1; 
            enableOpponentSelection();
        }
    )
        
        $('#attack-button').on('click.attack',function(){
                    game.attacks++;
                    attack(game.attacks);
                    defend();
                    $('#active-player .player-hp').text(`HP ${game.charSelected.hp}`);
                    $('#opponent .player-hp').text(`HP ${game.activeOpp.hp}`);
                    if(attackState()){$(this).hide();
                }
            }
        )

        $('#reset-button').on('click.reset',function(){
            clearData();
            $(this).hide();
            gameInit()}) //initialize game after reset
     gameInit()}) //initialize game on page ready
