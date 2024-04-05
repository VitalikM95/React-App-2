import { useEffect, useState } from 'react'
import { mainApi } from '../redux/main.api'
import { sortByCreatedAt } from '../utils/sort'
import List from './List'
import { IList } from '../types/models'
import { LoadingSvg } from '../assets/svg-data'

const Main = () => {
  const { data: lists, isLoading } = mainApi.useGetListsQuery()
  const [sortResult, setSortResult] = useState<IList[]>([])

  useEffect(() => {
    if (lists) {
      const formattedData = sortByCreatedAt([...lists])
      setSortResult(formattedData)
    }
  }, [lists])

  return (
    <main className='w-full mx-auto flex'>
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
        <div className='flex my-0 w-full max-h-screen sm:mx-1 mx-3 overflow-y-hidden px-0 sm:px-16 lg:px-24 gap-6'>
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
    </main>
  )
}

export default Main
