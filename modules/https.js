import axios from 'axios'

const BASE_URL = "https://api.themoviedb.org/3"


export const getData = async (url) => {
    try {
        const res = await axios.get(BASE_URL + url,{
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDA0Nzg2M2Y2NmE2Y2E2YWNhMTMwODA0NTdkNjAzYyIsInN1YiI6IjY1NTYzOGQ2YjU0MDAyMTRkODJiYzllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hD9JO5en4JCEC89iPG4ULbIKrobJ0nUCNlZTWJX3p2s"
            }
        })
        
        return res.data
    } catch(error) {
        alert('что то пошло не так перезагрузите страницу')
    }
}
