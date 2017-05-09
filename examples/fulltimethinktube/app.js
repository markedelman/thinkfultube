


 

var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_LINK_URL = 'https://www.youtube.com/watch?v='

// REQUEST DATA FROM API
// https://developers.google.com/youtube/v3/docs/search/list
// https://developers.google.com/youtube/v3/sample_requests
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyA6GeIpjHP3s746fL5Ee9L6P7iLVMfvEfQ',
      q: searchTerm,
      maxResults: 25
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

// if result is channel

// SHOW SEARCH RESULTS

function displayYouTubeSearchData(data) {
	console.log(data);

  var resultElement = '';
  if (data.items.length > 0) {

	for (var i = 0; i < data.items.length; i++) {
		if (data.items[i].id.videoId)
     resultElement += "<a href='" + YOUTUBE_LINK_URL + data.items[i].id.videoId + "'><p>" + data.items[i].snippet.title + '</p></a>' +
     				  "<a href='" + YOUTUBE_LINK_URL + data.items[i].id.videoId + "'><img src='" + data.items[i].snippet.thumbnails.default.url + "' alt='thumbnail of video'></a>";
    };
  }
  else {
    resultElement += '<p>No results</p>';
  }


  $('.js-search-results').html(resultElement);
 }

// create a div around both the <p> and the <img>
//
//
// create event listener that goes to the source for the div that you clicked


// EVENT LISTENER

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $('.js-search-form').find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});
