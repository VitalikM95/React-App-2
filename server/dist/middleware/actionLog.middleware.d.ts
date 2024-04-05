import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ActionLogService } from '../actionLog/actionLog.service';
export declare class ActionLogMiddleware implements NestMiddleware {
    private readonly actionLogService;
    constructor(actionLogService: ActionLogService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getActionFromRequest;
    private getDetailsFromParams;
    private getEntityTypeFromUrl;
}
