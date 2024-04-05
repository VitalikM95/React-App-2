import Header from './components/Header'
import Main from './components/Main'
import { Modal } from './components/Modal'
import { useAppSelector } from './redux/hooks'
import { ToastContainer } from 'react-toastify'

function App() {
  const isModalActive = useAppSelector(state => state.app.isModalActive)

  return (
    <>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        draggable={false}
        pauseOnFocusLoss={false}
      />
      <Header />
      <Main />
      {isModalActive && <Modal />}
    </>
  )
}

export default App
