const inputField = document.querySelector("#inputValue");
const searchButton = document.querySelector("#search");
const movieDisplay = document.querySelector('#movie-display');



function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img 
                src=${imgUrl + movie.poster_path} 
                data-movie-id=${movie.id}
                />`;
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



function renderSearchMovies(data) {
    movieDisplay.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieDisplay.appendChild(movieBlock);
    console.log('Data: ', data);
}



function handleError(error) {
    console.log('Error: ', error);

}


searchButton.onclick = function (event) {
    event.preventDefault();
    const value = inputField.value;
    searchMovie(value);

    console.log('Value: ', value);

    inputField.value = '';
};


function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}


function createVideoTemplate(data, content) {
    // display the videos
    console.log('Videos: ', data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');



    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}




document.onclick = function (event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        console.log("Image clicked");
        console.log(event);

        const movieId = target.dataset.movieId;
        console.log('MovieId: ', movieId);


        const section = event.target.parentElement; // section containing images
        const content = section.nextElementSibling; // content
        content.classList.add('content-display');


        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        // Fetch the videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);

            });

    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }

};



getUpcomingMovies();
