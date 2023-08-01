import { initBrowser } from '@ideaair/monitor-sdk'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

initBrowser({
  appId: 'Test',
  logger: true
})

const App = () => {
  const [visible, setVisible] = useState(false)
  const handleClickError = () => {
    // Console.count('click error')
    setVisible((pre) => !pre)
    // Throw new Error('Custom error!')
    // New Promise((resolve, reject) => {
    //   Reject('de')
    // })
  }

  return (
    <>
      <button onClick={handleClickError}>Click error</button>
      {visible && <img src="http://localhost:10086/demo.png" alt="" />}
    </>
  )
}

createRoot(document.querySelector('#app')!).render(<App />)
