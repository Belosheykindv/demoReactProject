import React from 'react'
import { Flex, Spin } from 'antd'

let Preloader = () => {
  return (
    <Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>
  )
}
export default Preloader
