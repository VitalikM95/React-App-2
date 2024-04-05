import { IList } from '../types/models'

export const sortByCreatedAt = (objects: IList[]): IList[] => {
  const compareDatesDesc = (a: string, b: string) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateA.getTime() - dateB.getTime()
  }

  return objects.sort((obj1, obj2) =>
    compareDatesDesc(obj1.createdAt, obj2.createdAt)
  )
}
