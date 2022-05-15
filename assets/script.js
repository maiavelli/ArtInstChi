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

function getApi() {
    //search Art Insitute Database
    var requestUrl = 'https://api.artic.edu/api/v1/artworks/search?q=' + inputValue.value + "&fields=id,title,image_id";
    console.log(requestUrl);
    //search Wikipedia Database
    var WikipediaUrl = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=" + inputValue.value;
    console.log(WikipediaUrl);

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

                titleParagraph.textContent = "Title of Piece: " + data['data'][i]['title'];

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
                carousel.appendChild(image);
            }

        });

    //fetch data via URL
    fetch(WikipediaUrl)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);

    });
}

submitBtn.addEventListener("click", getApi);