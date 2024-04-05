import { FC, Fragment, useState } from 'react'
import { Listbox, Menu } from '@headlessui/react'
import { CalendarSvg, DeleteSvg, DotsSvg, EditSvg } from '../assets/svg-data'
import { useAppActions } from '../redux/hooks'
import { ArrowDownSvg } from './../assets/svg-data'
import { ITask } from '../types/models'
import { mainApi } from '../redux/main.api'
import { formatDate } from '../utils/dateHook'

type TaskProps = {
  task: ITask
}

const Card: FC<TaskProps> = ({ task }) => {
  const { data: lists } = mainApi.useGetListsQuery()
  const [deleteTask] = mainApi.useDeleteTaskMutation()
  const [updateTask] = mainApi.useUpdateTaskMutation()

  const { toggleModal, changeTaskState } = useAppActions()
  const handleClickCard = () => {
    toggleModal({ taskId: task.id })
  }

  const handleEditTask = () => {
    toggleModal({ taskId: task.id })
    changeTaskState({ TaskState: 'edit' })
  }

  const handleDeleteTask = () => {
    deleteTask(task.id)
  }

  const [selectedList, setSelectedList] = useState(lists?.[0]?.name || '')

  const handleListSelection = (selectedItem: string) => {
    setSelectedList(selectedItem)
    updateTask({ id: task.id, status: selectedItem })
  }

  return (
    <div
      onClick={handleClickCard}
      className='border-3 cursor-pointer rounded-md w-full p-4 hover:shadow-lg transition-all ease-in'
    >
      <div className='flex justify-between'>
        <div className='text-lg font-bold line-clamp-1'>{task.name}</div>
        <Menu as='div' className='relative inline-block text-right'>
          <div>
            <Menu.Button onClick={e => e.stopPropagation()} className='pt-2'>
              <DotsSvg />
            </Menu.Button>
          </div>
          <Menu.Items
            onClick={e => e.stopPropagation()}
            className='absolute -left-[160px] z-20 mt-1 w-48 p-3 rounded-md bg-white shadow-lg border-2'
          >
            <div className='flex flex-col '>
              <Menu.Item>
                <div
                  onClick={handleEditTask}
                  className='button-effects-light p-1 rounded-md cursor-pointer flex items-center'
                >
                  <EditSvg />
                  <span className='px-3'>Edit</span>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={handleDeleteTask}
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
      <p className='text-gray-400 text-sm leading-5 py-1 line-clamp-3'>
        {task.description}
      </p>
      <div className='flex py-3'>
        <CalendarSvg color='text-gray-800' />
        <div className='text-gray-400 font-bold mx-2'>
          {formatDate(task?.dueDate)}
        </div>
      </div>
      <div className='bg-main-light text-gray-400 font-bold w-fit rounded-3xl pl-7 pr-5 py-1 relative'>
        <span
          className={`${
            task.priority === 'Medium'
              ? 'before:brightness-75'
              : task.priority === 'High'
              ? 'before:brightness-50'
              : ''
          } before:absolute before:h-2 before:w-2 before:bg-main-middle before:rounded-full before:left-3 before:top-3`}
        ></span>
        {task.priority}
      </div>
      <div onClick={e => e.stopPropagation()}>
        <Listbox value={selectedList} onChange={handleListSelection}>
          <Listbox.Button className='flex justify-between bg-main-middle w-full rounded-md mt-3 p-2 button-effects-light'>
            <span>Move to:</span>
            <ArrowDownSvg />
          </Listbox.Button>
          <Listbox.Options className='flex max-h-32 overflow-y-auto overflow-x-hidden flex-col pl-[6px] py-2'>
            {lists?.map(list => (
              <Listbox.Option key={list.id} value={list.name} as={Fragment}>
                {({ active }) => (
                  <li
                    className={`${
                      active ? 'bg-main text-white' : 'bg-white text-main'
                    } rounded-md px-1 border-y `}
                  >
                    {list.name}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  )
}

export default Card
