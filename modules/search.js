import { getData } from "/modules/https.js";
let search_btn = document.querySelector(".search")
let search_modal = document.querySelector(".search_modal")
let search_form=document.querySelector(".search_input")
let search_input=document.querySelector(".search_input input")
let finded_films = document.querySelector(".finded_films")
let modal_exit = document.querySelector(".modal_exit")

search_btn.onclick = () =>{
    search_modal.style.display = "block"
    document.body.style.overflow = "hidden"
}
modal_exit.onclick = () =>{
    console.log(1);
    search_modal.style.display = "none"
    document.body.style.overflow = "visible"
}
search_form.onsubmit = (e) =>{
    e.preventDefault()
    getData(`/search/movie?api_key=0d047863f66a6ca6aca13080457d603c&query=${search_input.value}`)
        .then(res=>search_reload(res.results))
}
function search_reload(arr) {
    finded_films.innerHTML = ""
    arr.forEach(element => {
        finded_films.innerHTML +=`
        <div class="finded_films_item">
        <div>
          <img id="${element.id}" class="searched_poster" width="80px" height="100px" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
          <div class="finded_films_item_text">
            <p>${element.title}</p>
          </div>
        </div>

        <p style="position: unset;" class="rate">${element.vote_average.toFixed(2)}</p>
      </div>
        `
        let searched_posters = document.querySelectorAll(".searched_poster")
        searched_posters.forEach(searched_poster => {
            searched_poster.onclick = () => {
                location.assign(`/pages/film_page/?id=${searched_poster.id}`)
            }
        });
    });
}