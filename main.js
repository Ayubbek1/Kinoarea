import { getData } from "/modules/https.js";
import { reload } from "/modules/reload.js";
let new_films = document.querySelector(".new_films")

 

getData("/genre/movie/list")
    .then(resp => {
        getData("/movie/now_playing")
            .then(res => reload(res, new_films,resp,8))
    })




localStorage.setItem("user",JSON.stringify("lol") )