import './error-indicator.css'

import React from 'react'
import { Alert, Space } from 'antd'

import pic from './repair.jpg'

function ErrorComponent() {
  return (
    <div className="error-component">
      <img src={pic} alt="repair" />
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert message="ОПАЧКИ!" type="warning" />
        <Alert
          message="Что-то пошло не по плану"
          description="Мы уже работаем над исправлением этой проблемы"
          type="error"
        />
      </Space>
    </div>
  )
}

export default ErrorComponent
