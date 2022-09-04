const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=656d345303e4ed998e12690a8caffb0c&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL= "https://api.themoviedb.org/3/search/movie?api_key=656d345303e4ed998e12690a8caffb0c&query='"

const SEARCH_FORM = document.querySelector('#search-form');

const SEARCH_INPUT = document.querySelector('#search-input');

const SHOWING_MOVIES = document.querySelector('#showing-movies');


//get homepage movies

fetchFilms(API_URL)

async function fetchFilms(url) {
    const response = await fetch(url)
    const data = await response.json()
  
    showMovies(data.results)
    console.log(data.results)


}

function showMovies(movies) {
    SHOWING_MOVIES.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie;

         const movieEl = document.createElement('div');
         movieEl.classList.add('mov');

         movieEl.innerHTML = 
                `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="mov-box-label">
                    <h3>${title}</h3>
                    <span class="${ratingColors(vote_average)}">${vote_average}</span>
                </div>
                <div class="mov-synops">
                    <h3>Synopsis</h3>
                    <p class="mov-details">
                        ${overview}
                    </p>
                </div>
            `

        SHOWING_MOVIES.appendChild(movieEl)

        
    })
}



function ratingColors(vote) {
    if(vote >= 7.5) {
        return 'blue'
    } else if (vote >= 5) {
        return 'yellow'
    } else {
        return 'red'
    }
}


SEARCH_FORM.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchQuery = SEARCH_INPUT.value;

    if (searchQuery && searchQuery !== '') {
        fetchFilms(SEARCH_URL + searchQuery)

        SEARCH_INPUT.value = ''
    } else {
        window.location.reload()
    }
}
)

