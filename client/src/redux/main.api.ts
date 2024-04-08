import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IActionLog, IBoard, ICreateTask, IList, ITask } from '../types/models'

type BoardData = {
  id: number
  name: string
}
type ListData = {
  id?: number
  boardId: number
  name: string
}
type TaskData = {
  id: number
  name?: string
  description?: string
  dueDate?: string
  priority?: string
  status?: string
}

export const mainApi = createApi({
  reducerPath: 'main/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api',
  }),
  tagTypes: ['List', 'Task', 'History', 'Board'],
  endpoints: build => ({
    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: () => ['Board'],
    }),
    getBoard: build.query<IBoard, number>({
      query: boardId => ({
        url: `/boards/${boardId}`,
      }),
      providesTags: () => ['Board'],
    }),
    createBoard: build.mutation<IBoard, string>({
      query: name => ({
        url: '/boards',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoard: build.mutation<IBoard, BoardData>({
      query: boardData => ({
        url: `/boards/${boardData.id}`,
        method: 'PATCH',
        body: { name: boardData.name },
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: build.mutation<IBoard, number>({
      query: boardId => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),

    // LISTS

    getListsByBoard: build.query<IList[], number>({
      query: boardId => ({
        url: `/lists/${boardId}`,
      }),
      providesTags: () => ['List'],
    }),
    createList: build.mutation<IList, ListData>({
      query: ({ name, boardId }) => ({
        url: '/lists',
        method: 'POST',
        body: { name, boardId },
      }),
      invalidatesTags: ['List', 'Board', 'History'],
    }),
    updateList: build.mutation<IList, ListData>({
      query: listData => ({
        url: `/lists/${listData.id}`,
        method: 'PATCH',
        body: { name: listData.name, boardId: listData.boardId },
      }),
      invalidatesTags: ['List', 'Board', 'Task', 'History'],
    }),
    deleteList: build.mutation<IList, number>({
      query: listId => ({
        url: `/lists/${listId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['List', 'Board', 'History'],
    }),

    // TASKS

    getTask: build.query<ITask, number>({
      query: taskId => ({
        url: `/tasks/${taskId}`,
      }),
      providesTags: () => ['Task'],
    }),
    createTask: build.mutation<ITask, ICreateTask>({
      query: (taskData: ICreateTask) => ({
        url: '/tasks',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Board', 'History'],
    }),
    updateTask: build.mutation<ITask, TaskData>({
      query: taskData => ({
        url: `/tasks/${taskData.id}`,
        method: 'PATCH',
        body: taskData,
      }),
      invalidatesTags: ['Board', 'Task', 'History'],
    }),
    deleteTask: build.mutation<ITask, number>({
      query: taskId => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board', 'History'],
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
