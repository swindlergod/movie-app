import React, { Component } from 'react'
import './search-bar.css'

export default class Searchbar extends Component {
  render() {
    const { searchBarLabel, onLabelChange } = this.props

    return (
      <form action="" method="get">
        <input
          className="searchbar"
          name="s"
          placeholder="Type to search..."
          type="search"
          onChange={onLabelChange}
          defaultValue={searchBarLabel}
        />
      </form>
    )
  }
}
