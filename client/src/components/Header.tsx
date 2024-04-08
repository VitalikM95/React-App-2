import { Fragment, useEffect, useState } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import BoardName from './BoardName'
import Drawer from './Drawer'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Listbox } from '@headlessui/react'
import { toast } from 'react-toastify'

import { getIdFromLocalStorage } from '../utils/localStorageFuncs'
import { CloseSvg, DoneSvg, PlusSvg, HistorySvg } from '../assets/svg-data'
import { IBoard, ICustomError } from '../types/models'

const Header = () => {
  const boardId = useAppSelector(state => state.app.boardId)
  const { setBoardId } = useAppActions()

  const { data: boards } = mainApi.useGetAllBoardsQuery()
  const [createList, { error: listErr }] = mainApi.useCreateListMutation<{
    error: ICustomError
  }>()
  const [createBoard, { data: createdBoard, error: boardErr }] =
    mainApi.useCreateBoardMutation<{
      error: ICustomError
      data: IBoard
    }>()

  const [isDrawerOpened, setIsDrawerOpened] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>()

  useEffect(() => {
    if (listErr) {
      toast.error(`${listErr?.data.message}`, {
        hideProgressBar: false,
        draggable: false,
        toastId: 'custom-toast-id',
      })
      reset()
    }
    if (boardErr) {
      toast.error(`${boardErr?.data.message}`, {
        hideProgressBar: false,
        draggable: false,
        toastId: 'custom-toast-id',
      })
      reset()
    }
  }, [listErr, boardErr, reset])

  useEffect(() => {
    if (createdBoard) {
      setBoardId(createdBoard?.id)
    }
  }, [createdBoard, setBoardId])

  const onSubmit: SubmitHandler<{ name: string }> = data => {
    if (selectedAction === 'list') {
      setIsCreating(false)
      createList({
        boardId: getIdFromLocalStorage('boardId', 0),
        name: data.name,
      })
      reset()
    } else if (selectedAction === 'board') {
      setIsCreating(false)
      createBoard(data.name)
      reset()
    }
  }

  return (
    <>
      <header className='h-8 lg:h-10 flex items-center fixed w-full top-0 z-20 py-8 pl-10 sm:pl-12 lg:pl-24 pr-2 sm:pr-6 lg:pr-20 bg-white justify-between'>
        <BoardName />
        <div className='flex items-center'>
          <button
            onClick={() => {
              setIsDrawerOpened(!isDrawerOpened)
              setIsCreating(false)
            }}
            className={
              isCreating
                ? 'hidden'
                : 'flex items-center border-3 h-fit rounded-md py-[3px] lg:py-[6px] px-1 lg:px-3 mr-1 mt-0.5 button-effects-light'
            }
          >
            <HistorySvg />
            <p className='sm:block hidden text-sm lg:text-lg pl-1 '>History</p>
          </button>
          {isCreating ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col sm:flex-row pt-4 sm:pt-0 items-center'>
                <div className='flex flex-col h-full'>
                  <Controller
                    name='name'
                    defaultValue=''
                    control={control}
                    rules={{ required: true, maxLength: 30 }}
                    render={({ field }) => (
                      <input
                        autoFocus
                        placeholder='Enter new name'
                        className={`${
                          errors.name ? 'mt-3' : 'py-0.5 lg:py-1.5'
                        } bg-gray-200 w-40 mr-1 border-3 border-gray-300 rounded-lg focus:ring-main focus:border-main block px-2`}
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
                    className='border h-8 lg:h-10 sm:w-auto w-20 text-white text-sm rounded-md px-7 sm:px-1.5 lg:px-3 mr-1 button-effects-dark bg-main'
                  >
                    <span className='sm:hidden block'>
                      <DoneSvg />
                    </span>
                    <span className='hidden sm:block'>Create</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false)
                      reset()
                    }}
                    className='border h-8 lg:h-10 sm:w-auto w-20 text-white text-sm rounded-md px-7 sm:px-1.5 lg:px-3 mr-1 button-effects-dark bg-red-500'
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
            <Listbox
              value={selectedAction}
              onChange={(item: string) => {
                setSelectedAction(item)
                setIsCreating(true)
              }}
            >
              <Listbox.Button className='flex items-center bg-main h-fit border rounded-md py-1 lg:py-2 px-2 mx-1 button-effects-dark'>
                <PlusSvg color='text-white' />
                <p className='sm:block hidden text-md lg:text-lg text-white px-2'>
                  Create new ...
                </p>
              </Listbox.Button>
              <Listbox.Options className='flex max-h-32 absolute top-10 lg:top-12 right-[12px] sm:right-[27px] lg:right-[84px] w-[155px] lg:w-[167px] overflow-y-auto overflow-x-hidden flex-col mt-2 shadow-md rounded-md'>
                <Listbox.Option value={'board'} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={`${
                        active ? 'bg-main text-white' : 'bg-white text-main'
                      } text-center rounded-md min-h-10 p-2 border-y cursor-pointer `}
                    >
                      Create new <b>board</b>
                    </li>
                  )}
                </Listbox.Option>
                {boards?.length !== 0 && boardId !== 0 && (
                  <Listbox.Option value={'list'} as={Fragment}>
                    {({ active }) => (
                      <li
                        className={`${
                          active ? 'bg-main text-white' : 'bg-white text-main'
                        } text-center rounded-md min-h-10 p-2 border-y cursor-pointer `}
                      >
                        Create new <b>list</b>
                      </li>
                    )}
                  </Listbox.Option>
                )}
              </Listbox.Options>
            </Listbox>
          )}
        </div>
      </header>
      <Drawer
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
        reset={reset}
      />
    </>
  )
}

export default Header
