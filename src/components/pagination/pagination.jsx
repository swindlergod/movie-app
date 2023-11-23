import { Pagination } from 'antd'
import { Component } from 'react'

import './pagination.css'

export default class Pagi extends Component {
  render() {
    const { onSelectedPage, allPages } = this.props

    return (
      <div className="pagination">
        <Pagination onChange={onSelectedPage} defaultCurrent={1} total={allPages * 10} />
      </div>
    )
  }
}
