import { FC, useEffect, useState } from 'react'
import { useAppActions } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import Card from './Card'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Menu } from '@headlessui/react'
import { toast } from 'react-toastify'

import { ICustomError, IList } from '../types/models'
import {
  DeleteSvg,
  DotsSvg,
  PlusSvg,
  EditSvg,
  LoadingSvg,
} from '../assets/svg-data'

type ListProps = {
  list: IList
}

const List: FC<ListProps> = ({ list }) => {
  const { toggleModal, changeTaskState } = useAppActions()
  const [deleteList] = mainApi.useDeleteListMutation()
  const [updateList, { isLoading, error }] = mainApi.useUpdateListMutation<{
    isLoading: boolean
    error: ICustomError
  }>()

  const [isListRenaming, setIsListRenaming] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>()

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

  const handleCreateTask = () => {
    toggleModal({ listName: list.name })
    changeTaskState({ TaskState: 'create' })
  }

  const onSubmit: SubmitHandler<{ name: string }> = data => {
    updateList({ id: list.id, boardId: 0, name: data.name })
    setIsListRenaming(false)
  }

  return (
    <div className='flex flex-col max-h-screen pt-16 min-w-[245px] w-[245px]'>
      {isListRenaming ? (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <Controller
            defaultValue={list?.name}
            name='name'
            control={control}
            rules={{ required: true, maxLength: 30 }}
            render={({ field }) => (
              <input
                autoFocus
                placeholder='Enter new name'
                className='bg-main-light w-full border-3 border-gray-300 rounded-lg focus:ring-main focus:border-main block p-1.5'
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
          {errors.name &&
            errors.name.message === 'A List with this name already exists' && (
              <span className='text-red-500'>
                A List with this name already exists
              </span>
            )}
          <button
            type='submit'
            className='border text-white w-full text-sm rounded-md p-2 my-2 button-effects-dark bg-main'
          >
            Done!
          </button>
          <button
            onClick={() => {
              setIsListRenaming(false)
              reset()
            }}
            className='border text-white w-full text-sm rounded-md p-2 mb-2 button-effects-dark bg-red-500'
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <div className='flex justify-between border-y-3 mb-2'>
            {isLoading ? (
              <div className='mx-auto my-auto' role='status'>
                <LoadingSvg w='8' h='8' />
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              <div className='text-lg font-bold px-2 py-1 line-clamp-1'>
                {list.name}
              </div>
            )}
            <div className='flex items-center'>
              <span className='font-bold px-4'>{list.tasks.length}</span>
              <Menu as='div' className='relative inline-block text-right'>
                <div>
                  <Menu.Button className='pt-2'>
                    <DotsSvg />
                  </Menu.Button>
                </div>
                <Menu.Items className='absolute z-20 mt-1 right-0 w-48 p-3 rounded-md bg-white shadow-lg border-2'>
                  <div className='flex flex-col'>
                    <Menu.Item>
                      <div
                        onClick={() => setIsListRenaming(true)}
                        className='button-effects-light p-1 rounded-md cursor-pointer flex items-center'
                      >
                        <EditSvg />
                        <span className='px-3'>Edit</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        onClick={handleCreateTask}
                        className='button-effects-light py-1 rounded-md cursor-pointer flex items-center'
                      >
                        <PlusSvg color='text-gray-400' />
                        <span className='px-3 '>Add new card</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        onClick={() => {
                          deleteList(list.id)
                        }}
                        className='button-effects-light py-1 text-red-500 rounded-md cursor-pointer flex items-center'
                      >
                        <DeleteSvg />
                        <span className='px-3'>Delete</span>
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <button
            onClick={handleCreateTask}
            className='w-full flex items-center justify-center text-lg py-1 mb-2 border-3 rounded-md border-dashed button-effects-light'
          >
            <PlusSvg color='text-gray-800' />
            <span className='mx-2 text-md '>Add new card</span>
          </button>
        </div>
      )}

      <div className='flex overflow-y-auto h-screen flex-col gap-4'>
        {list.tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <div className='min-h-2'></div>
    </div>
  )
}
export default List
