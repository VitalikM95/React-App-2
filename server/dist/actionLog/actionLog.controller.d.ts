import { ActionLogService } from './actionLog.service';
import { ActionLog } from './entities/actionLog.entity';
export declare class ActionLogController {
    private readonly actionLogService;
    constructor(actionLogService: ActionLogService);
    getAll(): Promise<ActionLog[]>;
}
