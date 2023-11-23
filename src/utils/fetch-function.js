export default class ApiService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWIyNDE4Zjg0NTRjMjNmOGE1ODZiZWM4ZjM3YzQ4OSIsInN1YiI6IjY1NGU3ZGYxZDRmZTA0MDBlMWFmYWM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8PZI2prQ11QEh6nc8vrepl9_o9L8kiE1YGgAWdSJ1bI',
    },
  }

  postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWIyNDE4Zjg0NTRjMjNmOGE1ODZiZWM4ZjM3YzQ4OSIsInN1YiI6IjY1NGU3ZGYxZDRmZTA0MDBlMWFmYWM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8PZI2prQ11QEh6nc8vrepl9_o9L8kiE1YGgAWdSJ1bI',
    },
  }

  async getResource(url, method) {
    const res = await fetch(url, method)

    if (!res.ok) {
      throw new Error(`could not fetch ${url}`)
    }
    return await res.json()
  }

  // async getFilms(){
  //    const res = await this.getResource('https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1', this.options);
  //    return res.results;
  // }

  async getFilmsBySearch(searchBarLabel, selectedPage) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${searchBarLabel}&include_adult=false&language=en-US&page=${selectedPage}`,
      this.options
    )
    return res
  }

  async createGuestSession() {
    return await this.getResource('https://api.themoviedb.org/3/authentication/guest_session/new', this.options)
  }

  async getRatedMovies(userId, selectedPage) {
    return await this.getResource(
      `https://api.themoviedb.org/3/account/${userId}/rated/movies?language=en-US&page=${selectedPage}&sort_by=created_at.asc`,
      this.options
    )
  }

  async setRating(userId, movieId, value) {
    if (value) {
      value = JSON.stringify({ value })
    }

    this.postOptions = {
      ...this.postOptions,
      method: value ? 'POST' : 'DELETE',
      body: value,
    }

    return this.getResource(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${userId}`,
      this.postOptions
    )
  }

  async getGenres() {
    const res = await this.getResource('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options)
    return res
  }
}
