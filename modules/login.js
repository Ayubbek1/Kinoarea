
const API_KEY ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
let loginBtn = document.querySelector('#login')
let confirmBtn = document.querySelector('#reg')
let userIMG = document.querySelector('img')
let userFullName = document.querySelector('h1')
let reqToken = ''

loginBtn.onclick = () => {
    fetch('https://api.themoviedb.org/4/auth/request_token', {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                reqToken = res.request_token
                window.open(`https://www.themoviedb.org/auth/access?request_token=${res.request_token}`)
            }
        })
}
confirmBtn.onclick = () => {
    fetch(`https://api.themoviedb.org/4/auth/access_token`, {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            request_token: reqToken
        }),
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('user_auth', JSON.stringify(res))
                location.reload()
            }
        })
}
let user_auth = JSON.parse(localStorage.getItem('user_auth')) || null

if (user_auth) {
    fetch(`https://api.themoviedb.org/3/account/${user_auth?.account_id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
    })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("user_avatar",JSON.stringify(`https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}`) )
            localStorage.setItem("user_name",JSON.stringify(res.username))
        })
}
let log_in_modal = document.querySelector(".log_in_modal")
let sigin = document.querySelector(".sigin")
let modal_exit_login = document.querySelector(".modal_exit_login")
sigin.onclick =() =>{
    document.body.style.overflowY = "hidden"
    log_in_modal.style.display = "block"
}
modal_exit_login.onclick =() =>{
    document.body.style.overflowY = "visible"
    log_in_modal.style.display = "none"
}