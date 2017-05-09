let endPoint = 'https://www.googleapis.com/youtube/v3/search';
let resultLink = 'https://www.youtube.com/watch?v=';

const getDataFromApi = (searchTerm, callback) => {
    var settings = {
        url: endPoint,
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
};

const displayYouTubeSearchData = (data) => {
    console.log(data);

    let resultElement = '';
    if (data.items.length > 0) {

        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].id.videoId)
                resultElement +=
                `<a href = ${resultLink} ${data.items[i].id.videoId}>
                <p>${data.items[i].snippet.title}</p></a>
                <a href=${resultLink} ${data.items[i].id.videoId}>
                <img src=${data.items[i].snippet.thumbnails.default.url}
                alt='thumbnail of video'></a>`;
        }
    } else {
        resultElement += '<p>No results</p>';
    }
    $('.js-search-results').html(resultElement);
};

const watchSubmit = () => {
    $('.js-search-form').submit(function(e) {
        e.preventDefault();
        var query = $('.js-search-form').find('.js-query').val();
        console.log(query);
        getDataFromApi(query, displayYouTubeSearchData);
    });
};

$(() => {
    watchSubmit();
});

// REQUEST DATA FROM API
// https://developers.google.com/youtube/v3/docs/search/list
// https://developers.google.com/youtube/v3/sample_requests
