


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
        var keys = Object.keys(players);
        for(var i = 0; i< keys.length; i++){
            var playerKey = keys[i];
            var player = players[playerKey];
            var playerDiv = createPlayerDiv(player, playerKey);
            $('#character-area').append(playerDiv);
        }
    }

    function renderOpponents(selectedPlayerKey){
        var playerKeys = Object.keys(players)
        for(var j = 0; j <playerKeys.length; j++){
                if (playerKeys[j] !== selectedPlayerKey){
                    var opponentKey = playerKeys[j];
                    var opponent = players[opponentKey];
                    var opponentDiv = createPlayerDiv(opponent, opponentKey);
                    $(opponentDiv).addClass('opponent');
                    $('#available-to-attack-section').append(opponentDiv);
                }
            }
        }

    function enableOpponentSelection(){
         $('.opponent').on('click.enemySelect', function(){
            var opponent = $(this).attr('data-name');
            game.activeOpp = players[opponent];
            $('#opponent').append(this);
            $('#attack-button').show();
            $('.opponent').off('click.enemySelect');
        }
    )}

        
    function attack(attacks){
        game.activeOpp.hp -= game.charSelected.attackPower*attacks;      
    }

    function defend(){
        game.charSelected.hp -= game.activeOpp.counterAttack;
    }

    function checkDefHP(){
        console.log("checking def HP");
        return game.activeOpp.hp <= 0;
    }

    function checkHP(){
        console.log("check hero hp");
        return game.charSelected.hp <= 0; 
    }

    function gameStatusCheck(){
        console.log("checking if game won");
        return game.opponentsLeft === 0;
    }

    function attackState(){
        if (checkHP()){
            alert("You were beaten by "+ game.activeOpp.name)
            $("#active-player").empty();
            $("#reset-button").show();
            return true;
        } else if (checkDefHP()) {
            game.opponentsLeft--;
            $("#opponent").empty();
                if(gameStatusCheck()) {
                    alert("You Win! Click reset to play again");  
                    $("#reset-button").show();
                } else {
                    alert(`You defeated ${game.activeOpp.name} Select your next opponent.`);
                    enableOpponentSelection();
                }
               return true } 
              return false  }
        
        
    

    function clearData(){//clear all created and assigned divs
        $('#opponent').empty()
        $('#available-to-attack-section .opponent').empty()
        $('#character-area').empty()
        $('#active-player').empty()
        $('#characters-section').show()
    }  

    $(document).ready(function() {
        $('#character-area').on('click','.player',function(){
            var selectedKey = $(this).attr('data-name');
            game.charSelected = players[selectedKey];
            $('#active-player').append(this);
            renderOpponents(selectedKey);
            $('#characters-section').hide();
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
            gameInit()})
            gameInit()}) 
