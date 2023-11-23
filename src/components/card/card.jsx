import React, { Component } from 'react'
import './card.css'
import { format } from 'date-fns'
import { Offline } from 'react-detect-offline'
import { Rate, Tag } from 'antd'

import ApiService from '../../utils/fetch-function'
import textTruncate from '../../utils/textTruncate'
import Spinner from '../spinner/spinner'
import ErrorComponent from '../error-indicator/error-indicator'
import OfflineMessage from '../offline-message/offline-message'
import NoFilmsFound from '../no-films-found/no-films-found'
import { GenresConsumer } from '../apiService-context/apiService-context'

export default class Card extends Component {
  apiService = new ApiService()

  constructor() {
    super()

    this.state = {
      movieList: [],
      loaded: false,
      error: false,
    }
  }

  componentDidMount() {
    this.newRequest()
  }

  componentDidUpdate(prevProps) {
    const { searchBarLabel, selectedPage, rated } = this.props

    if (rated !== prevProps.rated) {
      this.newRequest()
    }

    if (searchBarLabel !== prevProps.searchBarLabel) {
      this.newRequest()
    }
    if (selectedPage !== prevProps.selectedPage) {
      this.setState({
        loaded: false,
      })
      this.newRequest()
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loaded: true,
    })
  }

  newRequest() {
    const { searchBarLabel, selectedPage, guestSession, rated } = this.props

    if (rated) {
      this.apiService
        .getRatedMovies(guestSession, selectedPage)
        .then((res) => this.updateFilms(res))
        .catch((err) => this.onError(err))
    } else {
      this.apiService
        .getFilmsBySearch(searchBarLabel, selectedPage)
        .then((res) => this.updateFilms(res))
        .catch((err) => this.onError(err))
    }
  }

  updateFilms(res) {
    const { countPages } = this.props

    this.setState({
      movieList: res.results,
      loaded: true,
    })

    countPages(res)
  }

  switchColors(voteAverage) {
    let color = '#66E900'
    if (voteAverage <= 3) color = '#E90000'
    if (voteAverage > 3 && voteAverage <= 5) color = '#E97E00'
    if (voteAverage > 5 && voteAverage <= 7) color = '#E9D100'
    return {
      borderColor: color,
    }
  }

  render() {
    const { movieList, loaded, error } = this.state
    const { setRating } = this.props

    const hasData = !(loaded || error)

    const errorMessage = error ? <ErrorComponent /> : null
    const spinner = hasData ? <Spinner /> : null
    const content = loaded ? (
      <ShowPage movieList={movieList} setRating={setRating} switchColors={this.switchColors} />
    ) : null
    const noFilmsFound = movieList.length === 0 && !hasData ? <NoFilmsFound /> : null

    return (
      <>
        <Offline>
          <OfflineMessage />
        </Offline>

        {noFilmsFound}
        {errorMessage}
        {spinner}
        {content}
      </>
    )
  }
}

function ShowPage({ movieList, setRating, switchColors }) {
  return (
    <GenresConsumer>
      {(genres) => (
        <div className="cardsList">
          {movieList.map((card, a = 1) => (
            <div className="card" key={(a += a)}>
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${card.backdrop_path}`
                    : 'https://stickerpak.ru/wp-content/uploads/2019/04/3.png'
                }
                alt="123"
                className="card__image"
              />
              <div className="card__content">
                <h1 className="content__title">{card.title}</h1>
                <div className="content__rating" style={switchColors(card.vote_average)}>
                  {card.vote_average.toFixed(1)}
                </div>
                <p className="content__date">{format(new Date(card.release_date || null), 'MMMM dd, yyyy')}</p>
                <div className="content__genres">
                  {genres.genres.map((genre, b = 1) => {
                    return card.genre_ids.includes(genre.id) && <Tag key={(b += b)}>{genre.name}</Tag>
                  })}
                </div>
                <p className="content__overview">{textTruncate(card.overview, 180, '...')}</p>
                <Rate count={10} onChange={(rating) => setRating(rating, card.id)} defaultValue={card.rating} />
              </div>
            </div>
          ))}
        </div>
      )}
    </GenresConsumer>
  )
}
