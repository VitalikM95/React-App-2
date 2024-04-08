import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAppState } from '../types/models'

type ModalAction = {
  taskId?: number
  listName?: string
}
type StateAction = {
  TaskState: 'show' | 'edit' | 'create'
}

const initialState: IAppState = {
  isModalActive: false,
  TaskState: 'show',
  taskId: 0,
  boardId: 0,
  listName: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: create => ({
    toggleModal: create.reducer(
      (state, action?: PayloadAction<ModalAction>) => {
        if (action) {
          state.isModalActive = !state.isModalActive
          state.taskId = action?.payload.taskId
          state.listName = action?.payload.listName
        } else {
          state.isModalActive = !state.isModalActive
        }
      }
    ),
    changeTaskState: create.reducer(
      (state, action: PayloadAction<StateAction>) => {
        state.TaskState = action.payload.TaskState
      }
    ),
    setBoardId: create.reducer((state, action: PayloadAction<number>) => {
      localStorage.setItem('boardId', action.payload.toString())
      state.boardId = action.payload
    }),
  }),
})

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
