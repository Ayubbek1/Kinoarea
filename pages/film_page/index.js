console.log(location.href);
var url = window.location.href;

// Создать объект URL
var urlObj = new URL(url);
let body = document.body
// Получить значение параметра 'id'
var id = urlObj.searchParams.get('id');
let img = document.querySelector(".j")
// Вывести значение id в консоль (это просто для проверки)
let movie_info_box_right = document.querySelectorAll(".movie_info_box_right p")
fetch("https://api.themoviedb.org/3/movie/"+id,{
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
    }
})
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        img.src = `https://image.tmdb.org/t/p/w500${res.poster_path}`
        movie_info_box_right[0].innerHTML = res.original_title
        movie_info_box_right[1].innerHTML = res.overview
        body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.backdrop_path})`
    })