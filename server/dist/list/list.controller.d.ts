import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    getListsByBoard(boardId: number): Promise<import("src/list/entities/list.entity").List[]>;
    create(payload: CreateListDto): Promise<import("src/list/entities/list.entity").List>;
    update(listId: number, payload: UpdateListDto): Promise<import("src/list/entities/list.entity").List>;
    remove(listId: number): Promise<import("src/list/entities/list.entity").List>;
}
