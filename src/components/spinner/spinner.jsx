import React from 'react'
import './spinner.css'
import { Spin } from 'antd'

const Spinner = () => {
  ;<Spin tip="Loading" size="large">
    <div className="content" />
    <p className="loadingMessage">Мы уже связались с фиксиками, скоро страница загрузится. Пожалуйста, подождите.</p>
  </Spin>
}

export default Spinner
