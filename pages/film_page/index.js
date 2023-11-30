console.log(location.href);
var url = window.location.href;
import { getData } from "/modules/https.js";
// Создать объект URL
var urlObj = new URL(url);
let body = document.body
// Получить значение параметра 'id'
var id = urlObj.searchParams.get('id');
let img = document.querySelector(".j")
// Вывести значение id в консоль (это просто для проверки)
let name_info = document.querySelector("#name_info")
let description_info = document.querySelector("#description_info")
let tmdb_rate = document.querySelector('#tmdb_rate')
let name_info_lil = document.querySelector("#name_info_lil")
let watch_trailer = document.querySelector("#watch_trailer")
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
fetch("https://api.themoviedb.org/3/movie/" + id, {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
    }
})
    .then(res => res.json())
    .then(res => {
        console.log(res);
        watch_trailer.onclick = () =>{
            getData(`/movie/${id}/videos`)
            .then(res => {

                location.assign(`https://www.youtube.com/embed/${res.results[getRandomInt(0, res.results.length - 1)].key}`)
                
            })
            
        }
        img.src = `https://image.tmdb.org/t/p/w500${res.poster_path}`
        name_info.innerHTML = res.original_title
        name_info_lil.innerHTML = res.original_title
        description_info.innerHTML = res.overview
        tmdb_rate.innerHTML = res.vote_average.toFixed(2)
        body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.backdrop_path})`
        // Данные для пай-чарта
        var data = {
            datasets: [{
                data: [res.vote_average, 10 - res.vote_average],
                backgroundColor: ['#4BCB36', 'rgba(0, 0, 0, 0)', '#FFCE56'],
                hoverBackgroundColor: ['#4BCB36', 'rgba(0, 0, 0, 0)', '#FFCE56']
            }]
        };

        // Получите контекст canvas
        var ctx = document.getElementById('myPieChart').getContext('2d');

        // Создайте пай-чарт
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data
        });
    })

