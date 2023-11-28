let filter = document.querySelector(".filter")
let new_films = document.querySelector(".new_films")
let see_all = document.querySelector(".see_all")
import { getData } from "/modules/https.js";
import { reload } from "/modules/reload.js";
getData("/genre/movie/list")
    .then(res=>{
        filter.innerHTML=""
        res.genres.forEach(genre => {
            filter.innerHTML+=`<p id="${genre.id}">${genre.name}</p>`
            let filter_ps = filter.querySelectorAll(".filter p")
            filter_ps.forEach(element => {
                element.onclick = () =>{
                    see_all.classList.add("hide")
                    console.log(element.id);
                    
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0d047863f66a6ca6aca13080457d603c&with_genres=${element.id}`)
                        .then(resp=>resp.json())
                        .then(resp=>reload(resp,new_films,"",8))
                }
            });
        });
    })
