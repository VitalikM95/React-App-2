import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findOne(taskId: number): Promise<import("src/task/entities/task.entity").Task>;
    create(payload: CreateTaskDto): Promise<import("src/task/entities/task.entity").Task>;
    update(taskId: number, payload: UpdateTaskDto): Promise<import("src/task/entities/task.entity").Task>;
    remove(taskId: number): Promise<import("src/task/entities/task.entity").Task>;
}
