const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

//Función asíncrona
async function getMovies(url) {
    //Función fetch realiza una solicitud HTTP a la URL especificada. await se utiliza para esperar a que la solicitud se complete antes de continuar. El resultado de la solicitud se almacena en la constante res.
    const res = await fetch(url)
    //El método .json() extrae los datos en formato JSON. await se utiliza para esperar a que se complete esta operación. Los datos JSON se almacenan en la constante data
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    
    main.innerHTML = ''
    movies.forEach((movie) => {
        //destruccion de objetos
        const {title, backdrop_path, release_date, vote_average, overview} = movie

        
        //crea el elemento div dentro del main
        const movieElement = document.createElement('DIV')
        //agrega la clase movie al div
        movieElement.classList.add('movie')

        //Agrega dentro del div
        movieElement.innerHTML = `
            <img src="${IMG_PATH + backdrop_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <p>${release_date}</p>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Description</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElement)
        
    });

}

function getClassByRate(vote) {
    if(vote >= 8) return 'green'
    else if(vote >= 5) return 'orange'
    else return 'red'
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})