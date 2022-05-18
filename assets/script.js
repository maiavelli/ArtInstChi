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


    //search Wikipedia Database
    //var WikipediaUrl = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=" + inputValue.value;
    //console.log(WikipediaUrl);

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
    //fetch data via URL
    //fetch(WikipediaUrl)
    //   .then(function (response) {
     //       return response.json();
       // })

        //.then(function (data) {
      //      console.log(data);

      //  });
//}

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
<<<<<<< HEAD
    const searchInput = document.getElementById('inputValue');

  //  clear input field
    searchInput.value = '';
    displaySearch();
});
//submitBtn.addEventListener("click", displaySearch());
=======

    const searchInput = document.getElementById('inputValue');
  // Send value to server
  console.log(searchInput.value);
  //  clear input field
  searchInput.value = '';
});

    // displaySearch();


// //display users choices on screen as list items
// function displaySearch() {
//     listOfArtworkSearches.classList.add("card");
//     var valueSearched = document.getElementById("userSearch").value;
//     //created an array to hold inputs, add the OR statement because if there isnt anything in the array, returns undefined
//     searchArray = JSON.parse(localStorage.getItem("searchedArtwork")) || [];

//     // if a searched input is already in the search history, don't add new search to history again
//     if (!searchArray.includes(valueSearched)) {
//         searchArray.push(valueSearched);
//     } else {
//         searchArray
//     }

//     //setting the array to local storage to save it
//     localStorage.setItem("searchedArtwork", JSON.stringify(searchArray));
//     listOfArtworkSearches.innerHTML = '';
//     //for each item in the Array (from local storage), creating elements and appending it to an existing parent div from the html page, which was declared at the top of the file page
//     searchArray.forEach(function (searchName) {
//         var listItem = document.createElement('a');
//         listItem.classList.add("list-group-item");
//         listItem.classList.add("btn");

//         var ulItem = document.createElement('ul');
//         ulItem.classList.add("list-group");
//         ulItem.append(listItem);

//         listItem.textContent = searchName;
//         listItem.value = searchName;

//         listOfArtworkSearches.append(ulItem);

//         listItem.addEventListener("click", function (event) {
//             console.log("clicked search history")
//             var artworkpicked = event.target.value;
//             console.log(artworkpicked);
//             let valueSearched = artworkpicked;
//             getAPI(valueSearched);
//         })
//     });

// };
>>>>>>> d605d5dad2b7231048a2345c97b0afda849823df
