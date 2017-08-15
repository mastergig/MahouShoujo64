if(localStorage.gameEvent == undefined) localStorage.gameEvent = JSON.stringify({eventos:[]});

function addEvento(event, parametro)
{
    var param = localStorage.getItem('gameEvent');
    var eventos = JSON.parse(param);
    eventos = eventos.eventos; //gambiarra

    //console.log(param);
    //console.log(eventos);

    eventos.push({evento:event, parametros:parametro});

    //console.log(eventos);

    localStorage.gameEvent = JSON.stringify({eventos});   
}

function getParameterByName(name, url) {
    if (!url) {
    url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function jogoKeyPress(e)
{
    addEvento("press", e.keyCode);
}

function jogoKeyHold(e)
{
    addEvento("hold", e.keyCode);
}

function jogoKeyRelease(e)
{
    addEvento("release", e.keyCode);
}