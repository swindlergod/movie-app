import React, { Component } from 'react'
import { debounce } from 'lodash'

import Searchbar from '../search-bar/search-bar'
import Cardslist from '../cards-list/cards-list'
import Pagi from '../pagination/pagination'
import ApiService from '../../utils/fetch-function'
import MenuTabs from '../tabs/tabs'
import { GenresProvider } from '../apiService-context/apiService-context'

export default class App extends Component {
  debounceUpdateSearchValue = debounce((value) => {
    this.setState({
      searchBarLabel: value,
    })
  }, 1000)

  apiService = new ApiService()

  constructor() {
    super()

    this.state = {
      searchBarLabel: '',
      selectedPage: 1,
      allPages: null,
      guestSession: null,
      rated: false,
      genres: [],
    }
  }

  async componentDidMount() {
    const gen = await this.apiService.getGenres()
    this.setState({ genres: gen })
    this.apiService.createGuestSession().then((res) => this.setState({ guestSession: res.guest_session_id }))
  }

  isRated = (value) => {
    this.setState({ rated: value })
  }

  setRating = (rating, movieId) => {
    const { guestSession } = this.state
    this.apiService.setRating(guestSession, movieId, rating)
  }

  onLabelChange = (event) => {
    this.debounceUpdateSearchValue(event.target.value)
  }

  countPages = (res) => {
    this.setState({
      allPages: res.total_pages,
    })
  }

  onSelectedPage = (number) => {
    this.setState({
      selectedPage: number,
    })
  }

  render() {
    const { searchBarLabel, allPages, selectedPage, guestSession, rated, genres } = this.state

    const ratedPage = !rated ? <Searchbar searchBarLabel={searchBarLabel} onLabelChange={this.onLabelChange} /> : null

    return (
      <>
        <MenuTabs isRated={this.isRated} />
        {ratedPage}
        <GenresProvider value={genres}>
          <Cardslist
            searchBarLabel={searchBarLabel}
            selectedPage={selectedPage}
            countPages={this.countPages}
            guestSession={guestSession}
            rated={rated}
            setRating={this.setRating}
          />
        </GenresProvider>
        <Pagi onSelectedPage={this.onSelectedPage} allPages={allPages} />
      </>
    )
  }
}
