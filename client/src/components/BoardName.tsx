import { Fragment, useEffect, useState } from 'react'
import { mainApi } from '../redux/main.api'
import { useAppActions } from '../redux/hooks'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Listbox, Menu } from '@headlessui/react'

import { getIdFromLocalStorage } from '../utils/localStorageFuncs'
import { ICustomError } from '../types/models'
import {
  ArrowDownSvg,
  CloseSvg,
  DeleteSvg,
  DoneSvg,
  DotsSvg,
  EditSvg,
  LoadingSvg,
} from '../assets/svg-data'

type BoardState = { name: string; id: number }

const BoardName = () => {
  const { setBoardId } = useAppActions()

  const { data: boards, isLoading } = mainApi.useGetAllBoardsQuery()
  const [deleteBoard] = mainApi.useDeleteBoardMutation()
  const [editBoard, { error }] = mainApi.useUpdateBoardMutation<{
    error: ICustomError
  }>()

  const [isBoardEditing, setIsBoardEditing] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState<BoardState>({
    name: 'Select a board',
    id: 0,
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>()

  useEffect(() => {
    const activeBoard = boards?.find(
      board => board.id === getIdFromLocalStorage('boardId', 0)
    )
    if (activeBoard) {
      setSelectedBoard({ name: activeBoard.name, id: activeBoard.id })
    }
  }, [boards])

  useEffect(() => {
    if (error) {
      toast.error(`${error?.data.message}`, {
        hideProgressBar: false,
        draggable: false,
        toastId: 'custom-toast-id',
      })
      reset()
    }
  }, [error, reset])

  const onSubmit: SubmitHandler<{ name: string }> = data => {
    setIsBoardEditing(false)
    editBoard({ id: getIdFromLocalStorage('boardId', 0), name: data.name })
    reset()
  }

  return (
    <div className='flex items-center w-[50%] sm:w-[30%]'>
      {isLoading ? (
        <div className='mx-auto h-screen flex items-center' role='status'>
          <LoadingSvg w='6' h='6' />
          <span className='sr-only'>Loading...</span>
        </div>
      ) : (
        <>
          {boards?.length !== 0 && (
            <>
              {isBoardEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col sm:flex-row pt-4 sm:pt-0 items-center'>
                    <div className='flex flex-col h-full'>
                      <Controller
                        name='name'
                        defaultValue={selectedBoard.name}
                        control={control}
                        rules={{ required: true, maxLength: 30 }}
                        render={({ field }) => (
                          <input
                            autoFocus
                            placeholder='Enter new name'
                            className={`${
                              errors.name ? 'mt-3' : 'py-0.5 lg:py-1.5'
                            } bg-gray-200 w-40  mr-1 border-3 border-gray-300 rounded-lg focus:ring-main focus:border-main block px-2`}
                            {...field}
                          />
                        )}
                      />
                      {errors.name && errors.name.type === 'required' && (
                        <span className='text-red-500'>Field is required</span>
                      )}
                      {errors.name && errors.name.type === 'maxLength' && (
                        <span className='text-red-500'>
                          Max length exceeded
                        </span>
                      )}
                    </div>
                    <div className='flex items-center h-fit'>
                      <button
                        type='submit'
                        className='border h-8 lg:h-10 sm:w-auto w-20 px-7 text-white text-sm rounded-md sm:px-1.5 lg:px-3 mr-1 button-effects-dark bg-main'
                      >
                        <span className='sm:hidden block'>
                          <DoneSvg />
                        </span>
                        <span className='hidden sm:block'>Create</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsBoardEditing(false)
                          reset()
                        }}
                        className='border h-8 lg:h-10 sm:w-auto w-20 px-7 text-white text-sm rounded-md sm:px-1.5 lg:px-3 mr-1 button-effects-dark bg-red-500'
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
                  value={selectedBoard}
                  onChange={(item: BoardState) => {
                    setSelectedBoard({ name: item.name, id: item.id })
                    setBoardId(item.id)
                  }}
                >
                  {boards?.length !== 0 &&
                    getIdFromLocalStorage('boardId', 0) !== 0 && (
                      <Menu
                        as='div'
                        className='relative inline-block text-right'
                      >
                        <Menu.Button
                          onClick={e => e.stopPropagation()}
                          className='my-auto absolute -top-[23px] -left-7 py-2.5 border-2 rounded-md button-effects-light'
                        >
                          <DotsSvg />
                        </Menu.Button>
                        <Menu.Items
                          onClick={e => e.stopPropagation()}
                          className='absolute left-0 z-20 mt-1 w-48 p-3 rounded-md bg-white shadow-lg border-2'
                        >
                          <div className='flex flex-col'>
                            <Menu.Item>
                              <div
                                onClick={() => setIsBoardEditing(true)}
                                className='button-effects-light p-1 rounded-md cursor-pointer flex items-center'
                              >
                                <EditSvg />
                                <span className='px-3'>Edit name</span>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div
                                onClick={() => {
                                  deleteBoard(
                                    getIdFromLocalStorage('boardId', 0)
                                  )
                                  setBoardId(0)
                                  setSelectedBoard({
                                    name: 'Select a board',
                                    id: 0,
                                  })
                                }}
                                className='button-effects-light py-1 text-red-500 rounded-md cursor-pointer flex items-center'
                              >
                                <DeleteSvg />
                                <span className='px-3'>Delete board</span>
                              </div>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    )}

                  {(boards && boards.length > 1) ||
                  (boards?.length === 1 &&
                    getIdFromLocalStorage('boardId', 0) === 0) ? (
                    <>
                      <Listbox.Button className='flex flex-col mt-6 items-center w-full text-2xl font-bold rounded-md transition-all ease-in'>
                        <span className='w-full py-1.5 line-clamp-1 border-2 rounded-md button-effects-light'>
                          {getIdFromLocalStorage('boardId', 0) === 0
                            ? 'Select a board'
                            : selectedBoard.name}
                        </span>
                        <ArrowDownSvg />
                      </Listbox.Button>
                      <Listbox.Options className='flex max-h-36 absolute top-[47px] w-1/2 sm:w-[30%] pr-[22px] lg:pr-[53px] overflow-y-auto overflow-x-hidden flex-col py-2'>
                        {boards?.map(board => (
                          <Listbox.Option
                            key={board.id}
                            value={{ name: board.name, id: board.id }}
                            as={Fragment}
                          >
                            {({ active }) => (
                              <li
                                className={`${
                                  active
                                    ? 'bg-main text-white'
                                    : 'bg-white text-main'
                                } text-center rounded-md min-h-10 p-2 border shadow-md cursor-pointer `}
                              >
                                {board.name}
                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </>
                  ) : (
                    <div className='w-80 line-clamp-1 text-2xl font-bold text-center py-1.5 border-2 rounded-md my-auto'>
                      {boards?.[0]?.name}
                    </div>
                  )}
                </Listbox>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default BoardName
