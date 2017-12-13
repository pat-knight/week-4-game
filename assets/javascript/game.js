


    var players;
    var game;
    function gameInit(){
        console.log("game init");
         players = playerReset();
         game = resetGame();
         renderPlayers();
    }
    //Array of Playable Characters
    function playerReset() { //render all characters
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

    function resetGame(){
        return {
        charSelected: null,
        activeDef: null,
        opponentsLeft: 0,
        attacks: 0
        }
    }

    function createPlayerDiv(players, key){
        console.log("creatCharDiv");
        var playerDiv = $("<div class='character' data-name='"+ key+"'>");
        var playerName = $("<div class= 'character-name'>").text(players.name);
        var playerImage = $("<img alt='player image' class='character-image'>").attr("src", players.imageUrl);
        var playerHP = $("<div class= 'character-health'>").text(`HP ${players.hp}`);
        playerDiv.append(playerName);
        playerDiv.append(playerImage);
        playerDiv.append(playerHP);
        return playerDiv;
    }

    function renderPlayers(){
        console.log("rendering char");
        var keys = Object.keys(players);
        for(var i = 0; i< keys.length; i++){
            var playerKey = keys[i];
            var player = players[playerKey];
            var playerDiv = createPlayerDiv(player, playerKey);
            $('#character-area').append(playerDiv);
        }
    }

    function renderOpponents(selectedPlayerKey){
        console.log("rendering opp");
        var playerKeys = Object.keys(players)
        for(var j = 0; j <playerKeys.length; j++){
                if (playerKeys[j] !== selectedPlayerKey){
                    var opponentKey = playerKeys[j];
                    var opponent = players[opponentKey];
                    var opponentDiv = createPlayerDiv(opponent, opponentKey);
                    $(opponentDiv).addClass('enemy');
                    $('#available-to-attack-section').append(opponentDiv);
                }
            }
        }

    function enableOpponentSelection(){
         $('.enemy').on('click.enemySelect', function(){
            console.log('opponent selected');
            var opponent = $(this).attr('data-name');
            game.activeDef = players[opponent];
            $('#defender').append(this);
            $('#attack-button').show();
            $('.enemy').off('click.enemySelect');
        }
    )}

        
    function attack(attacks){
        game.activeDef.hp -= game.charSelected.attackPower*attacks;
        
    }
    function defend(){
        game.charSelected.hp -= game.activeDef.counterAttack;
    }
    function checkDefHP(){
        console.log("checking def HP");
        return game.activeDef.hp <= 0;
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
            alert("You were beaten by "+ game.activeDef.name)
            $("#selected-character").empty();
            $("#reset-button").show();
            return true;
        } else if (checkDefHP()) {
            console.log("defender dead");
            game.opponentsLeft--;
            $("#defender").empty();
                if(gameStatusCheck()) {
                    alert("You Win! Click reset to play again");  
                    $("#reset-button").show();
                } else {
                    alert(`You defeated ${game.activeDef.name} Select your net oppopnent.`);
                    enableOpponentSelection();
                }
               return true } 
              return false  }
        
        
    

    function emptyDivs(){
        $('#defender').empty()
        $('#available-to-attack-section .enemy').empty()
        $('#character-area').empty()
        $('#selected-character').empty()
        $('#characters-section').show()
    }  

    $(document).ready(function() {
        $('#character-area').on('click','.character',function(){
            var selectedKey = $(this).attr('data-name');
            game.charSelected = players[selectedKey];
            console.log('player selected');
            $('#selected-character').append(this);
            renderOpponents(selectedKey);
            $('#characters-section').hide();
            game.opponentsLeft = Object.keys(players).length- 1
            enableOpponentSelection();
        }
    )
        
        $('#attack-button').on('click.attack',function(){
                    console.log('attack clicked');
                    game.attacks++;
                    attack(game.attacks);
                    defend();
                    $('#selected-character .character-health').text(`HP ${game.charSelected.hp}`);
                    $('#defender .character-health').text(`HP ${game.activeDef.hp}`);
                    if(attackState()){$(this).hide();
                }
            }
        )

        $('#reset-button').on('click.reset',function(){
            console.log('resetting game')
            emptyDivs();
            $(this).hide();
            gameInit()})
            gameInit()}) 
