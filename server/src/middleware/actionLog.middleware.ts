import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ActionLogService } from '../actionLog/actionLog.service'

@Injectable()
export class ActionLogMiddleware implements NestMiddleware {
  constructor(private readonly actionLogService: ActionLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req
    const action = this.getActionFromRequest(method, url)
    if (method === 'GET') {
      return next()
    }
    try {
      const name = this.getDetailsFromParams(body, url)
      await this.actionLogService.logAction(
        action,
        name,
        this.getEntityTypeFromUrl(url),
      )
    } catch (error) {
      console.error('Error logging action:', error)
    }
    next()
  }

  private getActionFromRequest(method: string, url: string): string {
    let action = ''

    if (method === 'POST') {
      if (url.includes('/tasks')) {
        action = 'Task created'
      } else if (url.includes('/lists')) {
        action = 'List created'
      }
    } else if (method === 'PATCH') {
      if (url.includes('/tasks')) {
        action = 'Task updated'
      } else if (url.includes('/lists')) {
        action = 'List updated'
      }
    } else if (method === 'DELETE') {
      if (url.includes('/tasks')) {
        action = 'Task deleted'
      } else if (url.includes('/lists')) {
        action = 'List deleted'
      }
    }
    return action
  }

  private getDetailsFromParams(body: any, url: string): string {
    if (url.includes('/tasks')) {
      return body
    } else if (url.includes('/lists')) {
      return body
    }
    return ''
  }
  private getEntityTypeFromUrl(url: string): string {
    if (url.includes('/tasks')) {
      return 'task'
    } else if (url.includes('/lists')) {
      return 'list'
    }
    return ''
  }
}
