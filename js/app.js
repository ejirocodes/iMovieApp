const inPutField = document.querySelector("#inputValue");
const searchButton = document.querySelector("#search");
const API_KEY = 'a7026b99934afbac930f68b59ae6c22f';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=a7026b99934afbac930f68b59ae6c22f';

// searchButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log("Clicked");

// })

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = inPutField.value;


    const dynamicUrl = url + '&query=' + value;


    fetch(dynamicUrl)
        .then((res) => res.json())
        .then((data) => {
            console.log('Data: ', data);
        })
        .catch((error) => {
            console.log('Error: ', error);

        });

    console.log('Value: ', value);

};