import { Repository } from 'typeorm';
import { ActionLog } from './entities/actionLog.entity';
export declare class ActionLogService {
    private readonly actionLogRepository;
    constructor(actionLogRepository: Repository<ActionLog>);
    logAction(action: string, details: string, entityType: string): Promise<void>;
    getAll(): Promise<ActionLog[]>;
}
