import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    findAll(): Promise<import("src/list/entities/list.entity").List[]>;
    findOne(id: number): Promise<import("src/list/entities/list.entity").List>;
    create(payload: CreateListDto): Promise<import("src/list/entities/list.entity").List>;
    update(id: number, payload: UpdateListDto): Promise<import("src/list/entities/list.entity").List>;
    remove(id: number): Promise<import("src/list/entities/list.entity").List>;
}
