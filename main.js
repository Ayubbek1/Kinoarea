import { getData } from "/modules/https.js";
import { reload } from "/modules/reload.js";
let new_films = document.querySelector(".new_films")
let popular_films = document.querySelector(".popular_films")
let years = document.querySelectorAll(".years a")
years = Array.from(years)
console.log(years.slice(1));
years.slice(1).forEach(year => {
    year.onclick = (a) => {
        a.preventDefault()
        getData("/genre/movie/list")
            .then(resp => {
                getData(`/discover/movie?api_key=0d047863f66a6ca6aca13080457d603c&release_date.gte=${`${year.innerHTML}-01-01`}&release_date.lte=${`${year.innerHTML}-12-30`}&region=US`)
                    .then(res => reload(res, popular_films, resp, 20))
            })


    }
});
years[0].onclick = (a) => {
    a.preventDefault()
    getData("/genre/movie/list")
        .then(resp => {
            getData("/movie/popular")
                .then(res => reload(res, popular_films, resp, 20))
        })


}



getData("/genre/movie/list")
    .then(resp => {
        getData("/movie/popular")
            .then(res => reload(res, popular_films, resp, 20))
    })
getData("/genre/movie/list")
    .then(resp => {
        getData("/movie/now_playing")
            .then(res => reload(res, new_films, resp, 8))
    })