export interface IHistoryPropType {
  id: number
  action: string
  details: string
  entityType: string
  timestamp: string
  message?: string
}

export type HistoryMessage = {
  message: string
  timestamp: string
}

export const sortFormatHistory = (
  data: IHistoryPropType[]
): HistoryMessage[] => {
  const formattedData = data.map(item => {
    let message = ''
    const details = JSON.parse(item.details)

    switch (item.action) {
      case 'Task created':
        message = `Task Created with name: "${details.name}", status: "${
          details.status
        }", priority: "${details.priority}", ${
          details.description
            ? `description: "${details.description
                .split(' ')
                .slice(0, 10)
                .join(' ')}..."`
            : ''
        }`
        break
      case 'Task deleted':
        message = 'Task Deleted'
        break
      case 'Task updated':
        message = `Task Updated with ${
          details.name ? `name: "${details.name}",` : ''
        } ${details.status ? `status: "${details.status}",` : ''} ${
          details.priority ? `priority: "${details.priority}",` : ''
        } ${
          details.description
            ? `description: "${details.description
                .split(' ')
                .slice(0, 10)
                .join(' ')}..."`
            : ''
        }`
        break
      case 'List created':
        message = `List Created with name: "${details.name}"`
        break
      case 'List deleted':
        message = 'List Deleted'
        break
      case 'List updated':
        message = `List Updated with name: "${details.name}"`
        break
      default:
        message = 'Unknown action'
    }

    return { message, timestamp: item.timestamp }
  })

  formattedData.sort((a, b) => {
    const dateA = new Date(a.timestamp)
    const dateB = b.timestamp ? new Date(b.timestamp) : null
    if (dateB === null) {
      return -1
    }
    return dateB.getTime() - dateA.getTime()
  })

  return formattedData
}

export const formatHistoryForTask = (
  id: number,
  data: IHistoryPropType[]
): HistoryMessage[] => {
  const filteredData = data.filter(item => item.entityType === 'task')
  const selectedData = filteredData.filter(item => {
    const details = JSON.parse(item.details)
    return details.id === id
  })
  const formattedData = selectedData.map(item => {
    let message = ''
    const details = JSON.parse(item.details)

    switch (item.action) {
      case 'Task created':
        message = `This task was Created with name: "${
          details.name
        }", status: "${details.status}", priority: "${details.priority}", ${
          details.description
            ? `description: "${details.description
                .split(' ')
                .slice(0, 10)
                .join(' ')}..."`
            : ''
        }`
        break
      case 'Task deleted':
        message = 'This task was Deleted'
        break
      case 'Task updated':
        message = `This task was Updated with ${
          details.name ? `name: "${details.name}",` : ''
        } ${details.status ? `status: "${details.status}",` : ''} ${
          details.priority ? `priority: "${details.priority}",` : ''
        } ${
          details.description
            ? `description: "${details.description
                .split(' ')
                .slice(0, 10)
                .join(' ')}..."`
            : ''
        }`
        break
      default:
        message = 'Unknown action'
    }

    return { message, timestamp: item.timestamp }
  })
  formattedData.sort((a, b) => {
    const dateA = new Date(a.timestamp)
    const dateB = b.timestamp ? new Date(b.timestamp) : null
    if (dateB === null) {
      return -1
    }
    return dateB.getTime() - dateA.getTime()
  })

  return formattedData
}
