let BASE_URL = "https://api.themoviedb.org/3"
let new_films = document.querySelector(".new_films")
let see_all = document.querySelector(".see_all")
let logo = document.querySelector('.logo')
let header = document.querySelector("header")
let swiper_box = document.querySelector("#swiper_box")
let trailers = document.querySelector("#trailers")
let iframe = document.querySelector("iframe")
let body = document.body
let genresi = []
let nmb = -1
let filter_p = document.querySelector(".filter p")

console.log();
filter_p.getAttribute("name")
logo.onclick = () => {
    new_films.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}
let togle = true
see_all.onclick = (e) => {
    if (togle) {
        nmb = -20
        fetch(BASE_URL + "/movie/now_playing", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
            }
        })
            .then(res => res.json())
            .then(res => reload(res, new_films))

        setTimeout(() => {
            see_all.scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }, 350);
        togle = false
        see_all.innerHTML = "Закрыть"
    } else {
        nmb = -1
        setTimeout(() => {
            fetch(BASE_URL + "/movie/now_playing", {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
                }
            })
                .then(res => res.json())
                .then(res => reload(res, new_films))
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

function genre(arr, id_genre) {
    arr.forEach(element => {
        console.log(element.id, id_genre)
        if (element.id == id_genre) {
            genresi.push(element.name)
            console.log(genresi)
        }
    });
}
fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
    }
})
    .then(res => res.json())
    .then(res => genresi = res)

fetch(BASE_URL + "/movie/now_playing", {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
    }
})
    .then(res => res.json())
    .then(res => reload(res, new_films))






function reload(arr, place) {

    place.innerHTML = ""
    // trailers.innerHTML=
    console.log(arr);
    arr.results.forEach(result => {
        nmb++
        if (nmb < 8) {
            let genre_div = document.createElement("div")
            genre_div.classList.add("genre")


            if (genresi.length !== 0) {
                genresi.genres.forEach(element => {
                    // console.log(element.id , id_genre)
                    if (element.id == result.genre_ids[0]) {
                        genre_div.innerHTML = element.name
                    }
                });
            }

            //     swiper_box.innerHTML+=`
            //     <div class="swiper-slide">
            //     <img class="joc" src=https://image.tmdb.org/t/p/w500${result.poster_path} alt="">
            //     <div class="title">${result.title}</div>
            //     <div class="genre">${genre_div.innerHTML}</div>
            //   </div>`
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
            trailers.innerHTML += `
            <div id="trailer" class="swiper-slide">
            <img id="${result.id}" src=https://image.tmdb.org/t/p/w500${result.poster_path} alt="">
            <p class="slide_name">${result.title}</p>
          </div>
            `
            let trailers_divs = trailers.querySelectorAll("div")
            trailers_divs.forEach(div => {
                div.onclick = () => {
                    fetch(`https://api.themoviedb.org/3/movie/${div.firstElementChild.id}/videos`, {
                        headers: {
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
                        }
                    })
                        .then(res => res.json())
                        .then(res => iframe.src = `https://www.youtube.com/embed/${res.results[0].key}`)

                }
            });
            let bg = document.querySelector(".bg")
            let box = document.querySelectorAll(".relative")
            box.forEach(element => {
                element.append(genre_div)
                element.onmouseenter = () => {
                    arr.results.forEach(result => {
                        if (element.id == result.id) {
                            setTimeout(() => {
                                body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`

                            }, 400);
                        }
                    })
                }
                element.onmouseleave = () => {
                    console.log(1);
                    body.style.backgroundImage = "url(/img/joper.png)"

                }
            });

        }


    });
    let cards = document.querySelectorAll(".card")

    console.log(cards);
    cards.forEach(card => {
        card.onclick = () => {
            location.assign(`/pages/film_page/?id=${card.id}`)
        }
    });
}
let top_two = document.querySelectorAll(".top_two")
let top_two_text = document.querySelectorAll(".top_two_text")
let popular_person_top = document.querySelectorAll(".popular_person_top div span")

console.log(popular_person_top);
fetch(`https://api.themoviedb.org/3/person/popular`, {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
    }
})
    .then(res => res.json())
    .then(res => {
        console.log(res.results);
        top_two[0].style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.results[0].profile_path})`
        top_two_text[0].innerHTML = res.results[0].name
        top_two[1].style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.results[1].profile_path})`
        top_two_text[1].innerHTML = res.results[1].name
        let numbe = 1
        popular_person_top.forEach(element => {

            numbe++
            element.innerHTML = res.results[numbe].name

        });
    })

