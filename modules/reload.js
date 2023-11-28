
import { getData } from "/modules/https.js";
let see_all = document.querySelector(".see_all")
let togle = true
let logo = document.querySelector('.logo')
let new_films = document.querySelector(".new_films")
let top_two = document.querySelectorAll(".top_two")
let top_two_text = document.querySelectorAll(".top_two_text")
let popular_person_top = document.querySelector(".popular_person_top")
let trailers = document.querySelector("#trailers")
let iframe = document.querySelector("iframe")
let header = document.querySelector("header")

see_all.classList.remove("hide")

let body = document.body
let nmb = -1
see_all.onclick = () => {
    if (togle) {
        nmb = -20
        getData("/genre/movie/list")
            .then(resp => {
                getData("/movie/now_playing")
                    .then(res => reload(res, new_films,resp,20))
            })
        setTimeout(() => {
            see_all.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 350);
        togle = false
        see_all.innerHTML = "Закрыть"
    } else {
        nmb = -1
        setTimeout(() => {
            getData("/genre/movie/list")
            .then(resp => {
                getData("/movie/now_playing")
                    .then(res => reload(res, new_films,resp,8))
            })
        }, 1000);
        setTimeout(() => {
            header.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 350);
        togle = true
        see_all.innerHTML = "Все новинки"
    }
}
logo.onclick = () => {
    place.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}

export function reload(arr, place, genres,times) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    trailers.innerHTML = ""
    place.innerHTML = ""
    arr.results.slice(0,times).forEach(result => {
        nmb++
        trailers.innerHTML += `
        <div id="trailer">
        <img id="${result.id}" src=https://image.tmdb.org/t/p/w780${result.backdrop_path} alt="">
        <p class="slide_name">${result.title}</p>
        <img id="play" src="/img/play.png" alt="">
      </div>
        `
        let trailers_divs = trailers.querySelectorAll("div")
        trailers_divs.forEach(div => {
            div.onclick = () => {
                let trailer_name = document.querySelector("#trailer_name")
                trailer_name.innerHTML = div.lastElementChild.previousElementSibling.innerHTML
                getData(`/movie/${div.firstElementChild.id}/videos`)
                    .then(res => {

                        iframe.src = `https://www.youtube.com/embed/${res.results[getRandomInt(0, res.results.length - 1)].key}`
                        
                    })

            }
        });

        let genre_div = document.createElement("div")
        genre_div.classList.add("genre")


        if (genres.length !== 0) {
            genres.genres.forEach(element => {
                // console.log(element.id , id_genre)
                if (element.id == result.genre_ids[0]) {
                    genre_div.innerHTML = element.name
                }
            });
        }
        place.innerHTML += `
            <div id=${result.id} class="relative">
            <div class="blue_ad hide">
            <span id=${result.id} class="card">карточка фильма</span>
            </div>
            <img src=https://image.tmdb.org/t/p/w500${result.poster_path} class="poster">
              <div class="rate">${result.vote_average.toFixed(2)}</div>
            </img>
            <div class="title">${result.title}</div>
          </div>
            `

        let bg = document.querySelector(".bg")
        let box = document.querySelectorAll(".relative")
        box.forEach(element => {
            element.append(genre_div)
            element.onmouseenter = () => {
                arr.results.forEach(result => {
                    if (element.id == result.id) {
                        setTimeout(() => {
                            body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`
                        }, 500);
                    }
                })
            }
            element.onmouseleave = () => {
                body.style.backgroundImage = "url(/img/joper.png)"

            }
        });



        getData(`/person/popular`)
            .then(res => {
                popular_person_top.innerHTML = ""
                top_two[0].style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.results[0].profile_path})`
                top_two_text[0].innerHTML = res.results[0].name
                top_two[1].style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.results[1].profile_path})`
                top_two_text[1].innerHTML = res.results[1].name

                res.results.slice(2).forEach(element => {
                    popular_person_top.innerHTML += `<div>
            <span class="popular_person_top_text">
              <p>${element.name}</p>
            </span>
            <p>${res.results.slice(2).indexOf(element) + 3 + "-е место"}</p>
            </div>`
                });
            })
    });
    let cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.onclick = () => {
            location.assign(`/pages/film_page/?id=${card.id}`)
        }
    });

}