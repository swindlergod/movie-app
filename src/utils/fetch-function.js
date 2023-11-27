export default class ApiService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWIyNDE4Zjg0NTRjMjNmOGE1ODZiZWM4ZjM3YzQ4OSIsInN1YiI6IjY1NGU3ZGYxZDRmZTA0MDBlMWFmYWM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8PZI2prQ11QEh6nc8vrepl9_o9L8kiE1YGgAWdSJ1bI',
    },
  }

  getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
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
      `https://api.themoviedb.org/3/guest_session/${userId}/rated/movies?api_key=5ab2418f8454c23f8a586bec8f37c489&language=en-US&sort_by=created_at.asc&page=${selectedPage}`,
      this.getOptions
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

    return await this.getResource(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=5ab2418f8454c23f8a586bec8f37c489&guest_session_id=${userId}`,
      this.postOptions
    )
  }

  async getGenres() {
    const res = await this.getResource('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options)
    return res
  }
}
