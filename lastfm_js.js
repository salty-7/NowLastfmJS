function init(){
    get_cookies();
    get_nowplaying();
}

function get_nowplaying(){
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function()
    {
        if( this.readyState == 4 && this.status == 200 )
        {
            if( this.response )
            {
                var kekka = document.getElementById('kekka');
                var trackname = this.response.recenttracks.track[0].name;
                var artistname = this.response.recenttracks.track[0].artist["#text"];
                kekka.value = "🎶Nowplaying: " + trackname + " / " + artistname;
            }
        }
    }
    
    var username = document.getElementById('username').value;
    var api_key = document.getElementById('apikey').value;
    xmlHttpRequest.open( 'GET', 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=' + api_key + '&format=json&limit=1', true );
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send( null );
}

function post(){
    window.location.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.getElementById('kekka').value);
}

function get_cookies(){
    var cookies = document.cookie.split(';');
    cookies.forEach(function(record){
        var cols = record.trim().split('=');
        if(cols[0] == 'username'){
            document.getElementById('username').value = cols[1];
        }
        if(cols[0] == 'apikey'){
            document.getElementById('apikey').value = cols[1];
        }
    });
}

function save_cookies(){
    var datetime = new Date();
    datetime.setDate(datetime.getDate() + 90);
    var option = ';SameSite=Lax;Path=/;expires=' + datetime.toUTCString();
    if(document.getElementById('username') != ""){
        document.cookie = 'username=' + encodeURIComponent(document.getElementById('username').value) + option;
    }
    if(document.getElementById('apikey') != ""){
        document.cookie = 'apikey=' + encodeURIComponent(document.getElementById('apikey').value) + option;
    }
}
