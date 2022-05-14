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

                titleParagraph.textContent = "title of piece: " + data['data'][i]['title'];
            
            //image display 
                //var imageURL = data['config']['iiif_url'];
                //var imageRetrieve = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";
                //var image = document.createElement('image');
                //image.src = imageURL + "/" + data['data'][i]['image_id'] + "/full/843,/0/default.jpg";

            //display in HTML
                artworkInfo.appendChild(titleParagraph);
                //artworkInfo.appendChild(image);
            }

            //image display 
            var imageURL = data['config']['iiif_url'];
            console.log(imageURL);

            var imageRetrieve = imageURL + "/" + data['data'][0]['image_id'] + "/full/843,/0/default.jpg";
            console.log(imageRetrieve);
            document.getElementById('imageOfPiece').src = imageRetrieve;

        });
}


submitBtn.addEventListener("click", getApi);

var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

var userInput;

function setup() {
    noCanvas();
    userInput = select('#userinput');
    userInput.changed(goWiki);
    goWiki();

    function goWiki() {
        var term = userInput.value();
        var url = searchUrl + term;
        loadJSON(url, gotData, 'jsonp');
    }
    
    function gotSearch(data){
        console.log(data);
        var len = data [1].length;
        var index = floor(random(len));
        var title = data[1][0];
        title = title.replace(/\s+/g, '_');
        createP(title);
        console.log('Querying: ' + title);
        var url = contentUrl + title;
        loadJSON(url, gotContent, 'jsonp');
    }

    function gotContent(data){
        var page = data.query.pages;
        var pageId = Object.keys(data.query.pages)[0];
        console.log(pageId);
        var content = page[pageId].revisions['*'];
        console.log(content);
        var wordRegex = /\w{4,}/;
        content.match(wordRegex);
    }
}
