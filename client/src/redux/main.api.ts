import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IActionLog, ICreateTask, IList, ITask } from '../types/models'

type UpdateListData = {
  id: number
  name: string
}
type UpdateTaskData = {
  id: number
  name?: string
  description?: string
  dueDate?: string
  priority?: string
  status?: string
}

export const mainApi = createApi({
  reducerPath: 'list/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api',
  }),
  tagTypes: ['List', 'Task', 'History'],
  endpoints: build => ({
    getLists: build.query<IList[], void>({
      query: () => ({
        url: '/lists',
      }),
      providesTags: () => ['List'],
    }),
    createList: build.mutation<IList, string>({
      query: name => ({
        url: '/lists',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['List', 'History'],
    }),
    updateList: build.mutation<IList, UpdateListData>({
      query: listData => ({
        url: `/lists/${listData.id}`,
        method: 'PATCH',
        body: { name: listData.name },
      }),
      invalidatesTags: ['List', 'History', 'Task'],
    }),
    deleteList: build.mutation<object, number>({
      query: id => ({
        url: `/lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['List', 'History'],
    }),

    // TASKS

    getTask: build.query<ITask, number>({
      query: id => ({
        url: `/tasks/${id}`,
      }),
      providesTags: () => ['Task'],
    }),
    createTask: build.mutation<ITask, ICreateTask>({
      query: (taskData: ICreateTask) => ({
        url: '/tasks',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['List', 'History'],
    }),
    updateTask: build.mutation<ITask, UpdateTaskData>({
      query: taskData => ({
        url: `/tasks/${taskData.id}`,
        method: 'PATCH',
        body: taskData,
      }),
      invalidatesTags: ['List', 'Task', 'History'],
    }),
    deleteTask: build.mutation<object, number>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['List', 'History'],
    }),

    // HISTORY

    getHistory: build.query<IActionLog[], void>({
      query: () => ({
        url: '/action-log',
      }),
      providesTags: () => ['History'],
    }),
  }),
})
