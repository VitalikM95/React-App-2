import { useEffect, useState } from 'react'
import { CloseSvg, DoneSvg, PlusSvg } from '../assets/svg-data'
import { HistorySvg } from '../assets/svg-data'
import { mainApi } from '../redux/main.api'
import { HistoryMessage, sortFormatHistory } from './../utils/historyFormatter'
import { formatDateWithTime } from '../utils/dateHook'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ICustomError } from '../types/models'

const Header = () => {
  const [historyResult, setHistoryResult] = useState<HistoryMessage[]>([])
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)
  const [isListCreating, setIsListCreating] = useState(false)
  const { data: history } = mainApi.useGetHistoryQuery()
  const [createList, { error }] = mainApi.useCreateListMutation<{
    error: ICustomError
  }>()

  useEffect(() => {
    if (history) {
      const formattedData = sortFormatHistory(history)
      setHistoryResult(formattedData)
    }
  }, [history])

  useEffect(() => {
    if (error) {
      toast.error(`${error?.data.message}`, {
        hideProgressBar: false,
        draggable: false,
        toastId: 'custom-toast-id',
      })
      reset()
    }
  }, [error])

  const handleCloseHistory = () => {
    setIsDrawerOpened(false)
    reset()
  }

  const handleCancelButton = () => {
    setIsListCreating(false)
    reset()
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>()

  const onSubmit: SubmitHandler<{ name: string }> = data => {
    setIsListCreating(false)
    createList(data.name)
    reset()
  }

  return (
    <>
      <header className='h-8 lg:h-10 flex items-center fixed w-full top-0 z-20 py-8 px-3 sm:px-12 lg:px-24 bg-white justify-between'>
        <h1 className='text-xl lg:text-3xl font-bold'>My Task Board</h1>
        <div className='flex items-center'>
          <button
            onClick={() => {
              setIsDrawerOpened(!isDrawerOpened)
              setIsListCreating(false)
            }}
            className='flex items-center border-3 h-fit rounded-md py-0.5 lg:py-[6px] px-2 lg:px-5 mr-1.5 lg:mr-3 button-effects-light'
          >
            <HistorySvg />
            <p className='sm:block hidden text-md lg:text-lg pl-2 lg:pl-3'>
              History
            </p>
          </button>
          {isListCreating ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex items-center'>
                <div className='flex flex-col h-full'>
                  <Controller
                    name='name'
                    defaultValue=''
                    control={control}
                    rules={{ required: true, maxLength: 30 }}
                    render={({ field }) => (
                      <input
                        autoFocus
                        placeholder='Create new list'
                        className={`${
                          errors.name ? 'mt-3' : 'py-0.5 lg:py-1.5'
                        } bg-gray-200 w-40 lg:w-56 mr-1.5 lg:mr-3 border-3 border-gray-300 rounded-lg focus:ring-main focus:border-main block px-2`}
                        {...field}
                      />
                    )}
                  />
                  {errors.name && errors.name.type === 'required' && (
                    <span className='text-red-500'>Field is required</span>
                  )}
                  {errors.name && errors.name.type === 'maxLength' && (
                    <span className='text-red-500'>Max length exceeded</span>
                  )}
                </div>
                <div className='flex items-center h-fit'>
                  <button
                    type='submit'
                    className='border h-8 lg:h-10 text-white text-sm rounded-md px-0.5 sm:px-1.5 lg:px-3 mr-1 lg:mr-2 button-effects-dark bg-main'
                  >
                    <span className='sm:hidden block'>
                      <DoneSvg />
                    </span>
                    <span className='hidden sm:block'>Create</span>
                  </button>
                  <button
                    onClick={handleCancelButton}
                    className='border h-8 lg:h-10 text-white text-sm rounded-md px-0.5 sm:px-1.5 lg:px-3 mr-1 lg:mr-2 button-effects-dark bg-red-500'
                  >
                    <span className='sm:hidden block'>
                      <CloseSvg />
                    </span>
                    <span className='hidden sm:block'>Cancel</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsListCreating(true)}
              className='flex items-center  bg-main h-fit border rounded-md py-1 lg:py-2 px-2 lg:px-5  button-effects-dark'
            >
              <PlusSvg color='text-white' />
              <p className='sm:block hidden text-md lg:text-lg text-white px-2 lg:px-3 '>
                Create new list
              </p>
            </button>
          )}
        </div>
      </header>

      {/* DRAWER */}

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
            <div className='bg-main p-5 flex items-center justify-between'>
              <h4 className='text-white text-xl'>History</h4>
              <div onClick={handleCloseHistory} className='cursor-pointer'>
                <CloseSvg />
              </div>
            </div>
            <div className='flex flex-col h-screen overflow-y-auto text-main pb-24 gap-5 p-7'>
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
    </>
  )
}

export default Header
