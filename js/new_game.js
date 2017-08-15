var timing = 100;
if(heroWidth == undefined) var heroWidth = 10;
if(heroHeight == undefined) var heroHeight = 10;

function start()
{
    var chosenHero = getParameterByName("hero");
    //console.log(chosenHero);
    hero.style.backgroundImage = "url('../img/"+chosenHero+".gif')";
}

localStorage.jogo = JSON.stringify({
    pulo:{
        min:2,
        max:62
    },
    timing: timing,
    time: -timing,
    score:{
        pontos:0,
        distance:0,
        gems:0,
        bosses:0,
        enemies:0
    },
    hero:{
        height:heroHeight,
        width:heroWidth,
        top: (62-heroHeight),
        jump:0,
        jumping:false
    }
});

if(localStorage.overall == undefined)
localStorage.overall = JSON.stringify({
    timesPlayed:0,
    highscore:{
        distance:0,
        score:0,
        enemies:0,
        bosses:0,
        time:0,
        bestPlayer:null
    },
    total:{
        distance:0,
        score:0,
        enemies:0,
        bosses:0,
        players:[]
    },
    gems:25
});