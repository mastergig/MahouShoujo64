var jumping = false;
var shooting = false;
var boss = false;
var paused = false;
var enemegoWait = 5;
var jump = 1.5;
var queda = 1;
var speed = 2;
var charge = 0;

function readRun() //run the game by the time
{
    var JSONstr = localStorage.getItem('jogo'); 
    //console.log(JSONstr);
    var gameParameters = JSON.parse(JSONstr);

    //read events
    JSONstr = localStorage.getItem('gameEvent'); 
    var gameEvents = JSON.parse(JSONstr);
    var fixEvents = []; //return of events
    var firedEvents = []; //gambiarra to not repeat events
    var ev = null;
    for(var i = gameEvents.eventos.length; i > 0; i--)
    {
        ev = gameEvents.eventos[i-1];

        if(!firedEvents.includes(ev.parametros))
        {
            var trigger = false;
            if(ev.evento == "release")
            {
                trigger = eventoRelease(ev.parametros);
            }
            else
            if(ev.evento == "hold")
            {
                trigger = eventoHold(ev.parametros);
                if(trigger) fixEvents.push(ev.evento);
            }
            else
            if(ev.evento == "press")
            {
                trigger = eventoPress(ev.parametros);
            }
            if(trigger) firedEvents.push(ev.parametros);
        }
    }
    //console.log(gameEvents);

    if(!paused)
    {
        //
        calcHero();
        calcBullets();
        calcEnemy();
        calcDamage();
        moveStage();

        charge--;

        //time goes by...
        gameParameters.time += gameParameters.timing;
    }

    //UPDATE PARAMETERS
    localStorage.jogo = JSON.stringify( gameParameters );
    localStorage.gameEvent = JSON.stringify( {eventos:fixEvents} );

    setTimeout(function(){ readRun(); }, gameParameters.timing);
}

function eventoRelease(param)
{
    var ret = false;
    if(param == 32)
    {
        jumping = false;
        ret = true;
    }
    
    if(param == 90 || param == 122)
    {
        shooting = false;
        ret = true;
    }

    return ret;
}

function eventoHold(param)
{
    var ret = false;
    if(param == 32)
    {
        jumping = true;
        ret = true;
    }
    
    if(param == 90 || param == 122)
    {
        shooting = true;
        ret = true;
    }
    return ret;
}

function eventoPress(param)
{
    var ret = false;
    
    if(param == 80 || param == 112)
    {
        paused = !paused;
        special.className = (paused)?"layer paused":"layer";
        special.style.backgroundImage = 'none';
        if(paused) special.style.backgroundImage = 'url(../img/pause.gif)';
        ret = true;
    }

    //console.log(param);
    return ret;
}

function calcHero()
{
    var pulo = hero.offsetTop;
    if(jumping)
    {
        if(pulo > 2) pulo -= jump;
        queda = 0;
        hero.style.top = pulo;
    }
    else
    {
        if(pulo < 44) pulo += queda;
        else pulo = 44;
        if(pulo > 46) pulo = 46;
        queda++;
        hero.style.top = pulo;
    }
}
function moveStage()
{
    var bgs = document.getElementsByClassName("bg");
    var fgs = document.getElementsByClassName("fg");

    for (i = 0; i < bgs.length; i++) {
        var bgI = bgs[i];
        var posX = bgI.offsetLeft;

        if(posX <= -256)
        {
            posX+=512;
            //bgI.className = 'bg ty';
        }
        //console.log(bgI);

        bgI.style.left = posX - speed;
    }
    
    for (i = 0; i < fgs.length; i++) {
        var fgI = fgs[i];
        var posX = fgI.offsetLeft;

        if(posX <= -256) posX+=512;
        //console.log(fgI);

        fgI.style.left = posX - speed;
    }
}

function calcBullets()
{
    
    if(charge <= 0 && shooting)
    {
        charge = 3;

        var stX = hero.offsetLeft+(hero.offsetWidth/2);
        var stY = hero.offsetTop+(hero.offsetHeight/2);
        var strDiv = "<div class='shot' style='top:"+stY+"; left:"+stX+"'></div>";

        action.innerHTML += strDiv;
    }

    var bullets = document.getElementsByClassName("shot");
    
    if(bullets.length > 0) for (i = 0; i < bullets.length; i++) {
        var shot = bullets[i];
        var posX = shot.offsetLeft;
        
        shot.style.left = posX + (speed *2);
        if(shot.offsetLeft >= (64+shot.offsetWidth)) shot.parentElement.removeChild(shot);
    }
}

function calcEnemy()
{
    if(enemegoWait <= 0 && !boss)
    {
        enemegoWait = Math.floor((Math.random() * 10) + 10);

        //corrigir
        var stX = 64;//hero.offsetLeft+(hero.offsetWidth/2);
        var stY = Math.floor((Math.random() * (60-9)) + 2);//hero.offsetTop+(hero.offsetHeight/2);
        var strDiv = "<div class='enemy' life=1 style='top:"+stY+"; left:"+stX+"'></div>";

        action.innerHTML += strDiv;
    }

    var enemies = document.getElementsByClassName("enemy");
    
    if(enemies.length > 0) for (i = 0; i < enemies.length; i++) {
        var enemego = enemies[i];
        var posX = enemego.offsetLeft;

        enemego.style.left = posX - speed;
        if(enemego.offsetLeft <= -(64+enemego.offsetWidth)) enemego.parentElement.removeChild(enemego);
        if(enemego.getAttribute('life') <= 0) enemego.parentElement.removeChild(enemego);
    }

    enemegoWait--;
}

function calcDamage()
{
    var enemies = document.getElementsByClassName("enemy");
    var bullets = document.getElementsByClassName("shot");

    if(enemies.length > 0) for (i = 0; i < enemies.length; i++) {
        var enemego = enemies[i];
        var enX = enemego.offsetLeft;
        var enY = enemego.offsetTop;
        var enW = enemego.offsetWidth;
        var enH = enemego.offsetHeight;

        if(bullets.length > 0) for (j = 0; j < bullets.length; j++) {
            var shot = bullets[j];
            var shotX = shot.offsetLeft;
            var shotY = shot.offsetTop;
            var shotW = shot.offsetWidth;
            var shotH = shot.offsetHeight;

            var se4 = (shotX >= enX) && ((shotX+shotW) <= (enX+enW));
            
            var se1 = (se4) && ( enY <= (shotY+shotH) && enY >= shotY);
            var se2 = (se4) && ( shotY <= (enY+enH) && shotY >= enY );

            if( se1 || se2 )
            {
                enemego.setAttribute('life',(enemego.getAttribute('life')-1));
                shot.parentElement.removeChild(shot);
            }

            //if(enemego.getAttribute('life') <= 0) enemego.parentElement.removeChild(enemego);
        }
    }
} 