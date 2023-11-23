import React, { Component } from 'react'

import Card from '../card/card'

import './cards-list.css'

export default class Cardslist extends Component {
  render() {
    const { searchBarLabel, selectedPage, countPages, guestSession, rated, setRating } = this.props

    return (
      <Card
        searchBarLabel={searchBarLabel}
        selectedPage={selectedPage}
        countPages={countPages}
        guestSession={guestSession}
        rated={rated}
        setRating={setRating}
      />
    )
  }
}
