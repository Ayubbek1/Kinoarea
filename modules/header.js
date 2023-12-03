let header = document.querySelector("header")
header.innerHTML = `
<div class="leftheader flex">
<a href="/" class="logo">
  <img src="/img/cinema 1.png" alt="">
  <img src="/img/Kinoarea.png" alt="">
</a>
<img src="/img/   .png" alt="">
</div>
<nav>
<a href="">Афиша</a>
<a href="">Медиа</a>
<a href="">Фильмы</a>
<a href="">Актёры</a>
<a href="">Новости</a>
<a href="">Подборки</a>
<a href="">Категории</a>
</nav>
<div class="rightheader">
<img class="search" src="/img/Поиск.png" alt="">
<div class="sigin">Войти</div>
</div>
`
console.log();
if (JSON.parse(localStorage.getItem("user_avatar")).lenght !=="" ) {
  let sigin = document.querySelector('.sigin')
  sigin.innerHTML = `
  <img width="25px" src="${JSON.parse(localStorage.getItem("user_avatar"))}" alt="">
  <p>${JSON.parse(localStorage.getItem("user_name"))}</p>
  
  `

}