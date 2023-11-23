import { Component } from 'react'
import { Tabs } from 'antd'

import './tabs.css'

export default class MenuTabs extends Component {
  render() {
    const { isRated } = this.props

    const items = [
      {
        label: 'Search',
        key: 'search',
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ]

    const onChange = (e) => {
      e === 'search' ? isRated(false) : isRated(true)
    }

    return (
      <Tabs
        items={items}
        mode="horizontal"
        onChange={onChange}
        defaultActiveKey="search"
        destroyInactiveTabPane="true"
      />
    )
  }
}
