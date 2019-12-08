const inPutField = document.querySelector("#inputValue");
const searchButton = document.querySelector("#search");
const API_KEY = 'a7026b99934afbac930f68b59ae6c22f';

// searchButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log("Clicked");

// })

searchButton.onclick = function (event) {
    event.preventDefault();
    console.log(inPutField.value);
};