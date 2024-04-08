import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { mainApi } from '../redux/main.api'

import List from './List'

import { getIdFromLocalStorage } from '../utils/localStorageFuncs'
import { sortByCreatedAt } from '../utils/sort'
import { LoadingSvg } from '../assets/svg-data'
import { IList } from '../types/models'

const Main = () => {
  const boardId = useAppSelector(state => state.app.boardId)

  const { data: allBoards } = mainApi.useGetAllBoardsQuery()
  const { data: board, isLoading } = mainApi.useGetBoardQuery(
    boardId !== 0 ? boardId : getIdFromLocalStorage('boardId', 0)
  )

  const [sortResult, setSortResult] = useState<IList[]>([])

  useEffect(() => {
    if (board?.lists) {
      const formattedData = sortByCreatedAt([...board.lists])
      setSortResult(formattedData)
    }
  }, [board?.lists])

  return (
    <main className='w-full mx-auto flex'>
      {allBoards?.length === 0 ? (
        <div className='mx-auto h-screen flex items-center text-3xl font-bold text-main'>
          Create new board
        </div>
      ) : allBoards?.length !== 0 &&
        getIdFromLocalStorage('boardId', 0) === 0 ? (
        <div className='mx-auto h-screen flex items-center text-3xl font-bold text-main'>
          Select a board
        </div>
      ) : (
        <>
          <div className='sm:flex hidden min-w-[60px] lg:min-w-[100px] min-h-full z-10 fixed top-0 left-0  flex-col'>
            <div className='flex-grow w-full bg-gradient-to-r from-white via-white to-transparent'></div>
            <div className='min-h-[15px] w-full bg-transparent'></div>
          </div>
          {isLoading ? (
            <div className='mx-auto h-screen flex items-center' role='status'>
              <LoadingSvg w='20' h='20' />
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <div className='flex pt-4 w-full max-h-screen sm:mx-1 mx-3 overflow-y-hidden px-0 sm:px-10 lg:px-24 gap-6'>
              {sortResult.length === 0 ? (
                <div className='mx-auto h-screen flex items-center text-3xl font-bold text-main'>
                  There are no lists...
                </div>
              ) : (
                sortResult?.map(list => <List key={list.id} list={list} />)
              )}
            </div>
          )}
          <div className='sm:flex hidden min-w-[60px] lg:min-w-[100px] min-h-full z-10 fixed top-0 right-0  flex-col'>
            <div className='flex-grow w-full bg-gradient-to-l from-white via-white to-transparent'></div>
            <div className='min-h-[15px] w-full bg-transparent'></div>
          </div>
        </>
      )}
    </main>
  )
}

export default Main
