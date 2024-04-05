import type { RootState, AppDispatch } from './store'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { appActions } from './appSlice'

const actions = {
  ...appActions,
}
export const useAppActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
