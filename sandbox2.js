//Master

$(document).ready(function() { // use also load 
    var catVids = {
        "angry": 'PLPJ6Win2J16JxAcxBB7JF8HlTB2sVIxSK',
        "depressed": 'PLPJ6Win2J16IpfgGE78NiGxDFSN45Nyab',
        "meh": 'PLPJ6Win2J16IbUOsMv1kfcaGS1mHzIuJb',
        "happy": 'PLPJ6Win2J16K4YHKvA7Uzbap__HzKFfBe',
        "zen": 'PLPJ6Win2J16J3T1W4FuyZHZ_5KQxIiw61',
    };

    $("#logo").on("click", function() { // refresh on click 
        location.reload(true);
    });


    var $audio = $("#load").get(0);
    $audio.play(); //play audio on load
    //catheads audio:
    var $Angaudio = $("#angryA")[0];
    $("#angry").mouseenter(function() {
        $Angaudio.play();
    });

    var $Depaudio = $("#deprA")[0];
    $("#depressed").mouseenter(function() {
        $Depaudio.play();
    });

    var $Mehaudio = $("#mehA")[0];
    $("#meh").mouseenter(function() {
        $Mehaudio.play();
    });

    var $Hapaudio = $("#happyA")[0];
    $("#happy").mouseenter(function() {
        $Hapaudio.play();
    });

    var $Zenaudio = $("#zenA")[0];
    $("#zen").mouseenter(function() {
        $Zenaudio.play();
    });


    $("body").on("click", ".YouTubeDialog", function(event) { //youtube dialoge out of a stable component that will remain the same
        $audio.play();
    });


    // $(".catBtn").YouTubePopup(options); //its calling a function for all cat btn.
    $(".catBtn").on("click", function(event) { //event is a built in paramiter           
        $audio.pause(); // Pause audio

        var element = $(event.currentTarget); //el is the el that user clicks on the page, currentTarget is the click, saving it in a variable cuz wrapin in jQuery
        var catEmotion = element.attr('id'); //value of the html ellements attr--jQuery method, gets value of atribute from HTML el
        var playlistId = catVids[catEmotion];

        $.ajax({ //asycrines request 
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            data: {
                key: "AIzaSyByFm-OuI4hOWtliUY86mjd9HO4rA2L54E",
                part: "snippet", //you tube wierdnes 
                playlistId: playlistId, //passing what playlis I want 
            },
            success: function(data) {
                var items = data.items;
                var randomIndex = Math.floor(Math.random() * items.length); // random number from array, floor--rounds down, 
                var item = items[randomIndex]; //grab one random item
                var vidId = item.snippet.resourceId.videoId; //we have the item and we extract the video id (did it in the consol)

                popupVid(vidId); //calling and passing the vieo id 
            },
            error: function(jqXHR, textStatus, errorThrown) { // if there was a problem it would send back the error (Ellie helped me with this part)
                alert(textStatus, +' | ' + errorThrown);
            }
        });

    });

    function popupVid(vidId) {


        var options = { //setings for the video player 
            youtubeId: vidId,
            'autoplay': 1
        };
        var tempPlayer = $('<span></span>'); // you can make html using jquery, span wraps text and styles it.
        $('body').append(tempPlayer); //grabing body and ading new ellement, appending to the botom of my body,
        tempPlayer.YouTubePopup(options).click(); // adding the plugin to the new temp el, passing in my defined options  
        //I want the function to include math random 
    } // this resolved the issue of calling the plugin on the same el multiple times, it allowed it. 
    //  $("img.youtube").YouTubePopup({ idAttribute: 'id' });

});
