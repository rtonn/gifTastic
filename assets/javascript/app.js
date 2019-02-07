

var topics = ["NFL", "NBA", "MLB", "NASCAR", "PGA", "X GAMES"]; 

//.............................................................................

//.................................................................................

function displayInfo(){
    $('#giphyImages').empty();

    var topic = $(this).attr('data-name');
    var key = 'kqv2mlxBrHnbU36vuWhuQaFlgrtBTsAD';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=' + key + '&limit=10';

   
    $.ajax({                        // AJAX call....
      url: queryURL,
      method: "GET"
    }).then(function(response) {      
      
        if (response.pagination.total_count == 0) {
            alert('Sorry, there are no Gifs for this topic');
            var itemindex = topics.indexOf(topic);
     
        if (itemindex > -1) {
          topics.splice(itemindex, 1);
          renderButtons();
          }
      }
      
      
      var results = response.data;     // Save response from API JSON to a variable results....
        
        for (var j = 0; j < results.length; j++){ 

        var newTopicDiv = $("<div class='sport-name'>");  // Create new Div
  
        var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());     
        var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());       
        var gifURL = results[j].images.fixed_height_still.url;         
        var gif = $('<img>');
            gif.attr('src', gifURL);
            gif.attr('data-still', results[j].images.fixed_height_still.url);
            gif.attr('data-animate', results[j].images.fixed_height.url);
            gif.attr('data-state', 'still');
            gif.addClass ('animate-gif');
        
        newTopicDiv.append(pRating);   // Append info.... 
        newTopicDiv.append(pTitle);
        newTopicDiv.append(gif);
         
        $('#giphyImages').prepend(newTopicDiv); // Put saved info to new div
      } 
    });
};


//..................................................................................

function renderButtons() {
    $('.buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");          // create button
        b.addClass("topic");            // add class  ("topic")
        b.addClass("btn btn-info");   // add class for style
        b.attr("data-name", topics[i]); // add a data-attribute
        b.attr("type", "button");       // need this attribute for bootstrap
        b.text(topics[i]);              // button text, getting from topics array string

        $('.buttons-view').append(b);   // insert button to HTML (under DIV "giphyButtons")
    }
} 

//renderButtons(); 

//..................................................................................

function removeButton(){
    $("#giphyImages").empty();
    var topic = $(this).attr('data-name');
    var itemindex = topics.indexOf(topic);
    if (itemindex > -1) {
      topics.splice(itemindex, 1);
      renderButtons();
    }
}

//...................................................................................

$("#addGiphy").on("click", function(event) {
    event.preventDefault();
    
    var hero = $("#hero-input").val().trim();   // capture input from the form
   
    if (topics.toString().toLowerCase().indexOf(hero.toLowerCase()) != -1) {  // check if topic exsits already
      alert("Topic already exists");
    }
    else {
      topics.push(hero);
      renderButtons();
    }
  });

  
//..................................................................................

function playGif () {                               //animate gifs
    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }
    else {
      $(this).attr('src' , $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
}

//..................................................................................
  
  $(document).on("click", ".topic", displayInfo);   // Click on button to display Gifs and other info from API
  $(document).on("click", ".animate-gif", playGif); //Click on image to animate or make it still  
  //$(document).on("dblclick", ".topic", removeButton);  // (to try)..Double-click on button to remove from array. 

 
renderButtons();


//  create a "string" array of topics

//  have app create a button for each topic in array
//  * try using a loop that appends a button for each string in the array

//  when button clicked, grab 10 static gifs from GIPHY API and display on page

//  display gif rating (pg, g, etc.)

//  animate gifs when clicked

// ...........................

// add a form to take value from user input box and adds to `topics` array. 
// Then make function call that takes each topic in the array remakes the buttons on the page.

