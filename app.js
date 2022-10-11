const searchBox = document.getElementById('searchBox')
const moviesList = document.getElementById('moviesList')
const btnSearch = document.getElementById('btnSearch')



btnSearch.addEventListener('click', function(){
    let movie = searchBox.value
    const url = `http://www.omdbapi.com/?s=${movie}&apikey=274d673b`
    getAllMovies(url, displayMovies)
})

function getAllMovies(url, moviesCallback){
    
    let request = new XMLHttpRequest()
    request.addEventListener('load', function(){
        const result= JSON.parse(this.responseText)
        let movies = result.Search
        moviesCallback(movies)
    })

    request.open('GET', url)
    request.send()

}



function displayMovies(movie){
    
    
    const movieItems = movie.map(function(movie){
        return `<div class="movie-box">
                <img onClick= 'getMovieInfo("${movie.imdbID}")' class="img-resize" src = ${movie.Poster}/>        
                <h3 onClick= "getMovieInfo('${movie.imdbID}')">${movie.Title}</h3>
                </div>
                `
    })

    moviesList.innerHTML = movieItems.join('')
    
}


const movieInfo = document.getElementById('movieInfo')
const largePic = document.getElementById('largePic')
const titleBox = document.getElementById('titleBox')
const description = document.getElementById('description')
const yearBox = document.getElementById('yearBox')



function getMovieInfo(imdbID){
    
    let request = new XMLHttpRequest()
    request.addEventListener('load', function(){
        const result= JSON.parse(this.responseText)
        titleBox.innerHTML = result.Title
        yearBox.innerHTML = result.Year
        description.innerHTML = result.Plot
        largePic.setAttribute('src', result.Poster)
    })
    request.open('GET', `http://www.omdbapi.com/?i=${imdbID}&apikey=274d673b`)
    request.send()



}


