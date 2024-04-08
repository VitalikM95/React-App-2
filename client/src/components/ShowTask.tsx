import { useAppActions, useAppSelector } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import { formatDate } from '../utils/dateHook'
import {
  CalendarSvg,
  EditSvg,
  LoadingSvg,
  PrioritySvg,
  StatusSvg,
} from '../assets/svg-data'

const ShowTask = () => {
  const taskId = useAppSelector(state => state.app.taskId)
  const { changeTaskState } = useAppActions()

  const { data: task, isLoading } = mainApi.useGetTaskQuery(taskId || 0)

  return isLoading ? (
    <div className='mx-auto h-full flex items-center' role='status'>
      <LoadingSvg w='10' h='10' />
      <span className='sr-only'>Loading...</span>
    </div>
  ) : (
    <>
      <div className='flex justify-between my-3'>
        <h3 className='text-xl lg:text-3xl font-bold overflow-hidden'>
          {task?.name}
        </h3>
        <button
          onClick={() => changeTaskState({ TaskState: 'edit' })}
          className='flex justify-between border-2 h-fit rounded-md py-1 px-3 button-effects-light'
        >
          <EditSvg />
          <span className='whitespace-nowrap'>Edit task</span>
        </button>
      </div>
      <div className='flex my-3'>
        <div className='text-gray-400 flex w-1/3'>
          <StatusSvg />
          <span className='ml-3'>Status</span>
        </div>
        <span>{task?.status}</span>
      </div>
      <div className='flex my-3'>
        <div className='text-gray-400 flex w-1/3'>
          <CalendarSvg color='text-gray-400' />
          <span className='ml-3'>Due date</span>
        </div>
        <span>{formatDate(task?.dueDate)}</span>
      </div>
      <div className='flex my-3'>
        <div className='text-gray-400 flex w-1/3'>
          <PrioritySvg />
          <span className='ml-3'>Priority</span>
        </div>
        <span>{task?.priority}</span>
      </div>
      <div className='my-2'>
        <h4 className='my-2 text-xl font-bold'>Description</h4>
        <p className='mt-2 text-gray-400 text-justify line-clamp-[8] h-fit'>
          {task?.description}
        </p>
      </div>
    </>
  )
}

export default ShowTask
