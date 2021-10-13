let movieRepository = (function () {
    
    let movieList = [];
    // const APIKEY = process.env.movieDB_APIKEY;
    const APIURL = '/movies';
    const posterURL = 'https://image.tmdb.org/t/p/w1280';

    function getAll() {
        return movieList;
    }

    function add(movie) {
        if (typeof movie === 'object' && movie.isAdult === false) { 
            movieList.push(movie) 
        }
        else { 
            console.log(`broken or wrong object keys`);
        };
    }

    function loadMovies() {
        return fetch(APIURL)
            .then((response) => { return response.json() })
            .then((json) => {
                json.results.forEach((item) => {
                    // TODO: check these item keys later and maybe get genre ids
                    let movie = {
                        title: item.title,
                        overview: item.overview,
                        posterPath: item.poster_path,
                        isAdult: item.adult,
                        releaseDate: item.release_date,
                        voteAverage: item.vote_average
                    };
                    add(movie);
                });
            })
            .catch((e) => console.error(e));
    };

    function displayMovieCard(movie) {
        const { title, posterPath, voteAverage } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');

        movieEl.innerHTML = `
            <img src="${posterURL + posterPath}" alt="${title}"/>
            <div class="movie-card-info">
                <h2>${title}</h2>
                <span>${voteAverage}</span>
            </div>
        `;

        const mainEl = document.querySelector('main');
        mainEl.appendChild(movieEl);

        // *event listener on whole div or div content? doesn't seem to matter for now.
        addEventListener(movieEl, movie);
    }


    function addEventListener(element, movie) {
        element.addEventListener('click', (event) => showDetails(movie));
    }

    function showDetails(movie) {
        console.log(movie.title);
    }

    // ! Don't fully know how to use async await yet, but might redo promise chains

    return {
        getAll: getAll,
        add: add,
        loadMovies: loadMovies,
        displayMovieCard: displayMovieCard,
        addEventListener: addEventListener,
        showDetails: showDetails,
    }
})(); 

movieRepository.loadMovies()
    .then(() => {
        let list = movieRepository.getAll(); 
        // list.forEach((tempList) => console.log(tempList));

        list.forEach((movie) => movieRepository.displayMovieCard(movie));
    })
    .catch((e) => console.error(e));