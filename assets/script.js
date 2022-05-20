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
var carousel = document.getElementById('artworkCarousel');

var recentSearches = document.getElementById("localStorage");
var containerElement = document.getElementById("currentSearch");


function getApi() {
    //search Art Insitute Database
    var requestUrl = 'https://api.artic.edu/api/v1/artworks/search?q=' + inputValue.value + "&fields=id,title,image_id,artist_titles,is_on_view";
    console.log(requestUrl);

    var search = inputValue.value;
    localStorage.setItem("recentSearch", search);

    //fetch data via URL
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            carousel.innerHTML = '';

            //loop through data for up to 6 artworks

            for (var i = 0; i < 6; i++) {

            //create title element
                var titleParagraph = document.createElement('p');
                console.log(titleParagraph);

            //create artist name element
                var artistParagraph = document.createElement('p');

            //create element showing whether piece is on view
                var onView = document.createElement('p');

            //populate elements with relevant data
                titleParagraph.textContent = "Title of Piece: " + data['data'][i]['title'];
                artistParagraph.textContent = "Artist: " + data['data'][i]['artist_titles'][0];

                if (data['data'][i]['is_on_view'] === true) {
                    onView.textContent = "This work is currently on view at the Art Insitute of Chicago!"
                }
                else {onView.textContent = "This work is NOT currently on view at the Art Insitute of Chicago."};
                
                //image display 
                var imageURL = data['config']['iiif_url'];
                var imageRetrieve = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";
                var image = document.createElement('img');
                image.src = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";
                console.log(image.src);
                console.log(imageRetrieve);
                console.log(image);

                //display in HTML
                carousel.appendChild(titleParagraph);
                carousel.appendChild(artistParagraph);
                carousel.appendChild(onView);
                carousel.appendChild(image);
                
            }

        });
};

function displaySearch() {
        console.log(localStorage.getItem("recentSearch"));
        var recentSearchBtn = document.createElement('button');
        recentSearchBtn.classList.add('button', 'is-primary', 'is-rounded', 'mt-2');
        recentSearchBtn.textContent = localStorage.getItem("recentSearch");
        recentSearches.appendChild(recentSearchBtn);  

        recentSearchBtn.addEventListener("click", function(){
            inputValue.value = recentSearchBtn.textContent;
        })
};

submitBtn.addEventListener("click", function(){
    getApi();

  //  clear input field
    const searchInput = document.getElementById('inputValue');
    searchInput.value = '';
    displaySearch();
});