import axios from "axios"

export async function getMovies(page = 1, limit = 10) {
    var result = await axios.get("/api/movie", {
        params: {
            page,
            limit
        }
    })
    return result.data;
}

export async function getMovie(id) {
    var result = await axios.get(`/api/movie/${id}`)
    return result.data;
}