var submitBtn = document.getElementById('submitBtn');
var inputValue = document.getElementById('input-val');

function getApi() {
    var requestUrl = 'https://api.artic.edu/api/v1/artworks/search?q=' + inputValue.value;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

submitBtn.addEventListener("click", getApi);