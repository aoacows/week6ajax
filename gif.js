$(document).ready(function(){
    var topics = ['Maplestory', 'Runescape', 'world of warcraft', 'league of legends', 'Terraria', 'Minecraft', 'pokemon', 'final fantasy'];

    // Pokemon populates the page with only the anime... tried to get the games but alas...

 
    function helpItsAButton(){
        $('#butonButton').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('myGamesBtn');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#butonButton').append(a);
        }
    }    
    helpItsAButton();
   

  $(document).on('click', '.myGamesBtn', function() {

    var games = $(this).html(); 
    console.log(games);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + games + "&api_key=PzYEubnyAKaMYAY0PlrNHSXNo61t4kmc";
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            var results = response.data;
            $('#view').empty();
                for ( var G=0; G < results.length; G++) {
                    var imageDiv = $('<div>');
                    var imageView = results[G].images.fixed_height.url;
                    var still = results[G].images.fixed_height_still.url;
                    var imageGif = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    imageGif.attr('data-state', 'still');
                    $('#view').prepend(imageGif);
                    imageGif.on('click', playGif);
                    
                        var rating = results[G].rating;
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#view').prepend(displayRated);
            
                } 
        });

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 
                
    }) 

       


$(document).on('click', '#addGif', function(){
    if ($('#user-input').val().trim() == ''){
      alert('please add games');
   }
   else {
    var games = $('#user-input').val().trim();
    topics.push(games);
    $('#user-input').val('');
    helpItsAButton();
    return false;

    }

});



});