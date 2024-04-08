export interface IAppState {
  isModalActive: boolean
  TaskState: 'show' | 'edit' | 'create'
  boardId: number
  taskId: number | undefined
  listName: string | undefined
}

export interface IBoard {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  lists: IList[]
}

export interface IList {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  tasks: ITask[]
}

export interface ITask {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  dueDate?: string
  priority: string
  status: string
}

export interface ICreateTask {
  name: string
  description?: string
  dueDate?: string
  priority: string
  status: string
}

export interface IActionLog {
  id: number
  action: string
  details: string
  entityType: string
  timestamp: string
}

export interface ICustomError {
  status: number
  data: ErrorData
}

interface ErrorData {
  message: string
  error: string
  statusCode: number
}
