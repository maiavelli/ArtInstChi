//global variables
//search form variables
var inputValue = document.getElementById('inputValue');
var submitBtn = document.getElementById('submitBtn');

var searchBar = document.getElementById('searchBar');
var submitWBtn = document.getElementById('submitWBtn');

//artwork info section variables
var titleOfPieceEl = document.getElementById('titleOfPiece')
var thumbnailEl = document.getElementById('thumbnail')
var artworkInfo = document.getElementById('artworkInfo');


//search Art Insitute Database
function getApi() {
    var requestUrl = 'https://api.artic.edu/api/v1/artworks/search?q=' + inputValue.value + "&fields=id,title,image_id";
    console.log(requestUrl);

//fetch data via URL
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);

        //loop through titles for up to 6 artworks
            for (var i = 0; i < 6; i++) {

                var titleParagraph = document.createElement('p');
                console.log(titleParagraph);

                titleParagraph.textContent = "title of piece: " + data['data'][i]['title'];
            
            //image display 
                var imageURL = data['config']['iiif_url'];
                var imageRetrieve = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";
                var image = document.createElement('img');
                image.src = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";
                console.log(image.src);
                console.log(imageRetrieve);
                console.log(image);

            //display in HTML
                artworkInfo.appendChild(titleParagraph);
                artworkInfo.appendChild(image);
            }

            //image display 
            //var imageURL = data['config']['iiif_url'];
            //console.log(imageURL);

            //var imageRetrieve = imageURL + "/" + data['data'][0]['image_id'] + "/full/843,/0/default.jpg";
            //console.log(imageRetrieve);
            //document.getElementById('imageOfPiece').src = imageRetrieve;

        });
}

submitBtn.addEventListener("click", getApi);





var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&gsrsearch="

// var cb = '&callback=JSON_CALLBACK';
var url = ''; // Set url from outside addEventListener function

submitWBtn.addEventListener('click', function(e) { // Listen for click on submit button

    $("#searchResults").empty(); // Clear search results

    e.preventDefault(); // Prevent default behavior of submit button

    if (searchBar.value === '') { // If search bar is empty
        searchBar.classList.add('animated', 'shake', 'alert'); // Add the alert class

        setTimeout(function() { // Remove alert after animation complete
            searchBar.classList.remove('animated', 'shake', 'alert');
        }, 750);
    }

    else {

        var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, '_') + "%27"; // Replace whitespaces with underscores

        // console.log(apiUrl);
        // console.log('User Query:', searchBar.value); // Log the users search query
        searchBar.value = ''; // Clear search bar
        url = apiUrl; // Set url to apiUrl
        searchResults(apiUrl); // Call searchResults, passing in the apiUrl

    }

});

function searchResults(url) {

    $.ajax({
        url: url,
        success: function(result) {

            //console.log('Result:', result); // Returns full result object
            //console.log('Pages:', result.query.pages); // Returns result pages within result object

            for (var i in result.query.pages) { // Loop through all pages within result object

                // console.log(result.query.pages[i].title);
                var searchResults = document.getElementById('searchResults');
                var resultsLi = document.createElement('li'); // Create li element for all page titles

                resultsLi.className = 'singleResult'; // Add class to all li elements
                resultsLi.style.display = 'none'; // Hide li by default
                resultsLi.innerHTML = '<p>' + result.query.pages[i].title.toLowerCase() + '</p>'; // Add title text to lis
                searchResults.appendChild(resultsLi); // Append lis to searchResults div

                $(resultsLi).wrap(function() { // Wrap li with corresponding wiki url
                    return '<a target="_blank" href="https://en.wikipedia.org/wiki/' + result.query.pages[i].title + '"></a>';
                });

                $(resultsLi).fadeIn(1000); // Fade in hidden lis
            }

        }
    });
};