var topics = ["NFL", "NBA", "MLB", "NASCAR", "PGA", "X GAMES", "BOXING", "WNBA", "VOLLEYBALL"]; 

function displayInfo(){
  $('#giphyImages').empty();

    var topic = $(this).attr('data-name');
    //var topic = "NFL"; 
    var key = 'sNGG2bIJVRYvZx0DLBDdS69ojKxTTkBj';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=' + key + '&limit=10';

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      

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


// //..................................................................................

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

function addNewButton(){
$("#addGiphy").on("click", function(event) {  
  event.preventDefault();
  
  var sport = $("#giphyInput").val();   // capture input from the form
 
  topics.push(sport);
  renderButtons();
  return false; 
  
});
}

addNewButton(); 
renderButtons(); 
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
$(document).on("dblclick", ".topic", removeButton);  // (to try)..Double-click on button to remove from array. 


renderButtons();