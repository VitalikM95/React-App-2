import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { Task } from '../task/entities/task.entity';
import { Board } from '../board/entities/board.entity';
export declare class ListService {
    private taskRepo;
    private listRepo;
    private boardRepo;
    constructor(taskRepo: Repository<Task>, listRepo: Repository<List>, boardRepo: Repository<Board>);
    getListsByBoard(boardId: number): Promise<List[]>;
    create(payload: CreateListDto): Promise<List>;
    update(listId: number, changes: UpdateListDto): Promise<List>;
    remove(listId: number): Promise<List>;
}
