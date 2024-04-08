import { useAppActions, useAppSelector } from './redux/hooks'

import Header from './components/Header'
import Main from './components/Main'
import Modal from './components/Modal'

import { ToastContainer } from 'react-toastify'
import { getIdFromLocalStorage } from './utils/localStorageFuncs'

function App() {
  const isModalActive = useAppSelector(state => state.app.isModalActive)
  const { setBoardId } = useAppActions()
  setBoardId(getIdFromLocalStorage('boardId', 0))

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
