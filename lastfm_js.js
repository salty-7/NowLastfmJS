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
    
    xmlHttpRequest.open( 'GET', 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=<ユーザ名>&api_key=<APIキー>&format=json&limit=1', true );
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send( null );
}

function post(){
    window.location.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.getElementById('kekka').value);
}