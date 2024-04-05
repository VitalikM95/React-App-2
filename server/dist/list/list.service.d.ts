import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { Task } from '../task/entities/task.entity';
export declare class ListService {
    private taskRepo;
    private listRepo;
    constructor(taskRepo: Repository<Task>, listRepo: Repository<List>);
    findAll(): Promise<List[]>;
    findOne(id: number): Promise<List>;
    create(payload: CreateListDto): Promise<List>;
    update(id: number, changes: UpdateListDto): Promise<List>;
    remove(id: number): Promise<List>;
}
