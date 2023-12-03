console.log(location.href);
var url = window.location.href;
import { getData } from "/modules/https.js";
// Создать объект URL
var urlObj = new URL(url);
let body = document.body
// Получить значение параметра 'id'
var id = urlObj.searchParams.get('id');
let name = document.querySelector('#name_info_lil')
let name_big = document.querySelector('#name_info')
let actor_image = document.querySelector(".actor_image")
console.log(id);
getData(`/person/${id}`)
    .then(res => {
        console.log(res)
        name.innerHTML = res.name
        name_big.innerHTML = res.name
        actor_image.src = `https://image.tmdb.org/t/p/w500${res.profile_path}`
    })

let best_films = document.querySelector(".best_films")

getData(`/person/${id}/combined_credits`)
    .then(res => {
        res.cast.slice(0, 15).forEach(kino => {
            console.log(kino);
            best_films.innerHTML+= `
            <div id=${kino.id} class="relative">
            <div class="blue_ad hide">
            <span id=${kino.id} class="card">карточка фильма</span>
            </div>
            <img src=https://image.tmdb.org/t/p/w500${kino.poster_path} class="poster">
              <div class="rate">${kino.vote_average.toFixed(2)}</div>
            </img>
            <div class="title">${kino.title}</div>
          </div>
            `
        });
        let cards = document.querySelectorAll(".card")
        cards.forEach(card => {
            card.onclick = () => {
                location.assign(`/pages/film_page/?id=${card.id}`)
            }
        });
        console.log(res.cast.slice(0, 20))
    })