import { Flex, Spin } from 'antd'

const Preloader = () => {
  return (
    <Flex align='center' gap='middle'>
      <Spin size='large' />
    </Flex>
  )
}
export default Preloader
