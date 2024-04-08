import { FC, useEffect, useState } from 'react'
import { mainApi } from '../redux/main.api'

import { HistoryMessage, sortFormatHistory } from '../utils/historyFormatter'
import { formatDateWithTime } from '../utils/dateHook'
import { CloseSvg } from '../assets/svg-data'

type DrawerProps = {
  isDrawerOpened: boolean
  setIsDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
}

const Drawer: FC<DrawerProps> = ({
  isDrawerOpened,
  setIsDrawerOpened,
  reset,
}) => {
  const { data: history } = mainApi.useGetHistoryQuery()

  const [historyResult, setHistoryResult] = useState<HistoryMessage[]>([])

  useEffect(() => {
    if (history) {
      const formattedData = sortFormatHistory(history)
      setHistoryResult(formattedData)
    }
  }, [history])

  const handleCloseHistory = () => {
    setIsDrawerOpened(false)
    reset()
  }

  return (
    <div
      className={` ${
        isDrawerOpened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } h-screen w-screen bg-black/60 fixed top-0 z-30 left-0 transition-all duration-300 ease-out`}
      onClick={handleCloseHistory}
    >
      <div
        className={` ${
          isDrawerOpened ? 'translate-x-0' : 'translate-x-full'
        } transform top-0 right-0 fixed h-screen bg-main-light w-[375px] shadow-lg transition-transform duration-300 ease-out`}
        onClick={e => e.stopPropagation()}
      >
        <div className='flex flex-col'>
          <div className='bg-main p-5 fixed z-10 w-full flex items-center justify-between'>
            <h4 className='text-white text-xl'>History</h4>
            <div onClick={handleCloseHistory} className='cursor-pointer'>
              <CloseSvg />
            </div>
          </div>
          <div className='flex flex-col h-screen overflow-y-auto text-main pt-20 gap-5 p-7'>
            {historyResult.map(item => (
              <div key={item.timestamp} className='flex flex-col'>
                <div className='relative my-4'>
                  <span className='before:absolute before:h-1 before:w-1 before:bg-main before:rounded-full before:top-3'></span>
                  <span className='ml-4'>
                    <span className='inline-block border-b-2 border-main'>
                      {item.message.split(' ').slice(0, 2).join(' ')}
                    </span>{' '}
                    {item.message.split(' ').slice(2).join(' ')}
                  </span>
                </div>
                <div className='italic font-bold'>
                  {formatDateWithTime(item.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
