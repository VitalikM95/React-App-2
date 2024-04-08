import { useAppActions, useAppSelector } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { getIdFromLocalStorage } from '../utils/localStorageFuncs'
import { DoneSvg } from '../assets/svg-data'

interface ICreateForm {
  name: string
  status: string
  dueDate?: string
  priority: string
  description?: string
}

const EditTask = () => {
  const { TaskState, listName, boardId, taskId } = useAppSelector(
    state => state.app
  )
  const { toggleModal, changeTaskState } = useAppActions()

  const { data: task, isLoading } = mainApi.useGetTaskQuery(taskId || 0)
  const [editTask] = mainApi.useUpdateTaskMutation()
  const [createTask] = mainApi.useCreateTaskMutation()
  const { data: lists } = mainApi.useGetListsByBoardQuery(
    boardId !== 0 ? boardId : getIdFromLocalStorage('boardId', 0)
  )

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateForm>()

  const onSubmit: SubmitHandler<ICreateForm> = data => {
    if (TaskState === 'edit' && taskId) {
      editTask({ ...data, id: taskId })
    } else {
      createTask(data)
    }
    changeTaskState({ TaskState: 'show' })
    toggleModal({ listName: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <>Loading!</>
      ) : (
        <>
          <div className='flex justify-between my-3'>
            <div className='flex gap-3 items-center'>
              <div className='text-main whitespace-nowrap text-lg'>
                Task name:
              </div>
              <Controller
                defaultValue={task?.name}
                name='name'
                control={control}
                rules={{ required: true, maxLength: 30 }}
                render={({ field }) => (
                  <input
                    placeholder='Enter new name'
                    className='bg-main-light sm:w-56 w-fit mr-0 sm:mr-2 border-3 border-gray-300 text-sm rounded-lg focus:ring-main focus:border-main block p-1'
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
            <button
              type='submit'
              className='flex gap-1 bg-main text-white justify-between border-2 h-fit rounded-md py-1 px-3 button-effects-dark'
            >
              <DoneSvg />
              <span className='sm:block hidden'>Done!</span>
            </button>
          </div>
          <div className='flex mb-3'>
            <label className='text-main text-lg mr-[46px]'>Status:</label>
            <Controller
              name='status'
              control={control}
              defaultValue={listName ? listName : task?.status}
              render={({ field }) => (
                <select
                  className='bg-main-light w-56 text-main resize-none mr-2 border-3 border-gray-300 text-sm rounded-lg focus:ring-main focus:border-main block p-1'
                  {...field}
                >
                  {lists?.map(list => (
                    <option className='' key={list.id} value={list.name}>
                      {list.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.description &&
              typeof errors.description.message === 'string' && (
                <span>{errors.description.message}</span>
              )}
          </div>
          <div className='flex gap-5 mb-3'>
            <label className='text-main whitespace-nowrap text-lg'>
              Due Date:
            </label>
            <Controller
              name='dueDate'
              defaultValue={task?.dueDate}
              control={control}
              render={({ field }) => (
                <input
                  placeholder={task?.dueDate}
                  className='bg-main-light w-56 text-main resize-none mr-2 border-3 border-gray-300 text-sm rounded-lg focus:ring-main focus:border-main block p-1'
                  type='date'
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex mb-3'>
            <label className='text-main text-lg mr-9'>Priority:</label>
            <Controller
              defaultValue={task?.priority || 'Low'}
              name='priority'
              control={control}
              render={({ field }) => (
                <select
                  className='bg-main-light w-56 text-main resize-none mr-2 border-3 border-gray-300 text-sm rounded-lg focus:ring-main focus:border-main block p-1'
                  {...field}
                >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              )}
            />
          </div>
          <div className='flex gap-3'>
            <label className='text-main text-md'>Description:</label>
            <Controller
              defaultValue={task?.description}
              name='description'
              control={control}
              rules={{ maxLength: 500 }}
              render={({ field }) => (
                <textarea
                  draggable={false}
                  className='bg-main-light w-full h-64 resize-none mr-2 border-3 border-gray-300 text-md rounded-lg focus:ring-main focus:border-main block p-1'
                  {...field}
                />
              )}
            />
            {errors.description &&
              typeof errors.description.message === 'string' && (
                <span className='text-red-500'>Max length exceeded</span>
              )}
          </div>
        </>
      )}
    </form>
  )
}

export default EditTask
