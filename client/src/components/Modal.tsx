import { useEffect, useState } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import EditTask from './EditTask'
import ShowTask from './ShowTask'

import { HistoryMessage, formatHistoryForTask } from '../utils/historyFormatter'
import { formatDateWithTime } from '../utils/dateHook'
import { CloseSvg } from '../assets/svg-data'

const Modal = () => {
  const { isModalActive, TaskState, taskId } = useAppSelector(
    state => state.app
  )
  const { changeTaskState, toggleModal } = useAppActions()

  const { data: history } = mainApi.useGetHistoryQuery()
  const [historyResult, setHistoryResult] = useState<HistoryMessage[]>([])

  useEffect(() => {
    if (history && taskId) {
      const formattedData = formatHistoryForTask(taskId, history)
      setHistoryResult(formattedData)
    }
  }, [history, taskId])

  const onCloseModal = () => {
    toggleModal({ listName: '', taskId: 0 })
    changeTaskState({ TaskState: 'show' })
  }

  return (
    <div
      className={` ${
        isModalActive
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } h-screen w-screen bg-black/60 fixed top-0 left-0 z-50 flex justify-center items-center transition-all duration-300 ease-out`}
      onClick={() => toggleModal({})}
    >
      <div
        className={` ${
          isModalActive ? 'scale-100' : 'scale-50'
        }p-2 rounded-xl bg-white w-full max-w-[1200px] h-[80%] max-h-[80%] transition-all duration-300 ease-out overflow-hidden `}
        onClick={e => e.stopPropagation()}
      >
        <div className='bg-main flex justify-between items-center'>
          <div className='pl-10 text-2xl text-white font-bold'>temp text</div>
          <div onClick={onCloseModal} className='cursor-pointer w-fit m-4 mr-6'>
            <CloseSvg />
          </div>
        </div>
        <div className='flex h-full'>
          <div className='w-full flex flex-col p-3 md:p-8 pt-5'>
            {TaskState === 'show' ? <ShowTask /> : <EditTask />}
          </div>
          <div className='hide-history min-w-[40%] w-[40%] bg-main-light'>
            {TaskState !== 'create' && (
              <div className='flex flex-col gap-4 p-3 md:p-8'>
                <h3 className='text-xl font-bold'>Activity</h3>
                <div className='flex flex-col gap-4 h-screen pb-80 overflow-auto'>
                  {historyResult.length === 0 ? (
                    <div className='text-main'>History is Empty...</div>
                  ) : (
                    historyResult.map(item => (
                      <div key={item.timestamp} className='flex flex-col'>
                        <div className='relative text-main my-4'>
                          <span className='before:absolute before:h-1 before:w-1 before:bg-main before:rounded-full before:top-3'></span>
                          <span className='ml-4'>{item.message}</span>
                        </div>
                        <div className='italic text-main font-bold'>
                          {formatDateWithTime(item.timestamp)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
