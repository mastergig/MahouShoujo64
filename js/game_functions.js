if(localStorage.gameEvent == undefined) localStorage.gameEvent = JSON.stringify({eventos:[]});

function jogoKeyPress(e)
{
    var param = localStorage.getItem('gameEvent');
    var eventos = JSON.parse(param);
    eventos = eventos.eventos; //gambiarra

    //console.log(param);
    //console.log(eventos);

    eventos.push({evento:"press", parametros:e.keyCode});

    //console.log(eventos);

    localStorage.gameEvent = JSON.stringify({eventos});
}

function jogoKeyHold(e)
{
    var param = localStorage.getItem('gameEvent');
    var eventos = JSON.parse(param);
    eventos = eventos.eventos; //gambiarra

    //console.log(param);
    //console.log(eventos);

    eventos.push({evento:"hold", parametros:e.keyCode});

    //console.log(eventos);

    localStorage.gameEvent = JSON.stringify({eventos});
}

function jogoKeyRelease(e)
{
    var param = localStorage.getItem('gameEvent');
    var eventos = JSON.parse(param);
    eventos = eventos.eventos; //gambiarra

    //console.log(param);
    //console.log(eventos);

    eventos.push({evento:"release", parametros:e.keyCode});

    //console.log(eventos);

    localStorage.gameEvent = JSON.stringify({eventos});
}