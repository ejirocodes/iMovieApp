const inPutField = document.querySelector("#inputValue");
const searchButton = document.querySelector("#search");
const API_KEY = 'a7026b99934afbac930f68b59ae6c22f';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=a7026b99934afbac930f68b59ae6c22f';
const movieDisplay = document.querySelector('#movie-display');
const imgUrl = 'https://image.tmdb.org/t/p/w400';


function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `
                <img src=${imgUrl + movie.poster_path} data-movie-id=${movie.id}/>
                `;
        } 


    });
}


function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="movie-section">
            ${ movieSection(movies)}
        </section>
        <div class="content">
          <p id="content-close"> X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}



searchButton.onclick = function (event) {
    event.preventDefault();
    const value = inPutField.value;


    const dynamicUrl = url + '&query=' + value;


    fetch(dynamicUrl)
        .then((res) => res.json())
        .then((data) => {
            const movies = data.results;
            const movieBlock = createMovieContainer(movies);
            movieDisplay.appendChild(movieBlock);
            console.log('Data: ', data);
        })
        .catch((error) => {
            console.log('Error: ', error);

        });

    console.log('Value: ', value);

};