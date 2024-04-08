import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { List } from '../list/entities/list.entity';
export declare class TaskService {
    private taskRepo;
    private listRepo;
    constructor(taskRepo: Repository<Task>, listRepo: Repository<List>);
    findOne(taskId: number): Promise<Task>;
    create(payload: CreateTaskDto): Promise<Task>;
    update(taskId: number, changes: UpdateTaskDto): Promise<Task>;
    remove(taskId: number): Promise<Task>;
}
